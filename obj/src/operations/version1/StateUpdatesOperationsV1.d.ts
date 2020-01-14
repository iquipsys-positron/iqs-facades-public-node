import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class StateUpdatesOperationsV1 extends FacadeOperations {
    private _stateUpdatesClient;
    constructor();
    setReferences(references: IReferences): void;
    beginUpdateStateOperation(): (req: any, res: any) => void;
    updateStateOperation(): (req: any, res: any) => void;
    private beginUpdateState;
    private updateState;
}
