import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class ObjectDataOperationsV1 extends FacadeOperations {
    private _dataClient;
    constructor();
    setReferences(references: IReferences): void;
    getDataOperation(): (req: any, res: any) => void;
    addDataOperation(): (req: any, res: any) => void;
    addDataBatchOperation(): (req: any, res: any) => void;
    deleteDataOperation(): (req: any, res: any) => void;
    private getData;
    private addData;
    private addDataBatch;
    private deleteData;
}
