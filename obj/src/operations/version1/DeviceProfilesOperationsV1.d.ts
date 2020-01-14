import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class DeviceProfilesOperationsV1 extends FacadeOperations {
    private _profilesClient;
    constructor();
    setReferences(references: IReferences): void;
    getBaseProfilesOperation(): (req: any, res: any) => void;
    getProfilesOperation(): (req: any, res: any) => void;
    getProfileOperation(): (req: any, res: any) => void;
    createProfileOperation(): (req: any, res: any) => void;
    updateProfileOperation(): (req: any, res: any) => void;
    deleteProfileOperation(): (req: any, res: any) => void;
    private getBaseProfiles;
    private getProfiles;
    private getProfile;
    private createProfile;
    private updateProfile;
    private deleteProfile;
}
