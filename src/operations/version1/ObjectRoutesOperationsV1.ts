let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IRoutesClientV1 } from 'pip-clients-routes-node';
import { ObjectRouteV1 } from 'pip-clients-routes-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class ObjectRoutesOperationsV1  extends FacadeOperations {
    private _routesClient: IRoutesClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('object-routes', new Descriptor('pip-services-routes', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._routesClient = this._dependencyResolver.getOneRequired<IRoutesClientV1>('object-routes');
    }

    public getRoutesOperation() {
        return (req, res) => {
            this.getRoutes(req, res);
        }
    }

    public getRouteOperation() {
        return (req, res) => {
            this.getRoute(req, res);
        }
    }

    public createRouteOperation() {
        return (req, res) => {
            this.createRoute(req, res);
        }
    }

    public updateRouteOperation() {
        return (req, res) => {
            this.updateRoute(req, res);
        }
    }

    public deleteRouteOperation() {
        return (req, res) => {
            this.deleteRoute(req, res);
        }
    }

    public deleteRoutesOperation() {
        return (req, res) => {
            this.deleteRoutes(req, res);
        }
    }
    
    private getRoutes(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._routesClient.getRoutes(
            null, orgId, filter, paging, this.sendResult(req, res)
        );
    }

    private getRoute(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let routeId = req.route.params.route_id;

        this._routesClient.getRouteById(
            null, orgId, routeId, this.sendResult(req, res)
        );
    }

    private createRoute(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let route = req.body || {};

        this._routesClient.createRoute(
            null, orgId, route, this.sendResult(req, res)
        );
    }

    private updateRoute(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let routeId = req.route.params.route_id;
        let route = req.body || {};
        route.id = routeId;

        this._routesClient.updateRoute(
            null, orgId, route, this.sendResult(req, res)
        );
    }

    private deleteRoute(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let routeId = req.route.params.route_id;

        this._routesClient.deleteRouteById(
            null, orgId, routeId, this.sendResult(req, res)
        );
    }

    private deleteRoutes(req: any, res: any): void {
        let filter = this.getFilterParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);

        this._routesClient.deleteRoutes(
            null, orgId, filter, this.sendEmptyResult(req, res)
        );
    }
    
}