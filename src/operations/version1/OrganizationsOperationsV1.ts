let _ = require('lodash');
let async = require('async');

import { DataPage } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IOrganizationsClientV1 } from 'pip-clients-organizations-node';
import { OrganizationV1 } from 'pip-clients-organizations-node';
import { IRolesClientV1 } from 'pip-clients-roles-node';
import { ISessionsClientV1 } from 'pip-clients-sessions-node';
import { FacadeOperations } from 'pip-services3-facade-node';

export class OrganizationsOperationsV1  extends FacadeOperations {
    private _rolesClient: IRolesClientV1;
    private _sessionsClient: ISessionsClientV1;
    private _organizationsClient: IOrganizationsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('roles', new Descriptor('pip-services-roles', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('sessions', new Descriptor('pip-services-sessions', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('organizations', new Descriptor('pip-services-organizations', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._rolesClient = this._dependencyResolver.getOneRequired<IRolesClientV1>('roles');
        this._sessionsClient = this._dependencyResolver.getOneRequired<ISessionsClientV1>('sessions');
        this._organizationsClient = this._dependencyResolver.getOneRequired<IOrganizationsClientV1>('organizations');
    }

    public getOrganizationsOperation() {
        return (req, res) => {
            this.getOrganizations(req, res);
        }
    }

    public getAuthorizedOrganizationsOperation() {
        return (req, res) => {
            this.getAuthorizedOrganizations(req, res);
        }
    }
    
    public getOrganizationOperation() {
        return (req, res) => {
            this.getOrganization(req, res);
        }
    }

    public findOrganizationByCodeOperation() {
        return (req, res) => {
            this.findOrganizationByCode(req, res);
        }
    }
    
    public generateCodeOperation() {
        return (req, res) => {
            this.generateCode(req, res);
        }
    }

    public createOrganizationOperation() {
        return (req, res) => {
            this.createOrganization(req, res);
        }
    }

    public updateOrganizationOperation() {
        return (req, res) => {
            this.updateOrganization(req, res);
        }
    }

    public deleteOrganizationOperation() {
        return (req, res) => {
            this.deleteOrganization(req, res);
        }
    }

    public removeOrganizationOperation() {
        return (req, res) => {
            this.removeOrganization(req, res);
        }
    }
    
    public validateOrganizationCodeOperation() {
        return (req, res) => {
            this.validateOrganizationCode(req, res);
        }
    }
    
    private getOrganizations(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        this._organizationsClient.getOrganizations(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getAuthorizedOrganizations(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let roles: string[] = req.user ? req.user.roles || [] : [];
        let orgIds: string[] = [];

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
            res.json(new DataPage([]));
            return;
        }

        filter.setAsObject('ids', orgIds);

        this._organizationsClient.getOrganizations(
            null, filter, paging, this.sendResult(req, res)
        );
    }
    
    private getOrganization(req: any, res: any): void {
        let orgId = req.route.params.org_id;

        this._organizationsClient.getOrganizationById(
            null, orgId, this.sendResult(req, res)
        );
    }

    private findOrganizationByCode(req: any, res: any): void {
        let code = req.param('code');

        this._organizationsClient.getOrganizationByCode(
            null, code, this.sendResult(req, res)
        );
    }
    
    private generateCode(req: any, res: any): void {
        let orgId = req.route.params.org_id;

        this._organizationsClient.generateCode(
            null, orgId, this.sendResult(req, res)
        );
    }

    private createOrganization(req: any, res: any): void {
        let data = req.body || {};
        let organization: OrganizationV1;

        async.series([
            // Create a organization
            (callback) => {
                this._organizationsClient.createOrganization(
                    null, data, (err, data) => {
                        organization = data;
                        callback(err);
                    }
                );
            },
            // Assign permissions to the owner
            (callback) => {
                if (this._rolesClient != null && req.user_id != null)
                    this._rolesClient.grantRoles(null, req.user_id, [ organization.id + ':admin' ], callback);
                else callback();
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
                } else callback();
            }
        ], (err) => {
            if (err) this.sendError(req, res, err);
            else res.json(organization);
        });
    }

    private updateOrganization(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let data = req.body || {};
        data.id = orgId;
        let organization: OrganizationV1;

        async.series([
            // Update organization
            (callback) => {
                this._organizationsClient.updateOrganization(
                    null, data, (err, data) => {
                        organization = data;
                        callback(err);
                    }
                );
            },
            // Update current user session
            (callback) => {
                if (req.user != null && req.session_id != null) {
                    let user = req.user;

                    user.organizations = user.organizations || [];
                    user.organizations = _.filter(user.organizations, s => s.id != organization.id);
                    user.organizations.push(organization);

                    this._sessionsClient.updateSessionUser(null, req.session_id, user, callback);
                } else callback();
            }
        ], (err) => {
            if (err) this.sendError(req, res, err);
            else res.json(organization);
        });
    }

    private deleteOrganization(req: any, res: any): void {
        let orgId = req.route.params.org_id;

        this._organizationsClient.deleteOrganizationById(
            null, orgId, this.sendResult(req, res)
        );
    }

    private removeOrganization(req: any, res: any): void {
        let orgId = req.route.params.org_id;

        async.series([
            // Assign permissions to the owner
            (callback) => {
                if (this._rolesClient != null && req.user_id != null) {
                    this._rolesClient.revokeRoles(
                        null,
                        req.user_id,
                        [
                            orgId + ':admin',
                            orgId + ':manager',
                            orgId + ':user'
                        ],
                        callback
                    );
                } else callback();
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
                } else callback();
            }
        ], (err) => {
            this.sendEmptyResult(req, res)(err);
        });
    }
    
    private validateOrganizationCode(req: any, res: any): void {
        let code = req.param('code');

        this._organizationsClient.getOrganizationByCode(
            null, code, (err, organization) => {
                if (organization) res.json(organization.id);
                else res.json('');
            }
        );
    }
    
}