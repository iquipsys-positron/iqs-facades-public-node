import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class ShiftsOperationsV1 extends FacadeOperations {
    private _shiftsClient;
    constructor();
    setReferences(references: IReferences): void;
    getShiftsOperation(): (req: any, res: any) => void;
    getShiftOperation(): (req: any, res: any) => void;
    createShiftOperation(): (req: any, res: any) => void;
    updateShiftOperation(): (req: any, res: any) => void;
    deleteShiftOperation(): (req: any, res: any) => void;
    private getShifts;
    private getShift;
    private createShift;
    private updateShift;
    private deleteShift;
}
