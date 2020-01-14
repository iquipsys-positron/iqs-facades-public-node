"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class IncidentsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('incidents', new pip_services3_commons_node_1.Descriptor('iqs-services-incidents', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._incidentsClient = this._dependencyResolver.getOneRequired('incidents');
    }
    getIncidentsOperation() {
        return (req, res) => {
            this.getIncidents(req, res);
        };
    }
    getIncidentsCountOperation() {
        return (req, res) => {
            this.getIncidentsCount(req, res);
        };
    }
    getIncidentOperation() {
        return (req, res) => {
            this.getIncident(req, res);
        };
    }
    createIncidentOperation() {
        return (req, res) => {
            this.createIncident(req, res);
        };
    }
    closeIncidentOperation() {
        return (req, res) => {
            this.closeIncident(req, res);
        };
    }
    deleteIncidentOperation() {
        return (req, res) => {
            this.deleteIncident(req, res);
        };
    }
    getIncidents(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._incidentsClient.getIncidents(null, orgId, filter, paging, this.sendResult(req, res));
    }
    getIncidentsCount(req, res) {
        let filter = this.getFilterParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._incidentsClient.getIncidentsCount(null, orgId, filter, this.sendResult(req, res));
    }
    getIncident(req, res) {
        let orgId = req.route.params.org_id;
        let incidentId = req.route.params.incident_id;
        this._incidentsClient.getIncidentById(null, orgId, incidentId, this.sendResult(req, res));
    }
    createIncident(req, res) {
        let orgId = req.route.params.org_id;
        let incident = req.body || {};
        this._incidentsClient.createIncident(null, orgId, incident, this.sendResult(req, res));
    }
    closeIncident(req, res) {
        let orgId = req.route.params.org_id;
        let incidentId = req.route.params.incident_id;
        let resolution = req.param('resolution');
        let resolutionId = req.param('resolution_id');
        let user = req.user || {};
        this._incidentsClient.closeIncident(null, orgId, incidentId, user, resolutionId, resolution, this.sendResult(req, res));
    }
    deleteIncident(req, res) {
        let orgId = req.route.params.org_id;
        let incidentId = req.route.params.incident_id;
        this._incidentsClient.deleteIncidentById(null, orgId, incidentId, this.sendResult(req, res));
    }
}
exports.IncidentsOperationsV1 = IncidentsOperationsV1;
//# sourceMappingURL=IncidentsOperationsV1.js.map