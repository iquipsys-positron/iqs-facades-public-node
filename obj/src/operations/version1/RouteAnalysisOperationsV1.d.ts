import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class RouteAnalysisOperationsV1 extends FacadeOperations {
    private _routesClient;
    constructor();
    setReferences(references: IReferences): void;
    getCurrentRoutesOperation(): (req: any, res: any) => void;
    getCurrentRouteOperation(): (req: any, res: any) => void;
    addPositionOperation(): (req: any, res: any) => void;
    addPositionsOperation(): (req: any, res: any) => void;
    private getCurrentRoutes;
    private getCurrentRoute;
    private addPosition;
    private addPositions;
}
