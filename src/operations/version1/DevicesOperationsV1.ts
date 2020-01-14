let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IDevicesClientV1 } from 'iqs-clients-devices-node';
import { DeviceV1 } from 'iqs-clients-devices-node';
import { IMqttGatewayClientV1 } from 'iqs-clients-mqttgateway-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class DevicesOperationsV1  extends FacadeOperations {
    private _devicesClient: IDevicesClientV1;
    private _mqttGatewayClient: IMqttGatewayClientV1;
    
    public constructor() {
        super();

        this._dependencyResolver.put('devices', new Descriptor('iqs-services-devices', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('mqttgateway', new Descriptor('iqs-services-mqttgateway', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._devicesClient = this._dependencyResolver.getOneRequired<IDevicesClientV1>('devices');
        this._mqttGatewayClient = this._dependencyResolver.getOneRequired<IMqttGatewayClientV1>('mqttgateway');
    }

    public getDevicesOperation() {
        return (req, res) => {
            this.getDevices(req, res);
        }
    }

    public getDeviceOperation() {
        return (req, res) => {
            this.getDevice(req, res);
        }
    }

    public createDeviceOperation() {
        return (req, res) => {
            this.createDevice(req, res);
        }
    }

    public updateDeviceOperation() {
        return (req, res) => {
            this.updateDevice(req, res);
        }
    }

    public deleteDeviceOperation() {
        return (req, res) => {
            this.deleteDevice(req, res);
        }
    }

    public validateDeviceUdiOperation() {
        return (req, res) => {
            this.validateDeviceUdi(req, res);
        }
    }

    public pingDeviceOperation() {
        return (req, res) => {
            this.pingDevice(req, res);
        }
    }
    
    private getDevices(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._devicesClient.getDevices(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getDevice(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;

        this._devicesClient.getDeviceById(
            null, deviceId, this.sendResult(req, res)
        );
    }

    private createDevice(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let device = req.body || {};

        this._devicesClient.createDevice(
            null, device, this.sendResult(req, res)
        );
    }

    private updateDevice(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;
        let device = req.body || {};
        device.id = deviceId;

        this._devicesClient.updateDevice(
            null, device, this.sendResult(req, res)
        );
    }

    private deleteDevice(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;

        this._devicesClient.deleteDeviceById(
            null, deviceId, this.sendResult(req, res)
        );
    }

    private validateDeviceUdi(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let udi = req.param('udi');

        this._devicesClient.getDeviceByUdi(
            null, orgId, udi, (err, device) => {
                if (device) res.json(device.id);
                else res.json('');
            }
        );
    }

    private pingDevice(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;

        this._mqttGatewayClient.pingDevice(
            null, orgId, deviceId,
            this.sendEmptyResult(req, res)
        );
    }
    
}