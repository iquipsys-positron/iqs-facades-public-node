let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';
import { FloatConverter } from 'pip-services3-commons-node';

import { IRouteAnalysisClientV1 } from 'pip-clients-routeanalysis-node';
import { ObjectRouteV1 } from 'pip-clients-routeanalysis-node';
import { ObjectPositionV1 } from 'pip-clients-routeanalysis-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class RouteAnalysisOperationsV1  extends FacadeOperations {
    private _routesClient: IRouteAnalysisClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('route-analysis', new Descriptor('pip-services-routeanalysis', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._routesClient = this._dependencyResolver.getOneRequired<IRouteAnalysisClientV1>('route-analysis');
    }

    public getCurrentRoutesOperation() {
        return (req, res) => {
            this.getCurrentRoutes(req, res);
        }
    }

    public getCurrentRouteOperation() {
        return (req, res) => {
            this.getCurrentRoute(req, res);
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

    private getCurrentRoutes(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._routesClient.getCurrentRoutes(
            null, orgId, filter, paging, this.sendResult(req, res)
        );
    }

    private getCurrentRoute(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let objectId = req.route.params.object_id;
        let fromTime = DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = DateTimeConverter.toNullableDateTime(req.param('to_time'));

        this._routesClient.getCurrentRoute(
            null, orgId, objectId, fromTime, toTime, this.sendResult(req, res)
        );
    }

    private addPosition(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let position: ObjectPositionV1 = req.body;
        
        if (position == null || _.isEmpty(position)) {
            position = {
                org_id: req.route.params.org_id,
                object_id: req.param('object_id'),
                time: DateTimeConverter.toDateTimeWithDefault(req.param('time'), new Date()),
                lat: FloatConverter.toFloat(req.param('lat')),
                lng: FloatConverter.toFloat(req.param('lng')),
                alt: FloatConverter.toNullableFloat(req.param('alt')),
                speed: FloatConverter.toNullableFloat(req.param('speed')),
                angle: FloatConverter.toNullableFloat(req.param('angle'))
            };
        }
        
        position.org_id = orgId;

        this._routesClient.addPosition(
            null, orgId, position, this.sendEmptyResult(req, res)
        );
    }

    private addPositions(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let positions = req.body;

        this._routesClient.addPositions(
            null, orgId, positions, this.sendEmptyResult(req, res)
        );
    }

}