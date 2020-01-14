let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { ISignalsClientV1 } from 'iqs-clients-signals-node';
import { SignalV1 } from 'iqs-clients-signals-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class SignalsOperationsV1  extends FacadeOperations {
    private _signalsClient: ISignalsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('signals', new Descriptor('iqs-services-signals', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._signalsClient = this._dependencyResolver.getOneRequired<ISignalsClientV1>('signals');
    }

    public getSignalsOperation() {
        return (req, res) => {
            this.getSignals(req, res);
        }
    }

    public sendSignalOperation() {
        return (req, res) => {
            this.sendSignal(req, res);
        }
    }

    public lockSignalOperation() {
        return (req, res) => {
            this.lockSignal(req, res);
        }
    }

    public markSignalSentOperation() {
        return (req, res) => {
            this.markSignalSent(req, res);
        }
    }
    
    public deleteSignalOperation() {
        return (req, res) => {
            this.deleteSignal(req, res);
        }
    }

    private getSignals(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._signalsClient.getSignals(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private sendSignal(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let signal = req.body || {};

        this._signalsClient.sendSignal(
            null, signal, this.sendResult(req, res)
        );
    }

    private lockSignal(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let signalId = req.route.params.signal_id;

        this._signalsClient.lockSignal(
            null, signalId, this.sendResult(req, res)
        );
    }

    private markSignalSent(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let signalId = req.route.params.signal_id;

        this._signalsClient.markSignalSent(
            null, signalId, this.sendResult(req, res)
        );
    }

    private deleteSignal(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let signalId = req.route.params.signal_id;

        this._signalsClient.deleteSignalById(
            null, signalId, this.sendResult(req, res)
        );
    }

}