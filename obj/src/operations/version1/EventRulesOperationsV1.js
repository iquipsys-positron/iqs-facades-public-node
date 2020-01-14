"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class EventRulesOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('event-rules', new pip_services3_commons_node_1.Descriptor('iqs-services-eventrules', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._eventRulesClient = this._dependencyResolver.getOneRequired('event-rules');
    }
    getEventRulesOperation() {
        return (req, res) => {
            this.getEventRules(req, res);
        };
    }
    getEventRuleOperation() {
        return (req, res) => {
            this.getEventRule(req, res);
        };
    }
    createEventRuleOperation() {
        return (req, res) => {
            this.createEventRule(req, res);
        };
    }
    updateEventRuleOperation() {
        return (req, res) => {
            this.updateEventRule(req, res);
        };
    }
    deleteEventRuleOperation() {
        return (req, res) => {
            this.deleteEventRule(req, res);
        };
    }
    getEventRules(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._eventRulesClient.getEventRules(null, filter, paging, this.sendResult(req, res));
    }
    getEventRule(req, res) {
        let orgId = req.route.params.org_id;
        let ruleId = req.route.params.rule_id;
        this._eventRulesClient.getEventRuleById(null, ruleId, this.sendResult(req, res));
    }
    createEventRule(req, res) {
        let orgId = req.route.params.org_id;
        let rule = req.body || {};
        this._eventRulesClient.createEventRule(null, rule, this.sendResult(req, res));
    }
    updateEventRule(req, res) {
        let orgId = req.route.params.org_id;
        let ruleId = req.route.params.rule_id;
        let rule = req.body || {};
        rule.id = ruleId;
        this._eventRulesClient.updateEventRule(null, rule, this.sendResult(req, res));
    }
    deleteEventRule(req, res) {
        let orgId = req.route.params.org_id;
        let ruleId = req.route.params.rule_id;
        this._eventRulesClient.deleteEventRuleById(null, ruleId, this.sendResult(req, res));
    }
}
exports.EventRulesOperationsV1 = EventRulesOperationsV1;
//# sourceMappingURL=EventRulesOperationsV1.js.map