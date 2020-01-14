"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class LocationsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('locations', new pip_services3_commons_node_1.Descriptor('iqs-services-locations', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._locationsClient = this._dependencyResolver.getOneRequired('locations');
    }
    getLocationsOperation() {
        return (req, res) => {
            this.getLocations(req, res);
        };
    }
    getLocationOperation() {
        return (req, res) => {
            this.getLocation(req, res);
        };
    }
    createLocationOperation() {
        return (req, res) => {
            this.createLocation(req, res);
        };
    }
    updateLocationOperation() {
        return (req, res) => {
            this.updateLocation(req, res);
        };
    }
    deleteLocationOperation() {
        return (req, res) => {
            this.deleteLocation(req, res);
        };
    }
    getLocations(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._locationsClient.getLocations(null, filter, paging, this.sendResult(req, res));
    }
    getLocation(req, res) {
        let orgId = req.route.params.org_id;
        let locationId = req.route.params.location_id;
        this._locationsClient.getLocationById(null, locationId, this.sendResult(req, res));
    }
    createLocation(req, res) {
        let orgId = req.route.params.org_id;
        let location = req.body || {};
        this._locationsClient.createLocation(null, location, this.sendResult(req, res));
    }
    updateLocation(req, res) {
        let orgId = req.route.params.org_id;
        let locationId = req.route.params.location_id;
        let location = req.body || {};
        location.id = locationId;
        this._locationsClient.updateLocation(null, location, this.sendResult(req, res));
    }
    deleteLocation(req, res) {
        let orgId = req.route.params.org_id;
        let locationId = req.route.params.location_id;
        this._locationsClient.deleteLocationById(null, locationId, this.sendResult(req, res));
    }
}
exports.LocationsOperationsV1 = LocationsOperationsV1;
//# sourceMappingURL=LocationsOperationsV1.js.map