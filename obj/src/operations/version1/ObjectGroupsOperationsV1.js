"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class ObjectGroupsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('object-groups', new pip_services3_commons_node_1.Descriptor('iqs-services-objectgroups', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._groupsClient = this._dependencyResolver.getOneRequired('object-groups');
    }
    getGroupsOperation() {
        return (req, res) => {
            this.getGroups(req, res);
        };
    }
    getGroupOperation() {
        return (req, res) => {
            this.getGroup(req, res);
        };
    }
    createGroupOperation() {
        return (req, res) => {
            this.createGroup(req, res);
        };
    }
    updateGroupOperation() {
        return (req, res) => {
            this.updateGroup(req, res);
        };
    }
    deleteGroupOperation() {
        return (req, res) => {
            this.deleteGroup(req, res);
        };
    }
    getGroups(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._groupsClient.getGroups(null, filter, paging, this.sendResult(req, res));
    }
    getGroup(req, res) {
        let orgId = req.route.params.org_id;
        let groupId = req.route.params.group_id;
        this._groupsClient.getGroupById(null, groupId, this.sendResult(req, res));
    }
    createGroup(req, res) {
        let orgId = req.route.params.org_id;
        let group = req.body || {};
        this._groupsClient.createGroup(null, group, this.sendResult(req, res));
    }
    updateGroup(req, res) {
        let orgId = req.route.params.org_id;
        let groupId = req.route.params.group_id;
        let group = req.body || {};
        group.id = groupId;
        this._groupsClient.updateGroup(null, group, this.sendResult(req, res));
    }
    deleteGroup(req, res) {
        let orgId = req.route.params.org_id;
        let groupId = req.route.params.group_id;
        this._groupsClient.deleteGroupById(null, groupId, this.sendResult(req, res));
    }
}
exports.ObjectGroupsOperationsV1 = ObjectGroupsOperationsV1;
//# sourceMappingURL=ObjectGroupsOperationsV1.js.map