"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class OperationalEventsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('operational-events', new pip_services3_commons_node_1.Descriptor('iqs-services-opevents', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._eventsClient = this._dependencyResolver.getOneRequired('operational-events');
    }
    getEventsOperation() {
        return (req, res) => {
            this.getEvents(req, res);
        };
    }
    logEventOperation() {
        return (req, res) => {
            this.logEvent(req, res);
        };
    }
    deleteEventOperation() {
        return (req, res) => {
            this.deleteEvent(req, res);
        };
    }
    getEvents(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._eventsClient.getEvents(null, orgId, filter, paging, this.sendResult(req, res));
    }
    logEvent(req, res) {
        let orgId = req.route.params.org_id;
        let event = req.body || {};
        let user = req.user || {};
        event.create_time = new Date();
        event.creator_id = user.id || req.user_id;
        this._eventsClient.logEvent(null, orgId, event, this.sendResult(req, res));
    }
    deleteEvent(req, res) {
        let orgId = req.route.params.org_id;
        let eventId = req.route.params.event_id;
        this._eventsClient.deleteEventById(null, orgId, eventId, this.sendResult(req, res));
    }
}
exports.OperationalEventsOperationsV1 = OperationalEventsOperationsV1;
//# sourceMappingURL=OperationalEventsOperationsV1.js.map