"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class OrganizationStatisticsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('statistics', new pip_services3_commons_node_1.Descriptor('iqs-services-statistics', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._statisticsClient = this._dependencyResolver.getOneRequired('statistics');
    }
    getGroupsOperation() {
        return (req, res) => {
            this.getGroups(req, res);
        };
    }
    getCountersOperation() {
        return (req, res) => {
            this.getCounters(req, res);
        };
    }
    readCounterOperation() {
        return (req, res) => {
            this.readCounter(req, res);
        };
    }
    readCountersByGroupOperation() {
        return (req, res) => {
            this.readCountersByGroup(req, res);
        };
    }
    readCountersOperation() {
        return (req, res) => {
            this.readCounters(req, res);
        };
    }
    incrementCounterOperation() {
        return (req, res) => {
            this.incrementCounter(req, res);
        };
    }
    getGroups(req, res) {
        let orgId = req.route.params.org_id;
        let paging = this.getPagingParams(req);
        this._statisticsClient.getGroups(null, orgId, paging, this.sendResult(req, res));
    }
    getCounters(req, res) {
        let orgId = req.route.params.org_id;
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._statisticsClient.getCounters(null, orgId, filter, paging, this.sendResult(req, res));
    }
    readCounter(req, res) {
        let orgId = req.route.params.org_id;
        let name = req.param('name');
        let group = req.param('group') || orgId;
        let type = pip_services3_commons_node_2.IntegerConverter.toInteger(req.param('type'));
        let fromTime = pip_services3_commons_node_3.DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = pip_services3_commons_node_3.DateTimeConverter.toNullableDateTime(req.param('to_time'));
        let timezone = req.param('timezone');
        this._statisticsClient.readOneCounter(null, orgId, group, name, type, fromTime, toTime, timezone, this.sendResult(req, res));
    }
    readCountersByGroup(req, res) {
        let orgId = req.route.params.org_id;
        let group = req.param('group') || orgId;
        let type = pip_services3_commons_node_2.IntegerConverter.toInteger(req.param('type'));
        let fromTime = pip_services3_commons_node_3.DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = pip_services3_commons_node_3.DateTimeConverter.toNullableDateTime(req.param('to_time'));
        let timezone = req.param('timezone');
        this._statisticsClient.readCountersByGroup(null, orgId, group, type, fromTime, toTime, timezone, this.sendResult(req, res));
    }
    readCounters(req, res) {
        let orgId = req.route.params.org_id;
        let counters = req.body;
        let type = pip_services3_commons_node_2.IntegerConverter.toInteger(req.param('type'));
        let fromTime = pip_services3_commons_node_3.DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = pip_services3_commons_node_3.DateTimeConverter.toNullableDateTime(req.param('to_time'));
        let timezone = req.param('timezone');
        this._statisticsClient.readCounters(null, orgId, counters, type, fromTime, toTime, timezone, this.sendResult(req, res));
    }
    incrementCounter(req, res) {
        let orgId = req.route.params.org_id;
        let group = req.param('group') || orgId;
        let name = req.param('name');
        let time = req.param('time');
        let timezone = req.param('timezone');
        let value = pip_services3_commons_node_2.IntegerConverter.toInteger(req.param('value'));
        this._statisticsClient.incrementCounter(null, orgId, group, name, time, timezone, value, this.sendEmptyResult(req, res));
    }
}
exports.OrganizationStatisticsOperationsV1 = OrganizationStatisticsOperationsV1;
//# sourceMappingURL=OrganizationStatisticsOperationsV1.js.map