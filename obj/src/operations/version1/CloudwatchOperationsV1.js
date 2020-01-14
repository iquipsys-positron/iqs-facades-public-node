"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class CloudwatchOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('cloudwatch', new pip_services3_commons_node_2.Descriptor('iqs-services-cloudwatch', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._cloudwatchClient = this._dependencyResolver.getOneRequired('cloudwatch');
    }
    getAWSLogGroupsOperation() {
        return (req, res) => {
            this.getAWSLogGroups(req, res);
        };
    }
    getAWSLogStreamsOperation() {
        return (req, res) => {
            this.getAWSLogStreams(req, res);
        };
    }
    getAWSLogEventsOperation() {
        return (req, res) => {
            this.getAWSLogEvents(req, res);
        };
    }
    getAWSMetricDataOperation() {
        return (req, res) => {
            this.getAWSMetricData(req, res);
        };
    }
    getAWSLogGroups(req, res) {
        let namePrefix = req.param('name_prefix');
        let limit = req.param('limit');
        this._cloudwatchClient.getLogGroups(null, namePrefix, limit, this.sendResult(req, res));
    }
    getAWSLogStreams(req, res) {
        let group = req.param('group');
        let streamPrefix = req.param('stream_prefix');
        let limit = req.param('limit');
        this._cloudwatchClient.getLogStreams(null, group, streamPrefix, limit, this.sendResult(req, res));
    }
    getAWSLogEvents(req, res) {
        let group = req.param('group');
        let stream = req.param('stream');
        let startTime = new Date(req.param('start_time'));
        let endTime = new Date(req.param('end_time'));
        let filter = req.param('filter');
        let limit = pip_services3_commons_node_1.IntegerConverter.toInteger(req.param('limit'));
        this._cloudwatchClient.getLogEvents(null, group, stream, startTime, endTime, filter, limit, this.sendResult(req, res));
    }
    getAWSMetricData(req, res) {
        let namespace = req.param('namespace');
        let startTime = new Date(req.param('start_time'));
        let endTime = new Date(req.param('end_time'));
        let period = pip_services3_commons_node_1.IntegerConverter.toInteger(req.param('period'));
        let type = req.param('type');
        let unit = req.param('unit');
        let metric = req.param('metric');
        this._cloudwatchClient.getMetricData(null, namespace, startTime, endTime, period, type, unit, metric, this.sendResult(req, res));
    }
}
exports.CloudwatchOperationsV1 = CloudwatchOperationsV1;
//# sourceMappingURL=CloudwatchOperationsV1.js.map