import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class IncidentsOperationsV1 extends FacadeOperations {
    private _incidentsClient;
    constructor();
    setReferences(references: IReferences): void;
    getIncidentsOperation(): (req: any, res: any) => void;
    getIncidentsCountOperation(): (req: any, res: any) => void;
    getIncidentOperation(): (req: any, res: any) => void;
    createIncidentOperation(): (req: any, res: any) => void;
    closeIncidentOperation(): (req: any, res: any) => void;
    deleteIncidentOperation(): (req: any, res: any) => void;
    private getIncidents;
    private getIncidentsCount;
    private getIncident;
    private createIncident;
    private closeIncident;
    private deleteIncident;
}
