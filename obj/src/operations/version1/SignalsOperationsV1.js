"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class SignalsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('signals', new pip_services3_commons_node_1.Descriptor('iqs-services-signals', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._signalsClient = this._dependencyResolver.getOneRequired('signals');
    }
    getSignalsOperation() {
        return (req, res) => {
            this.getSignals(req, res);
        };
    }
    sendSignalOperation() {
        return (req, res) => {
            this.sendSignal(req, res);
        };
    }
    lockSignalOperation() {
        return (req, res) => {
            this.lockSignal(req, res);
        };
    }
    markSignalSentOperation() {
        return (req, res) => {
            this.markSignalSent(req, res);
        };
    }
    deleteSignalOperation() {
        return (req, res) => {
            this.deleteSignal(req, res);
        };
    }
    getSignals(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._signalsClient.getSignals(null, filter, paging, this.sendResult(req, res));
    }
    sendSignal(req, res) {
        let orgId = req.route.params.org_id;
        let signal = req.body || {};
        this._signalsClient.sendSignal(null, signal, this.sendResult(req, res));
    }
    lockSignal(req, res) {
        let orgId = req.route.params.org_id;
        let signalId = req.route.params.signal_id;
        this._signalsClient.lockSignal(null, signalId, this.sendResult(req, res));
    }
    markSignalSent(req, res) {
        let orgId = req.route.params.org_id;
        let signalId = req.route.params.signal_id;
        this._signalsClient.markSignalSent(null, signalId, this.sendResult(req, res));
    }
    deleteSignal(req, res) {
        let orgId = req.route.params.org_id;
        let signalId = req.route.params.signal_id;
        this._signalsClient.deleteSignalById(null, signalId, this.sendResult(req, res));
    }
}
exports.SignalsOperationsV1 = SignalsOperationsV1;
//# sourceMappingURL=SignalsOperationsV1.js.map