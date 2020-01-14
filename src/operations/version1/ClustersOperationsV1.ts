let _ = require('lodash');
let async = require('async');

import { DataPage } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';

import { IClustersClientV1 } from 'pip-clients-clusters-node';
import { ClusterV1 } from 'pip-clients-clusters-node';
import { FacadeOperations } from 'pip-services3-facade-node';

export class ClustersOperationsV1 extends FacadeOperations {
    private _clustersClient: IClustersClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('clusters', new Descriptor('pip-services-clusters', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._clustersClient = this._dependencyResolver.getOneRequired<IClustersClientV1>('clusters');
    }

    public getClustersOperation() {
        return (req, res) => {
            this.getClusters(req, res);
        }
    }

    public getClusterOperation() {
        return (req, res) => {
            this.getCluster(req, res);
        }
    }

    public getClusterByOrganizationOperation() {
        return (req, res) => {
            this.getClusterByOrganization(req, res);
        }
    }

    public ClusterAddOrganizationOperation() {
        return (req, res) => {
            this.clusterAddOrganization(req, res);
        }
    }

    public ClusterRemoveOrganizationOperation() {
        return (req, res) => {
            this.clusterRemoveOrganization(req, res);
        }
    }

    public createClusterOperation() {
        return (req, res) => {
            this.createCluster(req, res);
        }
    }

    public updateClusterOperation() {
        return (req, res) => {
            this.updateCluster(req, res);
        }
    }

    public deleteClusterOperation() {
        return (req, res) => {
            this.deleteCluster(req, res);
        }
    }

    private getClusters(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        this._clustersClient.getClusters(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getCluster(req: any, res: any): void {
        let clusterId = req.route.params.cluster_id;

        this._clustersClient.getClusterById(
            null, clusterId, this.sendResult(req, res)
        );
    }

    private getClusterByOrganization(req: any, res: any): void {
        let orgId = req.route.params.org_id;

        this._clustersClient.getClusterByTenant(
            null, orgId, this.sendResult(req, res)
        );
    }

    private createCluster(req: any, res: any): void {
        let data = req.body || {};
        let cluster: ClusterV1;

        this._clustersClient.createCluster(
            null, data, this.sendResult(req, res)
        );
    }

    private clusterAddOrganization(req: any, res: any): void {
        let orgId = req.param('org_id');

        this._clustersClient.addTenant(
            null, orgId, this.sendResult(req, res)
        );
    }

    private clusterRemoveOrganization(req: any, res: any): void {
        let orgId = req.param('org_id');

        this._clustersClient.removeTenant(
            null, orgId, this.sendResult(req, res)
        );
    }

    private updateCluster(req: any, res: any): void {
        let clusterId = req.route.params.cluster_id;
        let data = req.body || {};
        data.id = clusterId;
        let cluster: ClusterV1;

        this._clustersClient.updateCluster(
            null, data, this.sendResult(req, res)
        );
    }

    private deleteCluster(req: any, res: any): void {
        let clusterId = req.route.params.cluster_id;

        this._clustersClient.deleteClusterById(
            null, clusterId, this.sendResult(req, res)
        );
    }

}