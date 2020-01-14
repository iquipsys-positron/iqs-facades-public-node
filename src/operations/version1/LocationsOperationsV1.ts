let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { ILocationsClientV1 } from 'iqs-clients-locations-node';
import { LocationV1 } from 'iqs-clients-locations-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class LocationsOperationsV1  extends FacadeOperations {
    private _locationsClient: ILocationsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('locations', new Descriptor('iqs-services-locations', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._locationsClient = this._dependencyResolver.getOneRequired<ILocationsClientV1>('locations');
    }

    public getLocationsOperation() {
        return (req, res) => {
            this.getLocations(req, res);
        }
    }

    public getLocationOperation() {
        return (req, res) => {
            this.getLocation(req, res);
        }
    }

    public createLocationOperation() {
        return (req, res) => {
            this.createLocation(req, res);
        }
    }

    public updateLocationOperation() {
        return (req, res) => {
            this.updateLocation(req, res);
        }
    }

    public deleteLocationOperation() {
        return (req, res) => {
            this.deleteLocation(req, res);
        }
    }

    private getLocations(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._locationsClient.getLocations(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getLocation(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let locationId = req.route.params.location_id;

        this._locationsClient.getLocationById(
            null, locationId, this.sendResult(req, res)
        );
    }

    private createLocation(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let location = req.body || {};

        this._locationsClient.createLocation(
            null, location, this.sendResult(req, res)
        );
    }

    private updateLocation(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let locationId = req.route.params.location_id;
        let location = req.body || {};
        location.id = locationId;

        this._locationsClient.updateLocation(
            null, location, this.sendResult(req, res)
        );
    }

    private deleteLocation(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let locationId = req.route.params.location_id;

        this._locationsClient.deleteLocationById(
            null, locationId, this.sendResult(req, res)
        );
    }

}