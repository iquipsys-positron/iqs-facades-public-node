let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';
import { FloatConverter } from 'pip-services3-commons-node';

import { IObjectStatesClientV1 } from 'iqs-clients-objectstates-node';
import { ObjectStateV1 } from 'iqs-clients-objectstates-node';

import { IPositionsClientV1 } from 'pip-clients-positions-node';
import { ObjectPositionV1 } from 'pip-clients-positions-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class ObjectStatesOperationsV1  extends FacadeOperations {
    private _statesClient: IObjectStatesClientV1;
    private _positionsClient: IPositionsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('object-states', new Descriptor('iqs-services-objectstates', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('object-positions', new Descriptor('pip-services-positions', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._statesClient = this._dependencyResolver.getOneRequired<IObjectStatesClientV1>('object-states');
        this._positionsClient = this._dependencyResolver.getOneRequired<IPositionsClientV1>('object-positions');
    }

    public getStatesOperation() {
        return (req, res) => {
            this.getStates(req, res);
        }
    }

    public getTimelineStatesOperation() {
        return (req, res) => {
            this.getTimelineStates(req, res);
        }
    }

    public addStateOperation() {
        return (req, res) => {
            this.addState(req, res);
        }
    }

    public addStatesOperation() {
        return (req, res) => {
            this.addStates(req, res);
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

    private getTimelineStates(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let time = req.param('time') || new Date();

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        let states: ObjectStateV1[];
        let positions: ObjectPositionV1[];

        async.parallel([
            // Retrieve states
            (callback) => {
                this._statesClient.getTimelineStates(
                    null, orgId, time, filter, (err, data) => {
                        states = data;
                        callback(err);
                    }
                );
            },
            // Retrieve positions
            (callback) => {
                this._positionsClient.getTimelinePositions(
                    null, orgId, time, filter, (err, data) => {
                        positions = data;
                        callback(err);
                    }
                );
            }
        ], (err) => {
            if (err) {
                this.sendError(req, res, err);
                return;
            }

            // Adjust state positions
            for (let state of states) {
                let position = _.find(positions, p => p.org_id == state.org_id && p.object_id == state.object_id);
                if (position != null) {
                    let stateTime = DateTimeConverter.toDateTime(state.time);
                    let posTime = DateTimeConverter.toDateTime(position.time);
                    if (stateTime.getTime() < posTime.getTime()) {
                        state.time = position.time;
                        state.pos = { type: 'Point', coordinates: [position.lng, position.lat] };
                        state.alt = position.alt || state.alt;
                        state.speed = position.speed || state.speed;
                        state.angle = position.angle;
                    }
                }
            }

            res.json(states);
        });
    }

    private addState(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let state = req.body || {};
        
        this._statesClient.addState(
            null, orgId, state, this.sendEmptyResult(req, res)
        );
    }

    private addStates(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let states = req.body || [];

        this._statesClient.addStates(
            null, orgId, states, this.sendEmptyResult(req, res)
        );
    }
    
    private deleteStates(req: any, res: any): void {
        let filter = this.getFilterParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._statesClient.deleteStates(
            null, orgId, filter, this.sendEmptyResult(req, res)
        );
    }

}