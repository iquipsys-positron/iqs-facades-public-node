"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class RouteAnalysisOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('route-analysis', new pip_services3_commons_node_1.Descriptor('pip-services-routeanalysis', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._routesClient = this._dependencyResolver.getOneRequired('route-analysis');
    }
    getCurrentRoutesOperation() {
        return (req, res) => {
            this.getCurrentRoutes(req, res);
        };
    }
    getCurrentRouteOperation() {
        return (req, res) => {
            this.getCurrentRoute(req, res);
        };
    }
    addPositionOperation() {
        return (req, res) => {
            this.addPosition(req, res);
        };
    }
    addPositionsOperation() {
        return (req, res) => {
            this.addPositions(req, res);
        };
    }
    getCurrentRoutes(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._routesClient.getCurrentRoutes(null, orgId, filter, paging, this.sendResult(req, res));
    }
    getCurrentRoute(req, res) {
        let orgId = req.route.params.org_id;
        let objectId = req.route.params.object_id;
        let fromTime = pip_services3_commons_node_2.DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = pip_services3_commons_node_2.DateTimeConverter.toNullableDateTime(req.param('to_time'));
        this._routesClient.getCurrentRoute(null, orgId, objectId, fromTime, toTime, this.sendResult(req, res));
    }
    addPosition(req, res) {
        let orgId = req.route.params.org_id;
        let position = req.body;
        if (position == null || _.isEmpty(position)) {
            position = {
                org_id: req.route.params.org_id,
                object_id: req.param('object_id'),
                time: pip_services3_commons_node_2.DateTimeConverter.toDateTimeWithDefault(req.param('time'), new Date()),
                lat: pip_services3_commons_node_3.FloatConverter.toFloat(req.param('lat')),
                lng: pip_services3_commons_node_3.FloatConverter.toFloat(req.param('lng')),
                alt: pip_services3_commons_node_3.FloatConverter.toNullableFloat(req.param('alt')),
                speed: pip_services3_commons_node_3.FloatConverter.toNullableFloat(req.param('speed')),
                angle: pip_services3_commons_node_3.FloatConverter.toNullableFloat(req.param('angle'))
            };
        }
        position.org_id = orgId;
        this._routesClient.addPosition(null, orgId, position, this.sendEmptyResult(req, res));
    }
    addPositions(req, res) {
        let orgId = req.route.params.org_id;
        let positions = req.body;
        this._routesClient.addPositions(null, orgId, positions, this.sendEmptyResult(req, res));
    }
}
exports.RouteAnalysisOperationsV1 = RouteAnalysisOperationsV1;
//# sourceMappingURL=RouteAnalysisOperationsV1.js.map