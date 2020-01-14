import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class RostersOperationsV1 extends FacadeOperations {
    private _rostersClient;
    constructor();
    setReferences(references: IReferences): void;
    getRostersOperation(): (req: any, res: any) => void;
    getRosterOperation(): (req: any, res: any) => void;
    createRosterOperation(): (req: any, res: any) => void;
    updateRosterOperation(): (req: any, res: any) => void;
    deleteRosterOperation(): (req: any, res: any) => void;
    private getRosters;
    private getRoster;
    private createRoster;
    private updateRoster;
    private deleteRoster;
}
