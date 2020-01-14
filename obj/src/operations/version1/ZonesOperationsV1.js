"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class ZonesOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('zones', new pip_services3_commons_node_1.Descriptor('iqs-services-zones', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._zonesClient = this._dependencyResolver.getOneRequired('zones');
    }
    getZonesOperation() {
        return (req, res) => {
            this.getZones(req, res);
        };
    }
    getZoneOperation() {
        return (req, res) => {
            this.getZone(req, res);
        };
    }
    createZoneOperation() {
        return (req, res) => {
            this.createZone(req, res);
        };
    }
    updateZoneOperation() {
        return (req, res) => {
            this.updateZone(req, res);
        };
    }
    deleteZoneOperation() {
        return (req, res) => {
            this.deleteZone(req, res);
        };
    }
    getZones(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._zonesClient.getZones(null, filter, paging, this.sendResult(req, res));
    }
    getZone(req, res) {
        let orgId = req.route.params.org_id;
        let zoneId = req.route.params.zone_id;
        this._zonesClient.getZoneById(null, zoneId, this.sendResult(req, res));
    }
    createZone(req, res) {
        let orgId = req.route.params.org_id;
        let zone = req.body || {};
        this._zonesClient.createZone(null, zone, this.sendResult(req, res));
    }
    updateZone(req, res) {
        let orgId = req.route.params.org_id;
        let zoneId = req.route.params.zone_id;
        let zone = req.body || {};
        zone.id = zoneId;
        this._zonesClient.updateZone(null, zone, this.sendResult(req, res));
    }
    deleteZone(req, res) {
        let orgId = req.route.params.org_id;
        let zoneId = req.route.params.zone_id;
        this._zonesClient.deleteZoneById(null, zoneId, this.sendResult(req, res));
    }
}
exports.ZonesOperationsV1 = ZonesOperationsV1;
//# sourceMappingURL=ZonesOperationsV1.js.map