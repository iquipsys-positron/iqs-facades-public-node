import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class EmergencyPlansOperationsV1 extends FacadeOperations {
    private _plansClient;
    constructor();
    setReferences(references: IReferences): void;
    getPlansOperation(): (req: any, res: any) => void;
    getPlanOperation(): (req: any, res: any) => void;
    createPlanOperation(): (req: any, res: any) => void;
    updatePlanOperation(): (req: any, res: any) => void;
    deletePlanOperation(): (req: any, res: any) => void;
    private getPlans;
    private getPlan;
    private createPlan;
    private updatePlan;
    private deletePlan;
}
