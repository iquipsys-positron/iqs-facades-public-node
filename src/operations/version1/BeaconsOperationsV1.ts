let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IBeaconsClientV1 } from 'pip-clients-beacons-node';
import { BeaconV1 } from 'pip-clients-beacons-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class BeaconsOperationsV1  extends FacadeOperations {
    private _beaconsClient: IBeaconsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('beacons', new Descriptor('pip-services-beacons', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._beaconsClient = this._dependencyResolver.getOneRequired<IBeaconsClientV1>('beacons');
    }

    public getBeaconsOperation() {
        return (req, res) => {
            this.getBeacons(req, res);
        }
    }

    public getBeaconOperation() {
        return (req, res) => {
            this.getBeacon(req, res);
        }
    }

    public calculatePositionOperation() {
        return (req, res) => {
            this.calculatePosition(req, res);
        }
    }

    public createBeaconOperation() {
        return (req, res) => {
            this.createBeacon(req, res);
        }
    }

    public updateBeaconOperation() {
        return (req, res) => {
            this.updateBeacon(req, res);
        }
    }

    public deleteBeaconOperation() {
        return (req, res) => {
            this.deleteBeacon(req, res);
        }
    }

    public validateBeaconUdiOperation() {
        return (req, res) => {
            this.validateBeaconUdi(req, res);
        }
    }

    private getBeacons(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);

        this._beaconsClient.getBeacons(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getBeacon(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let beaconId = req.route.params.beacon_id;

        this._beaconsClient.getBeaconById(
            null, beaconId, this.sendResult(req, res)
        );
    }

    private calculatePosition(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let udis = req.param('udis');
        if (_.isString(udis))
            udis = udis.split(',');

        this._beaconsClient.calculatePosition(
            null, orgId, udis, this.sendResult(req, res)
        );
    }
    
    private createBeacon(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let beacon = req.body || {};

        this._beaconsClient.createBeacon(
            null, beacon, this.sendResult(req, res)
        );
    }

    private updateBeacon(req: any, res: any): void {
        let beaconId = req.route.params.beacon_id;
        let orgId = req.route.params.org_id;
        let beacon = req.body || {};
        beacon.id = beaconId;

        this._beaconsClient.updateBeacon(
            null, beacon, this.sendResult(req, res)
        );
    }

    private deleteBeacon(req: any, res: any): void {
        let beaconId = req.route.params.beacon_id;
        let orgId = req.route.params.org_id;

        this._beaconsClient.deleteBeaconById(
            null, beaconId, this.sendResult(req, res)
        );
    }

    private validateBeaconUdi(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let udi = req.param('udi');

        this._beaconsClient.getBeaconByUdi(
            null, udi, (err, beacon) => {
                if (beacon) res.json(beacon.id);
                else res.json('');
            }
        );
    }
    
}