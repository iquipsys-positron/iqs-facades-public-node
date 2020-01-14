import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class CorrectionsOperationsV1 extends FacadeOperations {
    private _correctionsClient;
    constructor();
    setReferences(references: IReferences): void;
    getCorrectionsOperation(): (req: any, res: any) => void;
    getCorrectionOperation(): (req: any, res: any) => void;
    createCorrectionOperation(): (req: any, res: any) => void;
    updateCorrectionOperation(): (req: any, res: any) => void;
    deleteCorrectionOperation(): (req: any, res: any) => void;
    private getCorrections;
    private getCorrection;
    private createCorrection;
    private updateCorrection;
    private deleteCorrection;
}
