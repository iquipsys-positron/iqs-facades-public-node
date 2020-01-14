let _ = require('lodash');
let async = require('async');

import { DataPage } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';
import { BadRequestException } from 'pip-services3-commons-node';
import { UnauthorizedException } from 'pip-services3-commons-node';
import { HttpRequestDetector } from 'pip-services3-rpc-node';

import { IAccountsClientV1 } from 'pip-clients-accounts-node';
import { AccountV1 } from 'pip-clients-accounts-node';
import { IOrgRolesClientV1 } from 'pip-clients-orgroles-node';
import { UserRolesV1 } from 'pip-clients-orgroles-node';
import { IOrganizationsClientV1 } from 'pip-clients-organizations-node';
import { OrganizationV1 } from 'pip-clients-organizations-node';
import { ISessionsClientV1 } from 'pip-clients-sessions-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class RolesOperationsV1  extends FacadeOperations {
    private _accountsClient: IAccountsClientV1;
    private _sessionsClient: ISessionsClientV1;
    private _organizationsClient: IOrganizationsClientV1;
    private _rolesClient: IOrgRolesClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('accounts', new Descriptor('pip-services-accounts', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('roles', new Descriptor('pip-services-orgroles', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('sessions', new Descriptor('pip-services-sessions', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('organizations', new Descriptor('pip-services-organizations', 'client', '*', '*', '1.0'));
    }

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._accountsClient = this._dependencyResolver.getOneRequired<IAccountsClientV1>('accounts');
        this._sessionsClient = this._dependencyResolver.getOneRequired<ISessionsClientV1>('sessions');
        this._organizationsClient = this._dependencyResolver.getOneRequired<IOrganizationsClientV1>('organizations');
        this._rolesClient = this._dependencyResolver.getOneRequired<IOrgRolesClientV1>('roles');
    }

    public getOrganizationUsersOperation() {
        return (req, res) => {
            this.getOrganizationUsers(req, res);
        }
    }

    public grantOrganizationRoleOperation() {
        return (req, res) => {
            this.grantOrganizationRole(req, res);
        }
    }

    public revokeOrganizationRoleOperation() {
        return (req, res) => {
            this.revokeOrganizationRole(req, res);
        }
    }

    public connectDemoOrganizationOperation() {
        return (req, res) => {
            this.connectDemoOrganization(req, res);
        }
    }
    
    private getOrganizationUsers(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let paging = this.getPagingParams(req);
        let roles: UserRolesV1[];
        let accounts: any[];

        async.series([
            // Get roles with account ids
            (callback) => {
                this._rolesClient.getOrganizationUserRoles(
                    null,
                    orgId,
                    paging,
                    (err, data) => {
                        roles = data;
                        callback(err);
                    }
                );
            },
            // Get user accounts
            (callback) => {
                let accountIds = _.map(roles, (r) => r.id);

                this._accountsClient.getAccounts(null,
                    FilterParams.fromTuples(
                        'ids', accountIds,
                    ),
                    paging,
                    (err, page) => {
                        accounts = page != null ? page.data : [];
                        callback(err);
                    }
                );
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
            if (err) this.sendError(req, res, err);
            else res.json(new DataPage(accounts || []));
        });
    }

    private grantOrganizationRole(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let userId = req.param('user_id');
        let role = req.param('role');

        this._rolesClient.grantOrgRole(
            null, orgId, userId, role, this.sendResult(req, res)
        );
    }

    private revokeOrganizationRole(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let userId = req.param('user_id');
        let role = req.param('role');

        this._rolesClient.revokeOrgRole(
            null, orgId, userId, role, this.sendResult(req, res)
        );
    }

    private connectDemoOrganization(req: any, res: any): void {
        let userId = req.param('user_id');
        let language = req.param('language') == 'ru' ? 'ru' : 'en';
        let orgId: string;
        let organization: OrganizationV1;
        
        async.series([
            // Connect to demo organization
            (callback) => {
                this._rolesClient.grantDemoOrganizationUserRole(
                    null, userId, language, (err, data) => {
                        orgId = data;
                        callback(err);
                    }
                );
            },
            // Get the organization
            (callback) => {
                this._organizationsClient.getOrganizationById(
                    null, orgId, (err, data) => {
                        organization = data;
                        callback(err);
                    }
                );
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
                } else callback();
            }
        ], (err) => {
            if (err) this.sendError(req, res, err);
            else res.json(orgId);
        });
    }
    
}