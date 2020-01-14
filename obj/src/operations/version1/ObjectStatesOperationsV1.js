"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class ObjectStatesOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('object-states', new pip_services3_commons_node_1.Descriptor('iqs-services-objectstates', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('object-positions', new pip_services3_commons_node_1.Descriptor('pip-services-positions', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._statesClient = this._dependencyResolver.getOneRequired('object-states');
        this._positionsClient = this._dependencyResolver.getOneRequired('object-positions');
    }
    getStatesOperation() {
        return (req, res) => {
            this.getStates(req, res);
        };
    }
    getTimelineStatesOperation() {
        return (req, res) => {
            this.getTimelineStates(req, res);
        };
    }
    addStateOperation() {
        return (req, res) => {
            this.addState(req, res);
        };
    }
    addStatesOperation() {
        return (req, res) => {
            this.addStates(req, res);
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
        this._statesClient.getStates(null, orgId, filter, paging, this.sendResult(req, res));
    }
    getTimelineStates(req, res) {
        let filter = this.getFilterParams(req);
        let time = req.param('time') || new Date();
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        let states;
        let positions;
        async.parallel([
            // Retrieve states
            (callback) => {
                this._statesClient.getTimelineStates(null, orgId, time, filter, (err, data) => {
                    states = data;
                    callback(err);
                });
            },
            // Retrieve positions
            (callback) => {
                this._positionsClient.getTimelinePositions(null, orgId, time, filter, (err, data) => {
                    positions = data;
                    callback(err);
                });
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
                    let stateTime = pip_services3_commons_node_2.DateTimeConverter.toDateTime(state.time);
                    let posTime = pip_services3_commons_node_2.DateTimeConverter.toDateTime(position.time);
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
    addState(req, res) {
        let orgId = req.route.params.org_id;
        let state = req.body || {};
        this._statesClient.addState(null, orgId, state, this.sendEmptyResult(req, res));
    }
    addStates(req, res) {
        let orgId = req.route.params.org_id;
        let states = req.body || [];
        this._statesClient.addStates(null, orgId, states, this.sendEmptyResult(req, res));
    }
    deleteStates(req, res) {
        let filter = this.getFilterParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._statesClient.deleteStates(null, orgId, filter, this.sendEmptyResult(req, res));
    }
}
exports.ObjectStatesOperationsV1 = ObjectStatesOperationsV1;
//# sourceMappingURL=ObjectStatesOperationsV1.js.map