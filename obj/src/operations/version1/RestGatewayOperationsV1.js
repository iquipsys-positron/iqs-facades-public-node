"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class RestGatewayOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('rest-gateway', new pip_services3_commons_node_1.Descriptor('iqs-services-restgateway', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._restGatewayClient = this._dependencyResolver.getOneRequired('rest-gateway');
    }
    updateStatusOperation() {
        return (req, res) => {
            this.updateStatus(req, res);
        };
    }
    updateStatus(req, res) {
        let message = req.body || {};
        this._restGatewayClient.updateStatus(null, message, this.sendEmptyResult(req, res));
    }
}
exports.RestGatewayOperationsV1 = RestGatewayOperationsV1;
//# sourceMappingURL=RestGatewayOperationsV1.js.map