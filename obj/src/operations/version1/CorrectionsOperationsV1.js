"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class CorrectionsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('corrections', new pip_services3_commons_node_1.Descriptor('iqs-services-corrections', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._correctionsClient = this._dependencyResolver.getOneRequired('corrections');
    }
    getCorrectionsOperation() {
        return (req, res) => {
            this.getCorrections(req, res);
        };
    }
    getCorrectionOperation() {
        return (req, res) => {
            this.getCorrection(req, res);
        };
    }
    createCorrectionOperation() {
        return (req, res) => {
            this.createCorrection(req, res);
        };
    }
    updateCorrectionOperation() {
        return (req, res) => {
            this.updateCorrection(req, res);
        };
    }
    deleteCorrectionOperation() {
        return (req, res) => {
            this.deleteCorrection(req, res);
        };
    }
    getCorrections(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._correctionsClient.getCorrections(null, orgId, filter, paging, this.sendResult(req, res));
    }
    getCorrection(req, res) {
        let orgId = req.route.params.org_id;
        let correctionId = req.route.params.correction_id;
        this._correctionsClient.getCorrectionById(null, orgId, correctionId, this.sendResult(req, res));
    }
    createCorrection(req, res) {
        let orgId = req.route.params.org_id;
        let correction = req.body || {};
        this._correctionsClient.createCorrection(null, orgId, correction, this.sendResult(req, res));
    }
    updateCorrection(req, res) {
        let orgId = req.route.params.org_id;
        let correctionId = req.route.params.correction_id;
        let correction = req.body || {};
        correction.id = correctionId;
        this._correctionsClient.updateCorrection(null, orgId, correction, this.sendResult(req, res));
    }
    deleteCorrection(req, res) {
        let orgId = req.route.params.org_id;
        let correctionId = req.route.params.correction_id;
        this._correctionsClient.deleteCorrectionById(null, orgId, correctionId, this.sendResult(req, res));
    }
}
exports.CorrectionsOperationsV1 = CorrectionsOperationsV1;
//# sourceMappingURL=CorrectionsOperationsV1.js.map