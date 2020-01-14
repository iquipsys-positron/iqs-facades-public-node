let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IControlObjectsClientV1 } from 'iqs-clients-controlobjects-node';
import { ControlObjectV1 } from 'iqs-clients-controlobjects-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class ControlObjectsOperationsV1  extends FacadeOperations {
    private _objectsClient: IControlObjectsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('control-objects', new Descriptor('iqs-services-controlobjects', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._objectsClient = this._dependencyResolver.getOneRequired<IControlObjectsClientV1>('control-objects');
    }

    public getObjectsOperation() {
        return (req, res) => {
            this.getObjects(req, res);
        }
    }

    public getObjectOperation() {
        return (req, res) => {
            this.getObject(req, res);
        }
    }

    public createObjectOperation() {
        return (req, res) => {
            this.createObject(req, res);
        }
    }

    public updateObjectOperation() {
        return (req, res) => {
            this.updateObject(req, res);
        }
    }

    public deleteObjectOperation() {
        return (req, res) => {
            this.deleteObject(req, res);
        }
    }

    private getObjects(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._objectsClient.getObjects(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getObject(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let objectId = req.route.params.object_id;

        this._objectsClient.getObjectById(
            null, objectId, this.sendResult(req, res)
        );
    }

    private createObject(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let obj = req.body || {};

        this._objectsClient.createObject(
            null, obj, this.sendResult(req, res)
        );
    }

    private updateObject(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let objectId = req.route.params.object_id;
        let obj = req.body || {};
        obj.id = objectId;

        this._objectsClient.updateObject(
            null, obj, this.sendResult(req, res)
        );
    }

    private deleteObject(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let objectId = req.route.params.object_id;

        this._objectsClient.deleteObjectById(
            null, objectId, this.sendResult(req, res)
        );
    }

}