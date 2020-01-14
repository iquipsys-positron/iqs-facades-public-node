"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class DevicesOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('devices', new pip_services3_commons_node_1.Descriptor('iqs-services-devices', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('mqttgateway', new pip_services3_commons_node_1.Descriptor('iqs-services-mqttgateway', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._devicesClient = this._dependencyResolver.getOneRequired('devices');
        this._mqttGatewayClient = this._dependencyResolver.getOneRequired('mqttgateway');
    }
    getDevicesOperation() {
        return (req, res) => {
            this.getDevices(req, res);
        };
    }
    getDeviceOperation() {
        return (req, res) => {
            this.getDevice(req, res);
        };
    }
    createDeviceOperation() {
        return (req, res) => {
            this.createDevice(req, res);
        };
    }
    updateDeviceOperation() {
        return (req, res) => {
            this.updateDevice(req, res);
        };
    }
    deleteDeviceOperation() {
        return (req, res) => {
            this.deleteDevice(req, res);
        };
    }
    validateDeviceUdiOperation() {
        return (req, res) => {
            this.validateDeviceUdi(req, res);
        };
    }
    pingDeviceOperation() {
        return (req, res) => {
            this.pingDevice(req, res);
        };
    }
    getDevices(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._devicesClient.getDevices(null, filter, paging, this.sendResult(req, res));
    }
    getDevice(req, res) {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;
        this._devicesClient.getDeviceById(null, deviceId, this.sendResult(req, res));
    }
    createDevice(req, res) {
        let orgId = req.route.params.org_id;
        let device = req.body || {};
        this._devicesClient.createDevice(null, device, this.sendResult(req, res));
    }
    updateDevice(req, res) {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;
        let device = req.body || {};
        device.id = deviceId;
        this._devicesClient.updateDevice(null, device, this.sendResult(req, res));
    }
    deleteDevice(req, res) {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;
        this._devicesClient.deleteDeviceById(null, deviceId, this.sendResult(req, res));
    }
    validateDeviceUdi(req, res) {
        let orgId = req.route.params.org_id;
        let udi = req.param('udi');
        this._devicesClient.getDeviceByUdi(null, orgId, udi, (err, device) => {
            if (device)
                res.json(device.id);
            else
                res.json('');
        });
    }
    pingDevice(req, res) {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;
        this._mqttGatewayClient.pingDevice(null, orgId, deviceId, this.sendEmptyResult(req, res));
    }
}
exports.DevicesOperationsV1 = DevicesOperationsV1;
//# sourceMappingURL=DevicesOperationsV1.js.map