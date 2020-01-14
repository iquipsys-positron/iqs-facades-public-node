import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class GatewaysOperationsV1 extends FacadeOperations {
    private _gatewaysClient;
    private _mqttGatewayClient;
    constructor();
    setReferences(references: IReferences): void;
    getGatewaysOperation(): (req: any, res: any) => void;
    getGatewayOperation(): (req: any, res: any) => void;
    createGatewayOperation(): (req: any, res: any) => void;
    updateGatewayOperation(): (req: any, res: any) => void;
    deleteGatewayOperation(): (req: any, res: any) => void;
    validateGatewayUdiOperation(): (req: any, res: any) => void;
    pingGatewayOperation(): (req: any, res: any) => void;
    requestStatisticsOperation(): (req: any, res: any) => void;
    private getGateways;
    private getGateway;
    private createGateway;
    private updateGateway;
    private deleteGateway;
    private validateGatewayUdi;
    private pingGateway;
    private requestStatistics;
}
