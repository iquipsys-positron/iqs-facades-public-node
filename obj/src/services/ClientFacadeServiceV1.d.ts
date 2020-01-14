import { PartitionFacadeService } from 'pip-services3-facade-node';
export declare class ClientFacadeServiceV1 extends PartitionFacadeService {
    constructor();
    protected register(): void;
    private registerAllMiddleware;
    private registerInfrastructureRoutes;
    private registerUsersRoutes;
    private registerContentRoutes;
    private registerSupportRoutes;
    private registerRootRoutes;
    private registerConfigurationRoutes;
    private registerRealtimeRoutes;
    private registerHistoricalRoutes;
}
