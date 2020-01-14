"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class ControlObjectsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('control-objects', new pip_services3_commons_node_1.Descriptor('iqs-services-controlobjects', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._objectsClient = this._dependencyResolver.getOneRequired('control-objects');
    }
    getObjectsOperation() {
        return (req, res) => {
            this.getObjects(req, res);
        };
    }
    getObjectOperation() {
        return (req, res) => {
            this.getObject(req, res);
        };
    }
    createObjectOperation() {
        return (req, res) => {
            this.createObject(req, res);
        };
    }
    updateObjectOperation() {
        return (req, res) => {
            this.updateObject(req, res);
        };
    }
    deleteObjectOperation() {
        return (req, res) => {
            this.deleteObject(req, res);
        };
    }
    getObjects(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._objectsClient.getObjects(null, filter, paging, this.sendResult(req, res));
    }
    getObject(req, res) {
        let orgId = req.route.params.org_id;
        let objectId = req.route.params.object_id;
        this._objectsClient.getObjectById(null, objectId, this.sendResult(req, res));
    }
    createObject(req, res) {
        let orgId = req.route.params.org_id;
        let obj = req.body || {};
        this._objectsClient.createObject(null, obj, this.sendResult(req, res));
    }
    updateObject(req, res) {
        let orgId = req.route.params.org_id;
        let objectId = req.route.params.object_id;
        let obj = req.body || {};
        obj.id = objectId;
        this._objectsClient.updateObject(null, obj, this.sendResult(req, res));
    }
    deleteObject(req, res) {
        let orgId = req.route.params.org_id;
        let objectId = req.route.params.object_id;
        this._objectsClient.deleteObjectById(null, objectId, this.sendResult(req, res));
    }
}
exports.ControlObjectsOperationsV1 = ControlObjectsOperationsV1;
//# sourceMappingURL=ControlObjectsOperationsV1.js.map