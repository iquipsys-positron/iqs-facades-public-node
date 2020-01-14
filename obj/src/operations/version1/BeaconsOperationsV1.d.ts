import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class BeaconsOperationsV1 extends FacadeOperations {
    private _beaconsClient;
    constructor();
    setReferences(references: IReferences): void;
    getBeaconsOperation(): (req: any, res: any) => void;
    getBeaconOperation(): (req: any, res: any) => void;
    calculatePositionOperation(): (req: any, res: any) => void;
    createBeaconOperation(): (req: any, res: any) => void;
    updateBeaconOperation(): (req: any, res: any) => void;
    deleteBeaconOperation(): (req: any, res: any) => void;
    validateBeaconUdiOperation(): (req: any, res: any) => void;
    private getBeacons;
    private getBeacon;
    private calculatePosition;
    private createBeacon;
    private updateBeacon;
    private deleteBeacon;
    private validateBeaconUdi;
}
