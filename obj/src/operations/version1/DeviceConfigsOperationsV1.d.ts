import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class DeviceConfigsOperationsV1 extends FacadeOperations {
    private _configsClient;
    constructor();
    setReferences(references: IReferences): void;
    getConfigOperation(): (req: any, res: any) => void;
    setConfigOperation(): (req: any, res: any) => void;
    deleteConfigOperation(): (req: any, res: any) => void;
    requestConfigOperation(): (req: any, res: any) => void;
    sendConfigOperation(): (req: any, res: any) => void;
    receiveConfigOperation(): (req: any, res: any) => void;
    private getConfig;
    private setConfig;
    private deleteConfig;
    private requestConfig;
    private sendConfig;
    private receiveConfig;
}
