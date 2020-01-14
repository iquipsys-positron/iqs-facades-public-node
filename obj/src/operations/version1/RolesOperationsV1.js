"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class RolesOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('accounts', new pip_services3_commons_node_3.Descriptor('pip-services-accounts', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('roles', new pip_services3_commons_node_3.Descriptor('pip-services-orgroles', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('sessions', new pip_services3_commons_node_3.Descriptor('pip-services-sessions', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('organizations', new pip_services3_commons_node_3.Descriptor('pip-services-organizations', 'client', '*', '*', '1.0'));
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        super.setReferences(references);
        this._accountsClient = this._dependencyResolver.getOneRequired('accounts');
        this._sessionsClient = this._dependencyResolver.getOneRequired('sessions');
        this._organizationsClient = this._dependencyResolver.getOneRequired('organizations');
        this._rolesClient = this._dependencyResolver.getOneRequired('roles');
    }
    getOrganizationUsersOperation() {
        return (req, res) => {
            this.getOrganizationUsers(req, res);
        };
    }
    grantOrganizationRoleOperation() {
        return (req, res) => {
            this.grantOrganizationRole(req, res);
        };
    }
    revokeOrganizationRoleOperation() {
        return (req, res) => {
            this.revokeOrganizationRole(req, res);
        };
    }
    connectDemoOrganizationOperation() {
        return (req, res) => {
            this.connectDemoOrganization(req, res);
        };
    }
    getOrganizationUsers(req, res) {
        let orgId = req.route.params.org_id;
        let paging = this.getPagingParams(req);
        let roles;
        let accounts;
        async.series([
            // Get roles with account ids
            (callback) => {
                this._rolesClient.getOrganizationUserRoles(null, orgId, paging, (err, data) => {
                    roles = data;
                    callback(err);
                });
            },
            // Get user accounts
            (callback) => {
                let accountIds = _.map(roles, (r) => r.id);
                this._accountsClient.getAccounts(null, pip_services3_commons_node_2.FilterParams.fromTuples('ids', accountIds), paging, (err, page) => {
                    accounts = page != null ? page.data : [];
                    callback(err);
                });
            },
            // Attach roles to users
            (callback) => {
                for (let account of accounts) {
                    let accountRoles = _.find(roles, (r) => r.id == account.id);
                    account.roles = accountRoles != null ? accountRoles.roles : [];
                }
                callback();
            }
        ], (err) => {
            if (err)
                this.sendError(req, res, err);
            else
                res.json(new pip_services3_commons_node_1.DataPage(accounts || []));
        });
    }
    grantOrganizationRole(req, res) {
        let orgId = req.route.params.org_id;
        let userId = req.param('user_id');
        let role = req.param('role');
        this._rolesClient.grantOrgRole(null, orgId, userId, role, this.sendResult(req, res));
    }
    revokeOrganizationRole(req, res) {
        let orgId = req.route.params.org_id;
        let userId = req.param('user_id');
        let role = req.param('role');
        this._rolesClient.revokeOrgRole(null, orgId, userId, role, this.sendResult(req, res));
    }
    connectDemoOrganization(req, res) {
        let userId = req.param('user_id');
        let language = req.param('language') == 'ru' ? 'ru' : 'en';
        let orgId;
        let organization;
        async.series([
            // Connect to demo organization
            (callback) => {
                this._rolesClient.grantDemoOrganizationUserRole(null, userId, language, (err, data) => {
                    orgId = data;
                    callback(err);
                });
            },
            // Get the organization
            (callback) => {
                this._organizationsClient.getOrganizationById(null, orgId, (err, data) => {
                    organization = data;
                    callback(err);
                });
            },
            // Update current user session
            (callback) => {
                if (req.user != null && req.session_id != null && organization != null) {
                    let user = req.user;
                    user.roles = user.roles || [];
                    user.roles = _.filter(user.roles, r => r != orgId + ':user');
                    user.roles.push(orgId + ':user');
                    user.organizations = user.organizations || [];
                    user.organizations = _.filter(user.organizations, s => s.id != organization.id);
                    user.organizations.push(organization);
                    this._sessionsClient.updateSessionUser(null, req.session_id, user, callback);
                }
                else
                    callback();
            }
        ], (err) => {
            if (err)
                this.sendError(req, res, err);
            else
                res.json(orgId);
        });
    }
}
exports.RolesOperationsV1 = RolesOperationsV1;
//# sourceMappingURL=RolesOperationsV1.js.map