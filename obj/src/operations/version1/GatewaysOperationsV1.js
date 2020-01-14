"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class GatewaysOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('gateways', new pip_services3_commons_node_1.Descriptor('iqs-services-gateways', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('mqttgateway', new pip_services3_commons_node_1.Descriptor('iqs-services-mqttgateway', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._gatewaysClient = this._dependencyResolver.getOneRequired('gateways');
        this._mqttGatewayClient = this._dependencyResolver.getOneRequired('mqttgateway');
    }
    getGatewaysOperation() {
        return (req, res) => {
            this.getGateways(req, res);
        };
    }
    getGatewayOperation() {
        return (req, res) => {
            this.getGateway(req, res);
        };
    }
    createGatewayOperation() {
        return (req, res) => {
            this.createGateway(req, res);
        };
    }
    updateGatewayOperation() {
        return (req, res) => {
            this.updateGateway(req, res);
        };
    }
    deleteGatewayOperation() {
        return (req, res) => {
            this.deleteGateway(req, res);
        };
    }
    validateGatewayUdiOperation() {
        return (req, res) => {
            this.validateGatewayUdi(req, res);
        };
    }
    pingGatewayOperation() {
        return (req, res) => {
            this.pingGateway(req, res);
        };
    }
    requestStatisticsOperation() {
        return (req, res) => {
            this.requestStatistics(req, res);
        };
    }
    getGateways(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._gatewaysClient.getGateways(null, filter, paging, this.sendResult(req, res));
    }
    getGateway(req, res) {
        let orgId = req.route.params.org_id;
        let gatewayId = req.route.params.gateway_id;
        this._gatewaysClient.getGatewayById(null, gatewayId, this.sendResult(req, res));
    }
    createGateway(req, res) {
        let orgId = req.route.params.org_id;
        let gateway = req.body || {};
        this._gatewaysClient.createGateway(null, gateway, this.sendResult(req, res));
    }
    updateGateway(req, res) {
        let orgId = req.route.params.org_id;
        let gatewayId = req.route.params.gateway_id;
        let gateway = req.body || {};
        gateway.id = gatewayId;
        this._gatewaysClient.updateGateway(null, gateway, this.sendResult(req, res));
    }
    deleteGateway(req, res) {
        let orgId = req.route.params.org_id;
        let gatewayId = req.route.params.gateway_id;
        this._gatewaysClient.deleteGatewayById(null, gatewayId, this.sendResult(req, res));
    }
    validateGatewayUdi(req, res) {
        let orgId = req.route.params.org_id;
        let udi = req.param('udi');
        this._gatewaysClient.getGatewayByUdi(null, udi, (err, gateway) => {
            if (gateway)
                res.json(gateway.id);
            else
                res.json('');
        });
    }
    pingGateway(req, res) {
        let orgId = req.route.params.org_id;
        let gatewayId = req.route.params.gateway_id;
        this._mqttGatewayClient.pingGateway(null, orgId, gatewayId, this.sendEmptyResult(req, res));
    }
    requestStatistics(req, res) {
        let orgId = req.route.params.org_id;
        let gatewayId = req.route.params.gateway_id;
        this._mqttGatewayClient.requestStatistics(null, orgId, gatewayId, this.sendEmptyResult(req, res));
    }
}
exports.GatewaysOperationsV1 = GatewaysOperationsV1;
//# sourceMappingURL=GatewaysOperationsV1.js.map