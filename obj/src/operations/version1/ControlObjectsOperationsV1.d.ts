import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class ControlObjectsOperationsV1 extends FacadeOperations {
    private _objectsClient;
    constructor();
    setReferences(references: IReferences): void;
    getObjectsOperation(): (req: any, res: any) => void;
    getObjectOperation(): (req: any, res: any) => void;
    createObjectOperation(): (req: any, res: any) => void;
    updateObjectOperation(): (req: any, res: any) => void;
    deleteObjectOperation(): (req: any, res: any) => void;
    private getObjects;
    private getObject;
    private createObject;
    private updateObject;
    private deleteObject;
}
