let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IRostersClientV1 } from 'iqs-clients-rosters-node';
import { RosterV1 } from 'iqs-clients-rosters-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class RostersOperationsV1  extends FacadeOperations {
    private _rostersClient: IRostersClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('rosters', new Descriptor('iqs-services-rosters', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._rostersClient = this._dependencyResolver.getOneRequired<IRostersClientV1>('rosters');
    }

    public getRostersOperation() {
        return (req, res) => {
            this.getRosters(req, res);
        }
    }

    public getRosterOperation() {
        return (req, res) => {
            this.getRoster(req, res);
        }
    }

    public createRosterOperation() {
        return (req, res) => {
            this.createRoster(req, res);
        }
    }

    public updateRosterOperation() {
        return (req, res) => {
            this.updateRoster(req, res);
        }
    }

    public deleteRosterOperation() {
        return (req, res) => {
            this.deleteRoster(req, res);
        }
    }

    private getRosters(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._rostersClient.getRosters(
            null, orgId, filter, paging, this.sendResult(req, res)
        );
    }

    private getRoster(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let rosterId = req.route.params.roster_id;

        this._rostersClient.getRosterById(
            null, orgId, rosterId, this.sendResult(req, res)
        );
    }

    private createRoster(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let roster = req.body || {};

        this._rostersClient.createRoster(
            null, orgId, roster, this.sendResult(req, res)
        );
    }

    private updateRoster(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let rosterId = req.route.params.roster_id;
        let roster = req.body || {};
        roster.id = rosterId;

        this._rostersClient.updateRoster(
            null, orgId, roster, this.sendResult(req, res)
        );
    }

    private deleteRoster(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let rosterId = req.route.params.roster_id;

        this._rostersClient.deleteRosterById(
            null, orgId, rosterId, this.sendResult(req, res)
        );
    }

}