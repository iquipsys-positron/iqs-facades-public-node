"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class ObjectPositionsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('object-positions', new pip_services3_commons_node_2.Descriptor('pip-services-positions', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._positionsClient = this._dependencyResolver.getOneRequired('object-positions');
    }
    getPositionsOperation() {
        return (req, res) => {
            this.getPositions(req, res);
        };
    }
    getPositionsCountOperation() {
        return (req, res) => {
            this.getPositionsCount(req, res);
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
    deletePositionsOperation() {
        return (req, res) => {
            this.deletePositions(req, res);
        };
    }
    getPositions(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._positionsClient.getPositions(null, orgId, filter, paging, this.sendResult(req, res));
    }
    getPositionsCount(req, res) {
        let group = req.body || {};
        let filter = new pip_services3_commons_node_1.FilterParams(pip_services3_commons_node_1.FilterParams.fromMaps(pip_services3_commons_node_1.FilterParams.fromValue(req.body), this.getFilterParams(req)));
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._positionsClient.getPositionsCount(null, orgId, filter, this.sendResult(req, res));
    }
    addPosition(req, res) {
        let orgId = req.route.params.org_id;
        let objectId = req.param('object_id');
        let time = pip_services3_commons_node_3.DateTimeConverter.toDateTimeWithDefault(req.param('time'), new Date());
        let lat = pip_services3_commons_node_4.FloatConverter.toFloat(req.param('lat'));
        let lng = pip_services3_commons_node_4.FloatConverter.toFloat(req.param('lng'));
        let alt = pip_services3_commons_node_4.FloatConverter.toNullableFloat(req.param('alt'));
        let speed = pip_services3_commons_node_4.FloatConverter.toNullableFloat(req.param('speed'));
        let angle = pip_services3_commons_node_4.FloatConverter.toNullableFloat(req.param('angle'));
        this._positionsClient.addPosition(null, orgId, objectId, time, lat, lng, alt, speed, angle, this.sendEmptyResult(req, res));
    }
    addPositions(req, res) {
        let orgId = req.route.params.org_id;
        let positions = req.body;
        this._positionsClient.addPositions(null, orgId, positions, this.sendEmptyResult(req, res));
    }
    deletePositions(req, res) {
        let filter = this.getFilterParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._positionsClient.deletePositions(null, orgId, filter, this.sendEmptyResult(req, res));
    }
}
exports.ObjectPositionsOperationsV1 = ObjectPositionsOperationsV1;
//# sourceMappingURL=ObjectPositionsOperationsV1.js.map