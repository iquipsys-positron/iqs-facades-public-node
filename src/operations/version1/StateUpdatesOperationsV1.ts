let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IStateUpdatesClientV1 } from 'iqs-clients-stateupdates-node';
import { StateUpdateV1 } from 'iqs-clients-stateupdates-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class StateUpdatesOperationsV1  extends FacadeOperations {
    private _stateUpdatesClient: IStateUpdatesClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('state-updates', new Descriptor('iqs-services-stateupdates', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._stateUpdatesClient = this._dependencyResolver.getOneRequired<IStateUpdatesClientV1>('state-updates');
    }

    public beginUpdateStateOperation() {
        return (req, res) => {
            this.beginUpdateState(req, res);
        }
    }

    public updateStateOperation() {
        return (req, res) => {
            this.updateState(req, res);
        }
    }

    private beginUpdateState(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let stateUpdate = req.body || {};

        this._stateUpdatesClient.beginUpdateState(
            null, stateUpdate, this.sendEmptyResult(req, res)
        );
    }

    private updateState(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let stateUpdate = req.body || {};

        this._stateUpdatesClient.updateState(
            null, stateUpdate, this.sendResult(req, res)
        );
    }
    
}