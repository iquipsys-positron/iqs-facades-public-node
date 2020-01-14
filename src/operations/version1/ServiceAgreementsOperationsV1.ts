let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';

import { IServiceAgreementsClientV1 } from 'iqs-clients-agreements-node';
import { ServiceAgreementV1 } from 'iqs-clients-agreements-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class ServiceAgreementsOperationsV1  extends FacadeOperations {
    private _agreementsClient: IServiceAgreementsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('agreements', new Descriptor('iqs-services-agreements', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._agreementsClient = this._dependencyResolver.getOneRequired<IServiceAgreementsClientV1>('agreements');
    }

    public getAgreementsOperation() {
        return (req, res) => {
            this.getAgreements(req, res);
        }
    }

    public verifyAgreementOperation() {
        return (req, res) => {
            this.verifyAgreement(req, res);
        }
    }

    public getAgreementOperation() {
        return (req, res) => {
            this.getAgreement(req, res);
        }
    }

    public createAgreementOperation() {
        return (req, res) => {
            this.createAgreement(req, res);
        }
    }

    public updateAgreementOperation() {
        return (req, res) => {
            this.updateAgreement(req, res);
        }
    }

    public deleteAgreementOperation() {
        return (req, res) => {
            this.deleteAgreement(req, res);
        }
    }

    private getAgreements(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        this._agreementsClient.getAgreements(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private verifyAgreement(req: any, res: any): void {
        let number = req.param('number');
        let filter = FilterParams.fromTuples(
            'number', number
        );

        this._agreementsClient.getAgreements(
            null, filter, null, (err, page) => {
                if (err) this.sendError(req, res, err);
                else res.json(page && page.data && page.data.length > 0);
            }
        );
    }

    private getAgreement(req: any, res: any): void {
        let agreementId = req.route.params.agreement_id;

        this._agreementsClient.getAgreementById(
            null, agreementId, this.sendResult(req, res)
        );
    }

    private createAgreement(req: any, res: any): void {
        let agreement = req.body || {};

        this._agreementsClient.createAgreement(
            null, agreement, this.sendResult(req, res)
        );
    }

    private updateAgreement(req: any, res: any): void {
        let agreementId = req.route.params.agreement_id;
        let agreement = req.body || {};
        agreement.id = agreementId;

        this._agreementsClient.updateAgreement(
            null, agreement, this.sendResult(req, res)
        );
    }

    private deleteAgreement(req: any, res: any): void {
        let agreementId = req.route.params.agreement_id;

        this._agreementsClient.deleteAgreementById(
            null, agreementId, this.sendResult(req, res)
        );
    }

}