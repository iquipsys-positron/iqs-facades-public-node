import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class EventRulesOperationsV1 extends FacadeOperations {
    private _eventRulesClient;
    constructor();
    setReferences(references: IReferences): void;
    getEventRulesOperation(): (req: any, res: any) => void;
    getEventRuleOperation(): (req: any, res: any) => void;
    createEventRuleOperation(): (req: any, res: any) => void;
    updateEventRuleOperation(): (req: any, res: any) => void;
    deleteEventRuleOperation(): (req: any, res: any) => void;
    private getEventRules;
    private getEventRule;
    private createEventRule;
    private updateEventRule;
    private deleteEventRule;
}
