import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class ZonesOperationsV1 extends FacadeOperations {
    private _zonesClient;
    constructor();
    setReferences(references: IReferences): void;
    getZonesOperation(): (req: any, res: any) => void;
    getZoneOperation(): (req: any, res: any) => void;
    createZoneOperation(): (req: any, res: any) => void;
    updateZoneOperation(): (req: any, res: any) => void;
    deleteZoneOperation(): (req: any, res: any) => void;
    private getZones;
    private getZone;
    private createZone;
    private updateZone;
    private deleteZone;
}
