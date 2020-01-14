let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IDeviceConfigsClientV1 } from 'iqs-clients-deviceconfigs-node';
import { DeviceConfigV1 } from 'iqs-clients-deviceconfigs-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class DeviceConfigsOperationsV1  extends FacadeOperations {
    private _configsClient: IDeviceConfigsClientV1;
    
    public constructor() {
        super();

        this._dependencyResolver.put('device-configs', new Descriptor('iqs-services-deviceconfigs', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._configsClient = this._dependencyResolver.getOneRequired<IDeviceConfigsClientV1>('device-configs');
    }

    public getConfigOperation() {
        return (req, res) => {
            this.getConfig(req, res);
        }
    }

    public setConfigOperation() {
        return (req, res) => {
            this.setConfig(req, res);
        }
    }

    public deleteConfigOperation() {
        return (req, res) => {
            this.deleteConfig(req, res);
        }
    }

    public requestConfigOperation() {
        return (req, res) => {
            this.requestConfig(req, res);
        }
    }

    public sendConfigOperation() {
        return (req, res) => {
            this.sendConfig(req, res);
        }
    }

    public receiveConfigOperation() {
        return (req, res) => {
            this.receiveConfig(req, res);
        }
    }

    private getConfig(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;

        this._configsClient.getConfigById(
            null, deviceId, this.sendResult(req, res)
        );
    }

    private setConfig(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;
        let config = req.body || {};
        config.id = deviceId;

        this._configsClient.setConfig(
            null, config, this.sendResult(req, res)
        );
    }

    private deleteConfig(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;

        this._configsClient.deleteConfigById(
            null, deviceId, this.sendResult(req, res)
        );
    }

    private requestConfig(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;

        this._configsClient.requestConfigById(
            null, deviceId, this.sendEmptyResult(req, res)
        );
    }
    
    private sendConfig(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;
        let config = req.body || {};
        config.id = deviceId;

        this._configsClient.sendConfig(
            null, config, this.sendResult(req, res)
        );
    }

    private receiveConfig(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let deviceId = req.route.params.device_id;
        let config = req.body || {};
        config.id = deviceId;

        this._configsClient.receiveConfig(
            null, config, this.sendResult(req, res)
        );
    }

}