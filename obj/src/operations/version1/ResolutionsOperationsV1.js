"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class ResolutionsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('resolutions', new pip_services3_commons_node_1.Descriptor('iqs-services-resolutions', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._resolutionsClient = this._dependencyResolver.getOneRequired('resolutions');
    }
    getResolutionsOperation() {
        return (req, res) => {
            this.getResolutions(req, res);
        };
    }
    getResolutionOperation() {
        return (req, res) => {
            this.getResolution(req, res);
        };
    }
    createResolutionOperation() {
        return (req, res) => {
            this.createResolution(req, res);
        };
    }
    updateResolutionOperation() {
        return (req, res) => {
            this.updateResolution(req, res);
        };
    }
    deleteResolutionOperation() {
        return (req, res) => {
            this.deleteResolution(req, res);
        };
    }
    getResolutions(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._resolutionsClient.getResolutions(null, filter, paging, this.sendResult(req, res));
    }
    getResolution(req, res) {
        let orgId = req.route.params.org_id;
        let resolutionId = req.route.params.resolution_id;
        this._resolutionsClient.getResolutionById(null, resolutionId, this.sendResult(req, res));
    }
    createResolution(req, res) {
        let orgId = req.route.params.org_id;
        let resolution = req.body || {};
        this._resolutionsClient.createResolution(null, resolution, this.sendResult(req, res));
    }
    updateResolution(req, res) {
        let orgId = req.route.params.org_id;
        let resolutionId = req.route.params.resolution_id;
        let resolution = req.body || {};
        resolution.id = resolutionId;
        this._resolutionsClient.updateResolution(null, resolution, this.sendResult(req, res));
    }
    deleteResolution(req, res) {
        let orgId = req.route.params.org_id;
        let resolutionId = req.route.params.resolution_id;
        this._resolutionsClient.deleteResolutionById(null, resolutionId, this.sendResult(req, res));
    }
}
exports.ResolutionsOperationsV1 = ResolutionsOperationsV1;
//# sourceMappingURL=ResolutionsOperationsV1.js.map