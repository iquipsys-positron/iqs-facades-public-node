"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class ObjectRoutesOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('object-routes', new pip_services3_commons_node_1.Descriptor('pip-services-routes', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._routesClient = this._dependencyResolver.getOneRequired('object-routes');
    }
    getRoutesOperation() {
        return (req, res) => {
            this.getRoutes(req, res);
        };
    }
    getRouteOperation() {
        return (req, res) => {
            this.getRoute(req, res);
        };
    }
    createRouteOperation() {
        return (req, res) => {
            this.createRoute(req, res);
        };
    }
    updateRouteOperation() {
        return (req, res) => {
            this.updateRoute(req, res);
        };
    }
    deleteRouteOperation() {
        return (req, res) => {
            this.deleteRoute(req, res);
        };
    }
    deleteRoutesOperation() {
        return (req, res) => {
            this.deleteRoutes(req, res);
        };
    }
    getRoutes(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._routesClient.getRoutes(null, orgId, filter, paging, this.sendResult(req, res));
    }
    getRoute(req, res) {
        let orgId = req.route.params.org_id;
        let routeId = req.route.params.route_id;
        this._routesClient.getRouteById(null, orgId, routeId, this.sendResult(req, res));
    }
    createRoute(req, res) {
        let orgId = req.route.params.org_id;
        let route = req.body || {};
        this._routesClient.createRoute(null, orgId, route, this.sendResult(req, res));
    }
    updateRoute(req, res) {
        let orgId = req.route.params.org_id;
        let routeId = req.route.params.route_id;
        let route = req.body || {};
        route.id = routeId;
        this._routesClient.updateRoute(null, orgId, route, this.sendResult(req, res));
    }
    deleteRoute(req, res) {
        let orgId = req.route.params.org_id;
        let routeId = req.route.params.route_id;
        this._routesClient.deleteRouteById(null, orgId, routeId, this.sendResult(req, res));
    }
    deleteRoutes(req, res) {
        let filter = this.getFilterParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._routesClient.deleteRoutes(null, orgId, filter, this.sendEmptyResult(req, res));
    }
}
exports.ObjectRoutesOperationsV1 = ObjectRoutesOperationsV1;
//# sourceMappingURL=ObjectRoutesOperationsV1.js.map