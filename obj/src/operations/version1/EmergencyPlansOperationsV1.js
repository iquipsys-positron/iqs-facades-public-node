"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class EmergencyPlansOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('emergency-plans', new pip_services3_commons_node_1.Descriptor('iqs-services-emergencyplans', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._plansClient = this._dependencyResolver.getOneRequired('emergency-plans');
    }
    getPlansOperation() {
        return (req, res) => {
            this.getPlans(req, res);
        };
    }
    getPlanOperation() {
        return (req, res) => {
            this.getPlan(req, res);
        };
    }
    createPlanOperation() {
        return (req, res) => {
            this.createPlan(req, res);
        };
    }
    updatePlanOperation() {
        return (req, res) => {
            this.updatePlan(req, res);
        };
    }
    deletePlanOperation() {
        return (req, res) => {
            this.deletePlan(req, res);
        };
    }
    getPlans(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._plansClient.getPlans(null, filter, paging, this.sendResult(req, res));
    }
    getPlan(req, res) {
        let orgId = req.route.params.org_id;
        let planId = req.route.params.plan_id;
        this._plansClient.getPlanById(null, planId, this.sendResult(req, res));
    }
    createPlan(req, res) {
        let orgId = req.route.params.org_id;
        let obj = req.body || {};
        this._plansClient.createPlan(null, obj, this.sendResult(req, res));
    }
    updatePlan(req, res) {
        let orgId = req.route.params.org_id;
        let planId = req.route.params.plan_id;
        let obj = req.body || {};
        obj.id = planId;
        this._plansClient.updatePlan(null, obj, this.sendResult(req, res));
    }
    deletePlan(req, res) {
        let orgId = req.route.params.org_id;
        let planId = req.route.params.plan_id;
        this._plansClient.deletePlanById(null, planId, this.sendResult(req, res));
    }
}
exports.EmergencyPlansOperationsV1 = EmergencyPlansOperationsV1;
//# sourceMappingURL=EmergencyPlansOperationsV1.js.map