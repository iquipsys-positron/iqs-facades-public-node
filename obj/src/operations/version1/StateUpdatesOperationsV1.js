"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class StateUpdatesOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('state-updates', new pip_services3_commons_node_1.Descriptor('iqs-services-stateupdates', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._stateUpdatesClient = this._dependencyResolver.getOneRequired('state-updates');
    }
    beginUpdateStateOperation() {
        return (req, res) => {
            this.beginUpdateState(req, res);
        };
    }
    updateStateOperation() {
        return (req, res) => {
            this.updateState(req, res);
        };
    }
    beginUpdateState(req, res) {
        let orgId = req.route.params.org_id;
        let stateUpdate = req.body || {};
        this._stateUpdatesClient.beginUpdateState(null, stateUpdate, this.sendEmptyResult(req, res));
    }
    updateState(req, res) {
        let orgId = req.route.params.org_id;
        let stateUpdate = req.body || {};
        this._stateUpdatesClient.updateState(null, stateUpdate, this.sendResult(req, res));
    }
}
exports.StateUpdatesOperationsV1 = StateUpdatesOperationsV1;
//# sourceMappingURL=StateUpdatesOperationsV1.js.map