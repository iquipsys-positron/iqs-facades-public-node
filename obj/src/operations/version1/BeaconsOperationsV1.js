"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class BeaconsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('beacons', new pip_services3_commons_node_1.Descriptor('pip-services-beacons', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._beaconsClient = this._dependencyResolver.getOneRequired('beacons');
    }
    getBeaconsOperation() {
        return (req, res) => {
            this.getBeacons(req, res);
        };
    }
    getBeaconOperation() {
        return (req, res) => {
            this.getBeacon(req, res);
        };
    }
    calculatePositionOperation() {
        return (req, res) => {
            this.calculatePosition(req, res);
        };
    }
    createBeaconOperation() {
        return (req, res) => {
            this.createBeacon(req, res);
        };
    }
    updateBeaconOperation() {
        return (req, res) => {
            this.updateBeacon(req, res);
        };
    }
    deleteBeaconOperation() {
        return (req, res) => {
            this.deleteBeacon(req, res);
        };
    }
    validateBeaconUdiOperation() {
        return (req, res) => {
            this.validateBeaconUdi(req, res);
        };
    }
    getBeacons(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._beaconsClient.getBeacons(null, filter, paging, this.sendResult(req, res));
    }
    getBeacon(req, res) {
        let orgId = req.route.params.org_id;
        let beaconId = req.route.params.beacon_id;
        this._beaconsClient.getBeaconById(null, beaconId, this.sendResult(req, res));
    }
    calculatePosition(req, res) {
        let orgId = req.route.params.org_id;
        let udis = req.param('udis');
        if (_.isString(udis))
            udis = udis.split(',');
        this._beaconsClient.calculatePosition(null, orgId, udis, this.sendResult(req, res));
    }
    createBeacon(req, res) {
        let orgId = req.route.params.org_id;
        let beacon = req.body || {};
        this._beaconsClient.createBeacon(null, beacon, this.sendResult(req, res));
    }
    updateBeacon(req, res) {
        let beaconId = req.route.params.beacon_id;
        let orgId = req.route.params.org_id;
        let beacon = req.body || {};
        beacon.id = beaconId;
        this._beaconsClient.updateBeacon(null, beacon, this.sendResult(req, res));
    }
    deleteBeacon(req, res) {
        let beaconId = req.route.params.beacon_id;
        let orgId = req.route.params.org_id;
        this._beaconsClient.deleteBeaconById(null, beaconId, this.sendResult(req, res));
    }
    validateBeaconUdi(req, res) {
        let orgId = req.route.params.org_id;
        let udi = req.param('udi');
        this._beaconsClient.getBeaconByUdi(null, udi, (err, beacon) => {
            if (beacon)
                res.json(beacon.id);
            else
                res.json('');
        });
    }
}
exports.BeaconsOperationsV1 = BeaconsOperationsV1;
//# sourceMappingURL=BeaconsOperationsV1.js.map