let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IRestGatewayClientV1 } from 'iqs-clients-restgateway-node';
import { StatusMessageV1 } from 'iqs-clients-restgateway-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class RestGatewayOperationsV1  extends FacadeOperations {
    private _restGatewayClient: IRestGatewayClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('rest-gateway', new Descriptor('iqs-services-restgateway', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._restGatewayClient = this._dependencyResolver.getOneRequired<IRestGatewayClientV1>('rest-gateway');
    }

    public updateStatusOperation() {
        return (req, res) => {
            this.updateStatus(req, res);
        }
    }

    private updateStatus(req: any, res: any): void {
        let message: any = req.body || {};

        this._restGatewayClient.updateStatus(
            null, message, this.sendEmptyResult(req, res)
        );
    }

}