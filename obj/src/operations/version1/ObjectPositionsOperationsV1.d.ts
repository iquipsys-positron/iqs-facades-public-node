import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class ObjectPositionsOperationsV1 extends FacadeOperations {
    private _positionsClient;
    constructor();
    setReferences(references: IReferences): void;
    getPositionsOperation(): (req: any, res: any) => void;
    getPositionsCountOperation(): (req: any, res: any) => void;
    addPositionOperation(): (req: any, res: any) => void;
    addPositionsOperation(): (req: any, res: any) => void;
    deletePositionsOperation(): (req: any, res: any) => void;
    private getPositions;
    private getPositionsCount;
    private addPosition;
    private addPositions;
    private deletePositions;
}
