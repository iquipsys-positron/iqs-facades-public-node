import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class ClustersOperationsV1 extends FacadeOperations {
    private _clustersClient;
    constructor();
    setReferences(references: IReferences): void;
    getClustersOperation(): (req: any, res: any) => void;
    getClusterOperation(): (req: any, res: any) => void;
    getClusterByOrganizationOperation(): (req: any, res: any) => void;
    ClusterAddOrganizationOperation(): (req: any, res: any) => void;
    ClusterRemoveOrganizationOperation(): (req: any, res: any) => void;
    createClusterOperation(): (req: any, res: any) => void;
    updateClusterOperation(): (req: any, res: any) => void;
    deleteClusterOperation(): (req: any, res: any) => void;
    private getClusters;
    private getCluster;
    private getClusterByOrganization;
    private createCluster;
    private clusterAddOrganization;
    private clusterRemoveOrganization;
    private updateCluster;
    private deleteCluster;
}
