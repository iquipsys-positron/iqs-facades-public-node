"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class RostersOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('rosters', new pip_services3_commons_node_1.Descriptor('iqs-services-rosters', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._rostersClient = this._dependencyResolver.getOneRequired('rosters');
    }
    getRostersOperation() {
        return (req, res) => {
            this.getRosters(req, res);
        };
    }
    getRosterOperation() {
        return (req, res) => {
            this.getRoster(req, res);
        };
    }
    createRosterOperation() {
        return (req, res) => {
            this.createRoster(req, res);
        };
    }
    updateRosterOperation() {
        return (req, res) => {
            this.updateRoster(req, res);
        };
    }
    deleteRosterOperation() {
        return (req, res) => {
            this.deleteRoster(req, res);
        };
    }
    getRosters(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._rostersClient.getRosters(null, orgId, filter, paging, this.sendResult(req, res));
    }
    getRoster(req, res) {
        let orgId = req.route.params.org_id;
        let rosterId = req.route.params.roster_id;
        this._rostersClient.getRosterById(null, orgId, rosterId, this.sendResult(req, res));
    }
    createRoster(req, res) {
        let orgId = req.route.params.org_id;
        let roster = req.body || {};
        this._rostersClient.createRoster(null, orgId, roster, this.sendResult(req, res));
    }
    updateRoster(req, res) {
        let orgId = req.route.params.org_id;
        let rosterId = req.route.params.roster_id;
        let roster = req.body || {};
        roster.id = rosterId;
        this._rostersClient.updateRoster(null, orgId, roster, this.sendResult(req, res));
    }
    deleteRoster(req, res) {
        let orgId = req.route.params.org_id;
        let rosterId = req.route.params.roster_id;
        this._rostersClient.deleteRosterById(null, orgId, rosterId, this.sendResult(req, res));
    }
}
exports.RostersOperationsV1 = RostersOperationsV1;
//# sourceMappingURL=RostersOperationsV1.js.map