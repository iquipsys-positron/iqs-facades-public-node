import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class OperationalEventsOperationsV1 extends FacadeOperations {
    private _eventsClient;
    constructor();
    setReferences(references: IReferences): void;
    getEventsOperation(): (req: any, res: any) => void;
    logEventOperation(): (req: any, res: any) => void;
    deleteEventOperation(): (req: any, res: any) => void;
    private getEvents;
    private logEvent;
    private deleteEvent;
}
