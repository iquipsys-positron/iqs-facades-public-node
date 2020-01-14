import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class ObjectGroupsOperationsV1 extends FacadeOperations {
    private _groupsClient;
    constructor();
    setReferences(references: IReferences): void;
    getGroupsOperation(): (req: any, res: any) => void;
    getGroupOperation(): (req: any, res: any) => void;
    createGroupOperation(): (req: any, res: any) => void;
    updateGroupOperation(): (req: any, res: any) => void;
    deleteGroupOperation(): (req: any, res: any) => void;
    private getGroups;
    private getGroup;
    private createGroup;
    private updateGroup;
    private deleteGroup;
}
