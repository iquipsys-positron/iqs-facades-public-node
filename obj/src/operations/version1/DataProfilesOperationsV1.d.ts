import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class DataProfilesOperationsV1 extends FacadeOperations {
    private _profilesClient;
    constructor();
    setReferences(references: IReferences): void;
    getProfileOperation(): (req: any, res: any) => void;
    setProfileOperation(): (req: any, res: any) => void;
    private getProfile;
    private setProfile;
}
