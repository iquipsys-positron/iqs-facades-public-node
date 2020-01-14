"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class DeviceConfigsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('device-configs', new pip_services3_commons_node_1.Descriptor('iqs-services-deviceconfigs', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._configsClient = this._dependencyResolver.getOneRequired('device-configs');
    }
    getConfigOperation() {
        return (req, res) => {
            this.getConfig(req, res);
        };
    }
    setConfigOperation() {
        return (req, res) => {
            this.setConfig(req, res);
        };
    }
    deleteConfigOperation() {
        return (req, res) => {
            this.deleteConfig(req, res);
        };
    }
    requestConfigOperation() {
        return (req, res) => {
            this.requestConfig(req, res);
        };
    }
    sendConfigOperation() {
        return (req, res) => {
            this.sendConfig(req, res);
        };
    }
    receiveConfigOperation() {
        return (req, res) => {
            this.receiveConfig(req, res);
        };
    }
    getConfig(req, res) {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;
        this._configsClient.getConfigById(null, deviceId, this.sendResult(req, res));
    }
    setConfig(req, res) {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;
        let config = req.body || {};
        config.id = deviceId;
        this._configsClient.setConfig(null, config, this.sendResult(req, res));
    }
    deleteConfig(req, res) {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;
        this._configsClient.deleteConfigById(null, deviceId, this.sendResult(req, res));
    }
    requestConfig(req, res) {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;
        this._configsClient.requestConfigById(null, deviceId, this.sendEmptyResult(req, res));
    }
    sendConfig(req, res) {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;
        let config = req.body || {};
        config.id = deviceId;
        this._configsClient.sendConfig(null, config, this.sendResult(req, res));
    }
    receiveConfig(req, res) {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;
        let config = req.body || {};
        config.id = deviceId;
        this._configsClient.receiveConfig(null, config, this.sendResult(req, res));
    }
}
exports.DeviceConfigsOperationsV1 = DeviceConfigsOperationsV1;
//# sourceMappingURL=DeviceConfigsOperationsV1.js.map