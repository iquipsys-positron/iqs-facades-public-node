import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class LocationsOperationsV1 extends FacadeOperations {
    private _locationsClient;
    constructor();
    setReferences(references: IReferences): void;
    getLocationsOperation(): (req: any, res: any) => void;
    getLocationOperation(): (req: any, res: any) => void;
    createLocationOperation(): (req: any, res: any) => void;
    updateLocationOperation(): (req: any, res: any) => void;
    deleteLocationOperation(): (req: any, res: any) => void;
    private getLocations;
    private getLocation;
    private createLocation;
    private updateLocation;
    private deleteLocation;
}
