"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class CurrentObjectStatesOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('curr-object-states', new pip_services3_commons_node_1.Descriptor('iqs-services-currobjectstates', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._statesClient = this._dependencyResolver.getOneRequired('curr-object-states');
    }
    getStatesOperation() {
        return (req, res) => {
            this.getStates(req, res);
        };
    }
    getStateOperation() {
        return (req, res) => {
            this.getState(req, res);
        };
    }
    setStateOperation() {
        return (req, res) => {
            this.setState(req, res);
        };
    }
    deleteStateOperation() {
        return (req, res) => {
            this.deleteState(req, res);
        };
    }
    deleteStatesOperation() {
        return (req, res) => {
            this.deleteStates(req, res);
        };
    }
    getStates(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._statesClient.getStates(null, orgId, filter, paging, this.sendResult(req, res));
    }
    getState(req, res) {
        let orgId = req.route.params.org_id;
        let stateId = req.route.params.state_id;
        this._statesClient.getStateById(null, orgId, stateId, this.sendResult(req, res));
    }
    setState(req, res) {
        let orgId = req.route.params.org_id;
        let stateId = req.route.params.state_id;
        let state = req.body || {};
        state.id = stateId;
        this._statesClient.setState(null, orgId, state, this.sendResult(req, res));
    }
    deleteState(req, res) {
        let orgId = req.route.params.org_id;
        let stateId = req.route.params.state_id;
        this._statesClient.deleteStateById(null, orgId, stateId, this.sendResult(req, res));
    }
    deleteStates(req, res) {
        let filter = this.getFilterParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._statesClient.deleteStatesByFilter(null, orgId, filter, this.sendEmptyResult(req, res));
    }
}
exports.CurrentObjectStatesOperationsV1 = CurrentObjectStatesOperationsV1;
//# sourceMappingURL=CurrentObjectStatesOperationsV1.js.map