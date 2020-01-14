let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { ICurrentDeviceStatesClientV1 } from 'iqs-clients-currdevicestates-node';
import { CurrentDeviceStateV1 } from 'iqs-clients-currdevicestates-node';
import { ICurrentObjectStatesClientV1 } from 'iqs-clients-currobjectstates-node';
import { CurrentObjectStateV1 } from 'iqs-clients-currobjectstates-node';

import { FacadeOperations } from 'pip-services3-facade-node';
import { FilterParams } from 'pip-services3-commons-node/obj/src/data/FilterParams';
import { DateTimeConverter } from 'pip-services3-commons-node/obj/src/convert/DateTimeConverter';

export class CurrentDeviceStatesOperationsV1  extends FacadeOperations {
    private _deviceStatesClient: ICurrentDeviceStatesClientV1;
    private _objectStatesClient: ICurrentObjectStatesClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('curr-device-states', new Descriptor('iqs-services-currdevicestates', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('curr-object-states', new Descriptor('iqs-services-currobjectstates', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._deviceStatesClient = this._dependencyResolver.getOneRequired<ICurrentDeviceStatesClientV1>('curr-device-states');
        this._objectStatesClient = this._dependencyResolver.getOneRequired<ICurrentObjectStatesClientV1>('curr-object-states');
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
        
        this._deviceStatesClient.getStates(
            null, orgId, filter, paging, this.sendResult(req, res)
        );
    }

    private getState(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let stateId = req.route.params.state_id;
        let states: CurrentDeviceStateV1[] = [];

        async.parallel([
            // Retrieve device state
            (callback) => {
                this._deviceStatesClient.getStateById(
                    null, orgId, stateId, (err, data) => {
                        if (data)
                            states.push(data);
                        callback(err);
                    }
                );
            },
            // Retrieve object states for this device
            (callback) => {
                let filter = FilterParams.fromTuples(
                    'org_id', orgId,
                    'device_id', stateId
                );

                this._objectStatesClient.getStates(
                    null, orgId, filter, null,
                    (err, page) => {
                        let data = page != null ? page.data : [];

                        // Convert object states to device states
                        data = _.map(page.data, state => <CurrentDeviceStateV1>{
                            id: stateId,
                            time: state.time,
                            org_id: state.org_id,
                            object_id: state.object_id,
                            pos: state.pos,
                            alt: state.alt,
                            angle: state.angle,
                            speed: state.speed
                        });

                        states = states.concat(data || []);

                        callback(err);
                    }
                );
            }
        ], (err) => {
            // Find the latest state
            let state = _.max(states, state => {
                let time = DateTimeConverter.toDateTime(state.time);
                return time.getTime();
            });

            this.sendResult(req, res)(err, state);
        });
    }

    private setState(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let stateId = req.route.params.state_id;
        let state = req.body || {};
        state.id = stateId;

        this._deviceStatesClient.setState(
            null, orgId, state, this.sendResult(req, res)
        );
    }

    private deleteState(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let stateId = req.route.params.state_id;

        this._deviceStatesClient.deleteStateById(
            null, orgId, stateId, this.sendResult(req, res)
        );
    }

    private deleteStates(req: any, res: any): void {
        let filter = this.getFilterParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._deviceStatesClient.deleteStatesByFilter(
            null, orgId, filter, this.sendEmptyResult(req, res)
        );
    }

}