let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IOperationalEventsClientV1 } from 'iqs-clients-opevents-node';
import { OperationalEventV1 } from 'iqs-clients-opevents-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class OperationalEventsOperationsV1  extends FacadeOperations {
    private _eventsClient: IOperationalEventsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('operational-events', new Descriptor('iqs-services-opevents', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._eventsClient = this._dependencyResolver.getOneRequired<IOperationalEventsClientV1>('operational-events');
    }

    public getEventsOperation() {
        return (req, res) => {
            this.getEvents(req, res);
        }
    }

    public logEventOperation() {
        return (req, res) => {
            this.logEvent(req, res);
        }
    }

    public deleteEventOperation() {
        return (req, res) => {
            this.deleteEvent(req, res);
        }
    }

    private getEvents(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._eventsClient.getEvents(
            null, orgId, filter, paging, this.sendResult(req, res)
        );
    }

    private logEvent(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let event = req.body || {};
        let user = req.user || {};

        event.create_time = new Date();
        event.creator_id = user.id || req.user_id;

        this._eventsClient.logEvent(
            null, orgId, event, this.sendResult(req, res)
        );
    }

    private deleteEvent(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let eventId = req.route.params.event_id;

        this._eventsClient.deleteEventById(
            null, orgId, eventId, this.sendResult(req, res)
        );
    }

}