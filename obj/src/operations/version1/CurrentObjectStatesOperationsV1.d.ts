import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class CurrentObjectStatesOperationsV1 extends FacadeOperations {
    private _statesClient;
    constructor();
    setReferences(references: IReferences): void;
    getStatesOperation(): (req: any, res: any) => void;
    getStateOperation(): (req: any, res: any) => void;
    setStateOperation(): (req: any, res: any) => void;
    deleteStateOperation(): (req: any, res: any) => void;
    deleteStatesOperation(): (req: any, res: any) => void;
    private getStates;
    private getState;
    private setState;
    private deleteState;
    private deleteStates;
}
