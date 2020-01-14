let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { ICorrectionsClientV1 } from 'iqs-clients-corrections-node';
import { CorrectionV1 } from 'iqs-clients-corrections-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class CorrectionsOperationsV1  extends FacadeOperations {
    private _correctionsClient: ICorrectionsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('corrections', new Descriptor('iqs-services-corrections', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._correctionsClient = this._dependencyResolver.getOneRequired<ICorrectionsClientV1>('corrections');
    }

    public getCorrectionsOperation() {
        return (req, res) => {
            this.getCorrections(req, res);
        }
    }

    public getCorrectionOperation() {
        return (req, res) => {
            this.getCorrection(req, res);
        }
    }

    public createCorrectionOperation() {
        return (req, res) => {
            this.createCorrection(req, res);
        }
    }

    public updateCorrectionOperation() {
        return (req, res) => {
            this.updateCorrection(req, res);
        }
    }

    public deleteCorrectionOperation() {
        return (req, res) => {
            this.deleteCorrection(req, res);
        }
    }

    private getCorrections(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._correctionsClient.getCorrections(
            null, orgId, filter, paging, this.sendResult(req, res)
        );
    }

    private getCorrection(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let correctionId = req.route.params.correction_id;

        this._correctionsClient.getCorrectionById(
            null, orgId, correctionId, this.sendResult(req, res)
        );
    }

    private createCorrection(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let correction = req.body || {};

        this._correctionsClient.createCorrection(
            null, orgId, correction, this.sendResult(req, res)
        );
    }

    private updateCorrection(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let correctionId = req.route.params.correction_id;
        let correction = req.body || {};
        correction.id = correctionId;

        this._correctionsClient.updateCorrection(
            null, orgId, correction, this.sendResult(req, res)
        );
    }

    private deleteCorrection(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let correctionId = req.route.params.correction_id;

        this._correctionsClient.deleteCorrectionById(
            null, orgId, correctionId, this.sendResult(req, res)
        );
    }

}