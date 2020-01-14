let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';
import { FloatConverter } from 'pip-services3-commons-node';

import { IPositionsClientV1 } from 'pip-clients-positions-node';
import { ObjectPositionsV1 } from 'pip-clients-positions-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class ObjectPositionsOperationsV1  extends FacadeOperations {
    private _positionsClient: IPositionsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('object-positions', new Descriptor('pip-services-positions', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._positionsClient = this._dependencyResolver.getOneRequired<IPositionsClientV1>('object-positions');
    }

    public getPositionsOperation() {
        return (req, res) => {
            this.getPositions(req, res);
        }
    }

    public getPositionsCountOperation() {
        return (req, res) => {
            this.getPositionsCount(req, res);
        }
    }

    public addPositionOperation() {
        return (req, res) => {
            this.addPosition(req, res);
        }
    }

    public addPositionsOperation() {
        return (req, res) => {
            this.addPositions(req, res);
        }
    }
    
    public deletePositionsOperation() {
        return (req, res) => {
            this.deletePositions(req, res);
        }
    }

    private getPositions(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._positionsClient.getPositions(
            null, orgId, filter, paging, this.sendResult(req, res)
        );
    }

    private getPositionsCount(req: any, res: any): void {
        let group = req.body || {};
        let filter = new FilterParams(FilterParams.fromMaps(
            FilterParams.fromValue(req.body),
            this.getFilterParams(req)
        ));

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._positionsClient.getPositionsCount(
            null, orgId, filter, this.sendResult(req, res)
        );
    }

    private addPosition(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let objectId = req.param('object_id');
        let time = DateTimeConverter.toDateTimeWithDefault(req.param('time'), new Date());
        let lat = FloatConverter.toFloat(req.param('lat'));
        let lng = FloatConverter.toFloat(req.param('lng'));
        let alt = FloatConverter.toNullableFloat(req.param('alt'));
        let speed = FloatConverter.toNullableFloat(req.param('speed'));
        let angle = FloatConverter.toNullableFloat(req.param('angle'));

        this._positionsClient.addPosition(
            null, orgId, objectId, time, lat, lng, alt, speed, angle, this.sendEmptyResult(req, res)
        );
    }

    private addPositions(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let positions = req.body;

        this._positionsClient.addPositions(
            null, orgId, positions, this.sendEmptyResult(req, res)
        );
    }
    
    private deletePositions(req: any, res: any): void {
        let filter = this.getFilterParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._positionsClient.deletePositions(
            null, orgId, filter, this.sendEmptyResult(req, res)
        );
    }

}