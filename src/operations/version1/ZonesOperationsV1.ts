let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IZonesClientV1 } from 'iqs-clients-zones-node';
import { ZoneV1 } from 'iqs-clients-zones-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class ZonesOperationsV1  extends FacadeOperations {
    private _zonesClient: IZonesClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('zones', new Descriptor('iqs-services-zones', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._zonesClient = this._dependencyResolver.getOneRequired<IZonesClientV1>('zones');
    }

    public getZonesOperation() {
        return (req, res) => {
            this.getZones(req, res);
        }
    }

    public getZoneOperation() {
        return (req, res) => {
            this.getZone(req, res);
        }
    }

    public createZoneOperation() {
        return (req, res) => {
            this.createZone(req, res);
        }
    }

    public updateZoneOperation() {
        return (req, res) => {
            this.updateZone(req, res);
        }
    }

    public deleteZoneOperation() {
        return (req, res) => {
            this.deleteZone(req, res);
        }
    }

    private getZones(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._zonesClient.getZones(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getZone(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let zoneId = req.route.params.zone_id;

        this._zonesClient.getZoneById(
            null, zoneId, this.sendResult(req, res)
        );
    }

    private createZone(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let zone = req.body || {};

        this._zonesClient.createZone(
            null, zone, this.sendResult(req, res)
        );
    }

    private updateZone(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let zoneId = req.route.params.zone_id;
        let zone = req.body || {};
        zone.id = zoneId;

        this._zonesClient.updateZone(
            null, zone, this.sendResult(req, res)
        );
    }

    private deleteZone(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let zoneId = req.route.params.zone_id;

        this._zonesClient.deleteZoneById(
            null, zoneId, this.sendResult(req, res)
        );
    }

}