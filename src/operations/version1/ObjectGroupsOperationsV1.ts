let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IObjectGroupsClientV1 } from 'iqs-clients-objectgroups-node';
import { ObjectGroupV1 } from 'iqs-clients-objectgroups-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class ObjectGroupsOperationsV1  extends FacadeOperations {
    private _groupsClient: IObjectGroupsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('object-groups', new Descriptor('iqs-services-objectgroups', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._groupsClient = this._dependencyResolver.getOneRequired<IObjectGroupsClientV1>('object-groups');
    }

    public getGroupsOperation() {
        return (req, res) => {
            this.getGroups(req, res);
        }
    }

    public getGroupOperation() {
        return (req, res) => {
            this.getGroup(req, res);
        }
    }

    public createGroupOperation() {
        return (req, res) => {
            this.createGroup(req, res);
        }
    }

    public updateGroupOperation() {
        return (req, res) => {
            this.updateGroup(req, res);
        }
    }

    public deleteGroupOperation() {
        return (req, res) => {
            this.deleteGroup(req, res);
        }
    }

    private getGroups(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._groupsClient.getGroups(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getGroup(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let groupId = req.route.params.group_id;

        this._groupsClient.getGroupById(
            null, groupId, this.sendResult(req, res)
        );
    }

    private createGroup(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let group = req.body || {};

        this._groupsClient.createGroup(
            null, group, this.sendResult(req, res)
        );
    }

    private updateGroup(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let groupId = req.route.params.group_id;
        let group = req.body || {};
        group.id = groupId;

        this._groupsClient.updateGroup(
            null, group, this.sendResult(req, res)
        );
    }

    private deleteGroup(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let groupId = req.route.params.group_id;

        this._groupsClient.deleteGroupById(
            null, groupId, this.sendResult(req, res)
        );
    }

}