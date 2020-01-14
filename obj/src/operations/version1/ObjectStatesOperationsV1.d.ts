import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class ObjectStatesOperationsV1 extends FacadeOperations {
    private _statesClient;
    private _positionsClient;
    constructor();
    setReferences(references: IReferences): void;
    getStatesOperation(): (req: any, res: any) => void;
    getTimelineStatesOperation(): (req: any, res: any) => void;
    addStateOperation(): (req: any, res: any) => void;
    addStatesOperation(): (req: any, res: any) => void;
    deleteStatesOperation(): (req: any, res: any) => void;
    private getStates;
    private getTimelineStates;
    private addState;
    private addStates;
    private deleteStates;
}
