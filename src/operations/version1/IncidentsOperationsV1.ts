let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IIncidentsClientV1 } from 'iqs-clients-incidents-node';
import { IncidentV1 } from 'iqs-clients-incidents-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class IncidentsOperationsV1  extends FacadeOperations {
    private _incidentsClient: IIncidentsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('incidents', new Descriptor('iqs-services-incidents', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._incidentsClient = this._dependencyResolver.getOneRequired<IIncidentsClientV1>('incidents');
    }

    public getIncidentsOperation() {
        return (req, res) => {
            this.getIncidents(req, res);
        }
    }

    public getIncidentsCountOperation() {
        return (req, res) => {
            this.getIncidentsCount(req, res);
        }
    }

    public getIncidentOperation() {
        return (req, res) => {
            this.getIncident(req, res);
        }
    }

    public createIncidentOperation() {
        return (req, res) => {
            this.createIncident(req, res);
        }
    }

    public closeIncidentOperation() {
        return (req, res) => {
            this.closeIncident(req, res);
        }
    }

    public deleteIncidentOperation() {
        return (req, res) => {
            this.deleteIncident(req, res);
        }
    }

    private getIncidents(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._incidentsClient.getIncidents(
            null, orgId, filter, paging, this.sendResult(req, res)
        );
    }

    private getIncidentsCount(req: any, res: any): void {
        let filter = this.getFilterParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._incidentsClient.getIncidentsCount(
            null, orgId, filter, this.sendResult(req, res)
        );
    }

    private getIncident(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let incidentId = req.route.params.incident_id;

        this._incidentsClient.getIncidentById(
            null, orgId, incidentId, this.sendResult(req, res)
        );
    }

    private createIncident(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let incident = req.body || {};

        this._incidentsClient.createIncident(
            null, orgId, incident, this.sendResult(req, res)
        );
    }

    private closeIncident(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let incidentId = req.route.params.incident_id;
        let resolution = req.param('resolution');
        let resolutionId = req.param('resolution_id');
        let user = req.user || {};

        this._incidentsClient.closeIncident(
            null, orgId, incidentId, user, resolutionId, resolution, this.sendResult(req, res)
        );
    }

    private deleteIncident(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let incidentId = req.route.params.incident_id;

        this._incidentsClient.deleteIncidentById(
            null, orgId, incidentId, this.sendResult(req, res)
        );
    }

}