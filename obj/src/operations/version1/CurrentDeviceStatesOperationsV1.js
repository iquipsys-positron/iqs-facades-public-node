"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
const FilterParams_1 = require("pip-services3-commons-node/obj/src/data/FilterParams");
const DateTimeConverter_1 = require("pip-services3-commons-node/obj/src/convert/DateTimeConverter");
class CurrentDeviceStatesOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('curr-device-states', new pip_services3_commons_node_1.Descriptor('iqs-services-currdevicestates', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('curr-object-states', new pip_services3_commons_node_1.Descriptor('iqs-services-currobjectstates', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._deviceStatesClient = this._dependencyResolver.getOneRequired('curr-device-states');
        this._objectStatesClient = this._dependencyResolver.getOneRequired('curr-object-states');
    }
    getStatesOperation() {
        return (req, res) => {
            this.getStates(req, res);
        };
    }
    getStateOperation() {
        return (req, res) => {
            this.getState(req, res);
        };
    }
    setStateOperation() {
        return (req, res) => {
            this.setState(req, res);
        };
    }
    deleteStateOperation() {
        return (req, res) => {
            this.deleteState(req, res);
        };
    }
    deleteStatesOperation() {
        return (req, res) => {
            this.deleteStates(req, res);
        };
    }
    getStates(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._deviceStatesClient.getStates(null, orgId, filter, paging, this.sendResult(req, res));
    }
    getState(req, res) {
        let orgId = req.route.params.org_id;
        let stateId = req.route.params.state_id;
        let states = [];
        async.parallel([
            // Retrieve device state
            (callback) => {
                this._deviceStatesClient.getStateById(null, orgId, stateId, (err, data) => {
                    if (data)
                        states.push(data);
                    callback(err);
                });
            },
            // Retrieve object states for this device
            (callback) => {
                let filter = FilterParams_1.FilterParams.fromTuples('org_id', orgId, 'device_id', stateId);
                this._objectStatesClient.getStates(null, orgId, filter, null, (err, page) => {
                    let data = page != null ? page.data : [];
                    // Convert object states to device states
                    data = _.map(page.data, state => ({
                        id: stateId,
                        time: state.time,
                        org_id: state.org_id,
                        object_id: state.object_id,
                        pos: state.pos,
                        alt: state.alt,
                        angle: state.angle,
                        speed: state.speed
                    }));
                    states = states.concat(data || []);
                    callback(err);
                });
            }
        ], (err) => {
            // Find the latest state
            let state = _.max(states, state => {
                let time = DateTimeConverter_1.DateTimeConverter.toDateTime(state.time);
                return time.getTime();
            });
            this.sendResult(req, res)(err, state);
        });
    }
    setState(req, res) {
        let orgId = req.route.params.org_id;
        let stateId = req.route.params.state_id;
        let state = req.body || {};
        state.id = stateId;
        this._deviceStatesClient.setState(null, orgId, state, this.sendResult(req, res));
    }
    deleteState(req, res) {
        let orgId = req.route.params.org_id;
        let stateId = req.route.params.state_id;
        this._deviceStatesClient.deleteStateById(null, orgId, stateId, this.sendResult(req, res));
    }
    deleteStates(req, res) {
        let filter = this.getFilterParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._deviceStatesClient.deleteStatesByFilter(null, orgId, filter, this.sendEmptyResult(req, res));
    }
}
exports.CurrentDeviceStatesOperationsV1 = CurrentDeviceStatesOperationsV1;
//# sourceMappingURL=CurrentDeviceStatesOperationsV1.js.map