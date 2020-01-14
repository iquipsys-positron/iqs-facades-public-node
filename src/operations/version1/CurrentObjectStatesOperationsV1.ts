let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { ICurrentObjectStatesClientV1 } from 'iqs-clients-currobjectstates-node';
import { CurrentObjectStateV1 } from 'iqs-clients-currobjectstates-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class CurrentObjectStatesOperationsV1  extends FacadeOperations {
    private _statesClient: ICurrentObjectStatesClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('curr-object-states', new Descriptor('iqs-services-currobjectstates', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._statesClient = this._dependencyResolver.getOneRequired<ICurrentObjectStatesClientV1>('curr-object-states');
    }

    public getStatesOperation() {
        return (req, res) => {
            this.getStates(req, res);
        }
    }

    public getStateOperation() {
        return (req, res) => {
            this.getState(req, res);
        }
    }

    public setStateOperation() {
        return (req, res) => {
            this.setState(req, res);
        }
    }

    public deleteStateOperation() {
        return (req, res) => {
            this.deleteState(req, res);
        }
    }

    public deleteStatesOperation() {
        return (req, res) => {
            this.deleteStates(req, res);
        }
    }

    private getStates(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._statesClient.getStates(
            null, orgId, filter, paging, this.sendResult(req, res)
        );
    }

    private getState(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let stateId = req.route.params.state_id;

        this._statesClient.getStateById(
            null, orgId, stateId, this.sendResult(req, res)
        );
    }

    private setState(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let stateId = req.route.params.state_id;
        let state = req.body || {};
        state.id = stateId;

        this._statesClient.setState(
            null, orgId, state, this.sendResult(req, res)
        );
    }

    private deleteState(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let stateId = req.route.params.state_id;

        this._statesClient.deleteStateById(
            null, orgId, stateId, this.sendResult(req, res)
        );
    }

    private deleteStates(req: any, res: any): void {
        let filter = this.getFilterParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._statesClient.deleteStatesByFilter(
            null, orgId, filter, this.sendEmptyResult(req, res)
        );
    }

}