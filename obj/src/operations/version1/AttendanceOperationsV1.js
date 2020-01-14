"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class AttendanceOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('attendance', new pip_services3_commons_node_1.Descriptor('iqs-services-attendance', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._attendanceClient = this._dependencyResolver.getOneRequired('attendance');
    }
    getAttendancesOperation() {
        return (req, res) => {
            this.getAttendances(req, res);
        };
    }
    getAttendancesWithinTimeOperation() {
        return (req, res) => {
            this.getAttendancesWithinTime(req, res);
        };
    }
    addAttendanceOperation() {
        return (req, res) => {
            this.addAttendance(req, res);
        };
    }
    addAttendancesOperation() {
        return (req, res) => {
            this.addAttendances(req, res);
        };
    }
    deleteAttendancesOperation() {
        return (req, res) => {
            this.deleteAttendances(req, res);
        };
    }
    getAttendances(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._attendanceClient.getAttendances(null, orgId, filter, paging, this.sendResult(req, res));
    }
    getAttendancesWithinTime(req, res) {
        let fromTime = pip_services3_commons_node_2.DateTimeConverter.toDateTime(req.param('from_time'));
        let toTime = pip_services3_commons_node_2.DateTimeConverter.toDateTime(req.param('to_time'));
        let orgId = req.route.params.org_id;
        this._attendanceClient.getAttendancesWithinTime(null, orgId, fromTime, toTime, this.sendResult(req, res));
    }
    addAttendance(req, res) {
        let orgId = req.route.params.org_id;
        let attendance = req.body || {};
        this._attendanceClient.addAttendance(null, orgId, attendance, this.sendEmptyResult(req, res));
    }
    addAttendances(req, res) {
        let orgId = req.route.params.org_id;
        let attendances = req.body || [];
        this._attendanceClient.addAttendances(null, orgId, attendances, this.sendEmptyResult(req, res));
    }
    deleteAttendances(req, res) {
        let filter = this.getFilterParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._attendanceClient.deleteAttendances(null, orgId, filter, this.sendEmptyResult(req, res));
    }
}
exports.AttendanceOperationsV1 = AttendanceOperationsV1;
//# sourceMappingURL=AttendanceOperationsV1.js.map