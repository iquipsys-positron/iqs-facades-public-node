let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IResolutionsClientV1 } from 'iqs-clients-resolutions-node';
import { ResolutionV1 } from 'iqs-clients-resolutions-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class ResolutionsOperationsV1  extends FacadeOperations {
    private _resolutionsClient: IResolutionsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('resolutions', new Descriptor('iqs-services-resolutions', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._resolutionsClient = this._dependencyResolver.getOneRequired<IResolutionsClientV1>('resolutions');
    }

    public getResolutionsOperation() {
        return (req, res) => {
            this.getResolutions(req, res);
        }
    }

    public getResolutionOperation() {
        return (req, res) => {
            this.getResolution(req, res);
        }
    }

    public createResolutionOperation() {
        return (req, res) => {
            this.createResolution(req, res);
        }
    }

    public updateResolutionOperation() {
        return (req, res) => {
            this.updateResolution(req, res);
        }
    }

    public deleteResolutionOperation() {
        return (req, res) => {
            this.deleteResolution(req, res);
        }
    }

    private getResolutions(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._resolutionsClient.getResolutions(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getResolution(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let resolutionId = req.route.params.resolution_id;

        this._resolutionsClient.getResolutionById(
            null, resolutionId, this.sendResult(req, res)
        );
    }

    private createResolution(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let resolution = req.body || {};

        this._resolutionsClient.createResolution(
            null, resolution, this.sendResult(req, res)
        );
    }

    private updateResolution(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let resolutionId = req.route.params.resolution_id;
        let resolution = req.body || {};
        resolution.id = resolutionId;

        this._resolutionsClient.updateResolution(
            null, resolution, this.sendResult(req, res)
        );
    }

    private deleteResolution(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let resolutionId = req.route.params.resolution_id;

        this._resolutionsClient.deleteResolutionById(
            null, resolutionId, this.sendResult(req, res)
        );
    }

}