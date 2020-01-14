let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';
import { FloatConverter } from 'pip-services3-commons-node';

import { ITransducerDataClientV1 } from 'pip-clients-transducerdata-node';
import { ObjectDataV1 } from 'pip-clients-transducerdata-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class ObjectDataOperationsV1  extends FacadeOperations {
    private _dataClient: ITransducerDataClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('object-data', new Descriptor('pip-services-transducerdata', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._dataClient = this._dependencyResolver.getOneRequired<ITransducerDataClientV1>('object-data');
    }

    public getDataOperation() {
        return (req, res) => {
            this.getData(req, res);
        }
    }

    public addDataOperation() {
        return (req, res) => {
            this.addData(req, res);
        }
    }

    public addDataBatchOperation() {
        return (req, res) => {
            this.addDataBatch(req, res);
        }
    }
    
    public deleteDataOperation() {
        return (req, res) => {
            this.deleteData(req, res);
        }
    }

    private getData(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._dataClient.getData(
            null, orgId, filter, paging, this.sendResult(req, res)
        );
    }

    private addData(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        // Todo: Set org_id?
        let data = req.body;

        this._dataClient.addData(
            null, orgId, data, this.sendEmptyResult(req, res)
        );
    }

    private addDataBatch(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        // Todo: Set org_id?
        let data = req.body;

        this._dataClient.addDataBatch(
            null, orgId, data, this.sendEmptyResult(req, res)
        );
    }
    
    private deleteData(req: any, res: any): void {
        let filter = this.getFilterParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._dataClient.deleteData(
            null, orgId, filter, this.sendEmptyResult(req, res)
        );
    }

}