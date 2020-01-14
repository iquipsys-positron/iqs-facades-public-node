"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class ShiftsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('shifts', new pip_services3_commons_node_1.Descriptor('iqs-services-shifts', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._shiftsClient = this._dependencyResolver.getOneRequired('shifts');
    }
    getShiftsOperation() {
        return (req, res) => {
            this.getShifts(req, res);
        };
    }
    getShiftOperation() {
        return (req, res) => {
            this.getShift(req, res);
        };
    }
    createShiftOperation() {
        return (req, res) => {
            this.createShift(req, res);
        };
    }
    updateShiftOperation() {
        return (req, res) => {
            this.updateShift(req, res);
        };
    }
    deleteShiftOperation() {
        return (req, res) => {
            this.deleteShift(req, res);
        };
    }
    getShifts(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._shiftsClient.getShifts(null, filter, paging, this.sendResult(req, res));
    }
    getShift(req, res) {
        let orgId = req.route.params.org_id;
        let shiftId = req.route.params.shift_id;
        this._shiftsClient.getShiftById(null, shiftId, this.sendResult(req, res));
    }
    createShift(req, res) {
        let orgId = req.route.params.org_id;
        let shift = req.body || {};
        this._shiftsClient.createShift(null, shift, this.sendResult(req, res));
    }
    updateShift(req, res) {
        let orgId = req.route.params.org_id;
        let shiftId = req.route.params.shift_id;
        let shift = req.body || {};
        shift.id = shiftId;
        this._shiftsClient.updateShift(null, shift, this.sendResult(req, res));
    }
    deleteShift(req, res) {
        let orgId = req.route.params.org_id;
        let shiftId = req.route.params.shift_id;
        this._shiftsClient.deleteShiftById(null, shiftId, this.sendResult(req, res));
    }
}
exports.ShiftsOperationsV1 = ShiftsOperationsV1;
//# sourceMappingURL=ShiftsOperationsV1.js.map