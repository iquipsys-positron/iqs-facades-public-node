import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class CloudwatchOperationsV1 extends FacadeOperations {
    private _cloudwatchClient;
    constructor();
    setReferences(references: IReferences): void;
    getAWSLogGroupsOperation(): (req: any, res: any) => void;
    getAWSLogStreamsOperation(): (req: any, res: any) => void;
    getAWSLogEventsOperation(): (req: any, res: any) => void;
    getAWSMetricDataOperation(): (req: any, res: any) => void;
    private getAWSLogGroups;
    private getAWSLogStreams;
    private getAWSLogEvents;
    private getAWSMetricData;
}
