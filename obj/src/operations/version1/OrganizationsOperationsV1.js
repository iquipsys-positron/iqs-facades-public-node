"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class OrganizationsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('roles', new pip_services3_commons_node_2.Descriptor('pip-services-roles', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('sessions', new pip_services3_commons_node_2.Descriptor('pip-services-sessions', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('organizations', new pip_services3_commons_node_2.Descriptor('pip-services-organizations', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._rolesClient = this._dependencyResolver.getOneRequired('roles');
        this._sessionsClient = this._dependencyResolver.getOneRequired('sessions');
        this._organizationsClient = this._dependencyResolver.getOneRequired('organizations');
    }
    getOrganizationsOperation() {
        return (req, res) => {
            this.getOrganizations(req, res);
        };
    }
    getAuthorizedOrganizationsOperation() {
        return (req, res) => {
            this.getAuthorizedOrganizations(req, res);
        };
    }
    getOrganizationOperation() {
        return (req, res) => {
            this.getOrganization(req, res);
        };
    }
    findOrganizationByCodeOperation() {
        return (req, res) => {
            this.findOrganizationByCode(req, res);
        };
    }
    generateCodeOperation() {
        return (req, res) => {
            this.generateCode(req, res);
        };
    }
    createOrganizationOperation() {
        return (req, res) => {
            this.createOrganization(req, res);
        };
    }
    updateOrganizationOperation() {
        return (req, res) => {
            this.updateOrganization(req, res);
        };
    }
    deleteOrganizationOperation() {
        return (req, res) => {
            this.deleteOrganization(req, res);
        };
    }
    removeOrganizationOperation() {
        return (req, res) => {
            this.removeOrganization(req, res);
        };
    }
    validateOrganizationCodeOperation() {
        return (req, res) => {
            this.validateOrganizationCode(req, res);
        };
    }
    getOrganizations(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._organizationsClient.getOrganizations(null, filter, paging, this.sendResult(req, res));
    }
    getAuthorizedOrganizations(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let roles = req.user ? req.user.roles || [] : [];
        let orgIds = [];
        // Get authorized organization ids
        for (let role of roles) {
            let tokens = role.split(':');
            if (tokens.length == 2)
                orgIds.push(tokens[0]);
        }
        // Consider ids parameter
        let oldOrganizationIds = filter.get('ids');
        if (oldOrganizationIds)
            orgIds = _.intersection(oldOrganizationIds, orgIds);
        // Is user has no organizations then exit
        if (orgIds.length == 0) {
            res.json(new pip_services3_commons_node_1.DataPage([]));
            return;
        }
        filter.setAsObject('ids', orgIds);
        this._organizationsClient.getOrganizations(null, filter, paging, this.sendResult(req, res));
    }
    getOrganization(req, res) {
        let orgId = req.route.params.org_id;
        this._organizationsClient.getOrganizationById(null, orgId, this.sendResult(req, res));
    }
    findOrganizationByCode(req, res) {
        let code = req.param('code');
        this._organizationsClient.getOrganizationByCode(null, code, this.sendResult(req, res));
    }
    generateCode(req, res) {
        let orgId = req.route.params.org_id;
        this._organizationsClient.generateCode(null, orgId, this.sendResult(req, res));
    }
    createOrganization(req, res) {
        let data = req.body || {};
        let organization;
        async.series([
            // Create a organization
            (callback) => {
                this._organizationsClient.createOrganization(null, data, (err, data) => {
                    organization = data;
                    callback(err);
                });
            },
            // Assign permissions to the owner
            (callback) => {
                if (this._rolesClient != null && req.user_id != null)
                    this._rolesClient.grantRoles(null, req.user_id, [organization.id + ':admin'], callback);
                else
                    callback();
            },
            // Update current user session
            (callback) => {
                if (req.user != null && req.session_id != null) {
                    let user = req.user;
                    user.roles = user.roles || [];
                    user.roles.push(organization.id + ':admin');
                    user.organizations = user.organizations || [];
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
                res.json(organization);
        });
    }
    updateOrganization(req, res) {
        let orgId = req.route.params.org_id;
        let data = req.body || {};
        data.id = orgId;
        let organization;
        async.series([
            // Update organization
            (callback) => {
                this._organizationsClient.updateOrganization(null, data, (err, data) => {
                    organization = data;
                    callback(err);
                });
            },
            // Update current user session
            (callback) => {
                if (req.user != null && req.session_id != null) {
                    let user = req.user;
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
                res.json(organization);
        });
    }
    deleteOrganization(req, res) {
        let orgId = req.route.params.org_id;
        this._organizationsClient.deleteOrganizationById(null, orgId, this.sendResult(req, res));
    }
    removeOrganization(req, res) {
        let orgId = req.route.params.org_id;
        async.series([
            // Assign permissions to the owner
            (callback) => {
                if (this._rolesClient != null && req.user_id != null) {
                    this._rolesClient.revokeRoles(null, req.user_id, [
                        orgId + ':admin',
                        orgId + ':manager',
                        orgId + ':user'
                    ], callback);
                }
                else
                    callback();
            },
            // Update current user session
            (callback) => {
                if (req.user != null && req.session_id != null) {
                    let user = req.user;
                    user.roles = user.roles || [];
                    user.roles = _.filter(user.roles, r => r != orgId + ':admin');
                    user.roles = _.filter(user.roles, r => r != orgId + ':manager');
                    user.roles = _.filter(user.roles, r => r != orgId + ':user');
                    user.organizations = user.organizations || [];
                    user.organizations = _.filter(user.organizations, s => s.id != orgId);
                    this._sessionsClient.updateSessionUser(null, req.session_id, user, callback);
                }
                else
                    callback();
            }
        ], (err) => {
            this.sendEmptyResult(req, res)(err);
        });
    }
    validateOrganizationCode(req, res) {
        let code = req.param('code');
        this._organizationsClient.getOrganizationByCode(null, code, (err, organization) => {
            if (organization)
                res.json(organization.id);
            else
                res.json('');
        });
    }
}
exports.OrganizationsOperationsV1 = OrganizationsOperationsV1;
//# sourceMappingURL=OrganizationsOperationsV1.js.map