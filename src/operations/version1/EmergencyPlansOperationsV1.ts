let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IEmergencyPlansClientV1 } from 'iqs-clients-emergencyplans-node';
import { EmergencyPlanV1 } from 'iqs-clients-emergencyplans-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class EmergencyPlansOperationsV1  extends FacadeOperations {
    private _plansClient: IEmergencyPlansClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('emergency-plans', new Descriptor('iqs-services-emergencyplans', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._plansClient = this._dependencyResolver.getOneRequired<IEmergencyPlansClientV1>('emergency-plans');
    }

    public getPlansOperation() {
        return (req, res) => {
            this.getPlans(req, res);
        }
    }

    public getPlanOperation() {
        return (req, res) => {
            this.getPlan(req, res);
        }
    }

    public createPlanOperation() {
        return (req, res) => {
            this.createPlan(req, res);
        }
    }

    public updatePlanOperation() {
        return (req, res) => {
            this.updatePlan(req, res);
        }
    }

    public deletePlanOperation() {
        return (req, res) => {
            this.deletePlan(req, res);
        }
    }

    private getPlans(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._plansClient.getPlans(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getPlan(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let planId = req.route.params.plan_id;

        this._plansClient.getPlanById(
            null, planId, this.sendResult(req, res)
        );
    }

    private createPlan(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let obj = req.body || {};

        this._plansClient.createPlan(
            null, obj, this.sendResult(req, res)
        );
    }

    private updatePlan(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let planId = req.route.params.plan_id;
        let obj = req.body || {};
        obj.id = planId;

        this._plansClient.updatePlan(
            null, obj, this.sendResult(req, res)
        );
    }

    private deletePlan(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let planId = req.route.params.plan_id;

        this._plansClient.deletePlanById(
            null, planId, this.sendResult(req, res)
        );
    }

}