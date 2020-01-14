import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class RestGatewayOperationsV1 extends FacadeOperations {
    private _restGatewayClient;
    constructor();
    setReferences(references: IReferences): void;
    updateStatusOperation(): (req: any, res: any) => void;
    private updateStatus;
}
