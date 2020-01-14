import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class ObjectRoutesOperationsV1 extends FacadeOperations {
    private _routesClient;
    constructor();
    setReferences(references: IReferences): void;
    getRoutesOperation(): (req: any, res: any) => void;
    getRouteOperation(): (req: any, res: any) => void;
    createRouteOperation(): (req: any, res: any) => void;
    updateRouteOperation(): (req: any, res: any) => void;
    deleteRouteOperation(): (req: any, res: any) => void;
    deleteRoutesOperation(): (req: any, res: any) => void;
    private getRoutes;
    private getRoute;
    private createRoute;
    private updateRoute;
    private deleteRoute;
    private deleteRoutes;
}
