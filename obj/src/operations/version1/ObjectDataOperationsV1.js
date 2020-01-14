"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class ObjectDataOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('object-data', new pip_services3_commons_node_1.Descriptor('pip-services-transducerdata', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._dataClient = this._dependencyResolver.getOneRequired('object-data');
    }
    getDataOperation() {
        return (req, res) => {
            this.getData(req, res);
        };
    }
    addDataOperation() {
        return (req, res) => {
            this.addData(req, res);
        };
    }
    addDataBatchOperation() {
        return (req, res) => {
            this.addDataBatch(req, res);
        };
    }
    deleteDataOperation() {
        return (req, res) => {
            this.deleteData(req, res);
        };
    }
    getData(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._dataClient.getData(null, orgId, filter, paging, this.sendResult(req, res));
    }
    addData(req, res) {
        let orgId = req.route.params.org_id;
        // Todo: Set org_id?
        let data = req.body;
        this._dataClient.addData(null, orgId, data, this.sendEmptyResult(req, res));
    }
    addDataBatch(req, res) {
        let orgId = req.route.params.org_id;
        // Todo: Set org_id?
        let data = req.body;
        this._dataClient.addDataBatch(null, orgId, data, this.sendEmptyResult(req, res));
    }
    deleteData(req, res) {
        let filter = this.getFilterParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._dataClient.deleteData(null, orgId, filter, this.sendEmptyResult(req, res));
    }
}
exports.ObjectDataOperationsV1 = ObjectDataOperationsV1;
//# sourceMappingURL=ObjectDataOperationsV1.js.map