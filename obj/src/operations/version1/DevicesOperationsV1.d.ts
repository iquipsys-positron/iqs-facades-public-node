import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class DevicesOperationsV1 extends FacadeOperations {
    private _devicesClient;
    private _mqttGatewayClient;
    constructor();
    setReferences(references: IReferences): void;
    getDevicesOperation(): (req: any, res: any) => void;
    getDeviceOperation(): (req: any, res: any) => void;
    createDeviceOperation(): (req: any, res: any) => void;
    updateDeviceOperation(): (req: any, res: any) => void;
    deleteDeviceOperation(): (req: any, res: any) => void;
    validateDeviceUdiOperation(): (req: any, res: any) => void;
    pingDeviceOperation(): (req: any, res: any) => void;
    private getDevices;
    private getDevice;
    private createDevice;
    private updateDevice;
    private deleteDevice;
    private validateDeviceUdi;
    private pingDevice;
}
