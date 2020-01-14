"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class ServiceAgreementsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('agreements', new pip_services3_commons_node_1.Descriptor('iqs-services-agreements', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._agreementsClient = this._dependencyResolver.getOneRequired('agreements');
    }
    getAgreementsOperation() {
        return (req, res) => {
            this.getAgreements(req, res);
        };
    }
    verifyAgreementOperation() {
        return (req, res) => {
            this.verifyAgreement(req, res);
        };
    }
    getAgreementOperation() {
        return (req, res) => {
            this.getAgreement(req, res);
        };
    }
    createAgreementOperation() {
        return (req, res) => {
            this.createAgreement(req, res);
        };
    }
    updateAgreementOperation() {
        return (req, res) => {
            this.updateAgreement(req, res);
        };
    }
    deleteAgreementOperation() {
        return (req, res) => {
            this.deleteAgreement(req, res);
        };
    }
    getAgreements(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._agreementsClient.getAgreements(null, filter, paging, this.sendResult(req, res));
    }
    verifyAgreement(req, res) {
        let number = req.param('number');
        let filter = pip_services3_commons_node_2.FilterParams.fromTuples('number', number);
        this._agreementsClient.getAgreements(null, filter, null, (err, page) => {
            if (err)
                this.sendError(req, res, err);
            else
                res.json(page && page.data && page.data.length > 0);
        });
    }
    getAgreement(req, res) {
        let agreementId = req.route.params.agreement_id;
        this._agreementsClient.getAgreementById(null, agreementId, this.sendResult(req, res));
    }
    createAgreement(req, res) {
        let agreement = req.body || {};
        this._agreementsClient.createAgreement(null, agreement, this.sendResult(req, res));
    }
    updateAgreement(req, res) {
        let agreementId = req.route.params.agreement_id;
        let agreement = req.body || {};
        agreement.id = agreementId;
        this._agreementsClient.updateAgreement(null, agreement, this.sendResult(req, res));
    }
    deleteAgreement(req, res) {
        let agreementId = req.route.params.agreement_id;
        this._agreementsClient.deleteAgreementById(null, agreementId, this.sendResult(req, res));
    }
}
exports.ServiceAgreementsOperationsV1 = ServiceAgreementsOperationsV1;
//# sourceMappingURL=ServiceAgreementsOperationsV1.js.map