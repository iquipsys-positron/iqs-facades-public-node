let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IGatewaysClientV1 } from 'iqs-clients-gateways-node';
import { GatewayV1 } from 'iqs-clients-gateways-node';
import { IMqttGatewayClientV1 } from 'iqs-clients-mqttgateway-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class GatewaysOperationsV1  extends FacadeOperations {
    private _gatewaysClient: IGatewaysClientV1;
    private _mqttGatewayClient: IMqttGatewayClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('gateways', new Descriptor('iqs-services-gateways', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('mqttgateway', new Descriptor('iqs-services-mqttgateway', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._gatewaysClient = this._dependencyResolver.getOneRequired<IGatewaysClientV1>('gateways');
        this._mqttGatewayClient = this._dependencyResolver.getOneRequired<IMqttGatewayClientV1>('mqttgateway');
    }

    public getGatewaysOperation() {
        return (req, res) => {
            this.getGateways(req, res);
        }
    }

    public getGatewayOperation() {
        return (req, res) => {
            this.getGateway(req, res);
        }
    }

    public createGatewayOperation() {
        return (req, res) => {
            this.createGateway(req, res);
        }
    }

    public updateGatewayOperation() {
        return (req, res) => {
            this.updateGateway(req, res);
        }
    }

    public deleteGatewayOperation() {
        return (req, res) => {
            this.deleteGateway(req, res);
        }
    }

    public validateGatewayUdiOperation() {
        return (req, res) => {
            this.validateGatewayUdi(req, res);
        }
    }

    public pingGatewayOperation() {
        return (req, res) => {
            this.pingGateway(req, res);
        }
    }

    public requestStatisticsOperation() {
        return (req, res) => {
            this.requestStatistics(req, res);
        }
    }

    private getGateways(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._gatewaysClient.getGateways(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getGateway(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let gatewayId = req.route.params.gateway_id;

        this._gatewaysClient.getGatewayById(
            null, gatewayId, this.sendResult(req, res)
        );
    }

    private createGateway(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let gateway = req.body || {};

        this._gatewaysClient.createGateway(
            null, gateway, this.sendResult(req, res)
        );
    }

    private updateGateway(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let gatewayId = req.route.params.gateway_id;
        let gateway = req.body || {};
        gateway.id = gatewayId;

        this._gatewaysClient.updateGateway(
            null, gateway, this.sendResult(req, res)
        );
    }

    private deleteGateway(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let gatewayId = req.route.params.gateway_id;

        this._gatewaysClient.deleteGatewayById(
            null, gatewayId, this.sendResult(req, res)
        );
    }

    private validateGatewayUdi(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let udi = req.param('udi');

        this._gatewaysClient.getGatewayByUdi(
            null, udi, (err, gateway) => {
                if (gateway) res.json(gateway.id);
                else res.json('');
            }
        );
    }

    private pingGateway(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let gatewayId = req.route.params.gateway_id;

        this._mqttGatewayClient.pingGateway(
            null, orgId, gatewayId,
            this.sendEmptyResult(req, res)
        );
    }

    private requestStatistics(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let gatewayId = req.route.params.gateway_id;

        this._mqttGatewayClient.requestStatistics(
            null, orgId, gatewayId,
            this.sendEmptyResult(req, res)
        );
    }
    
}