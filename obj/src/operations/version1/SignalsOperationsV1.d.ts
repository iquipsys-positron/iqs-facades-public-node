import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class SignalsOperationsV1 extends FacadeOperations {
    private _signalsClient;
    constructor();
    setReferences(references: IReferences): void;
    getSignalsOperation(): (req: any, res: any) => void;
    sendSignalOperation(): (req: any, res: any) => void;
    lockSignalOperation(): (req: any, res: any) => void;
    markSignalSentOperation(): (req: any, res: any) => void;
    deleteSignalOperation(): (req: any, res: any) => void;
    private getSignals;
    private sendSignal;
    private lockSignal;
    private markSignalSent;
    private deleteSignal;
}
