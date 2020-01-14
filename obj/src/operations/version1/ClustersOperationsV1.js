"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class ClustersOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('clusters', new pip_services3_commons_node_1.Descriptor('pip-services-clusters', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._clustersClient = this._dependencyResolver.getOneRequired('clusters');
    }
    getClustersOperation() {
        return (req, res) => {
            this.getClusters(req, res);
        };
    }
    getClusterOperation() {
        return (req, res) => {
            this.getCluster(req, res);
        };
    }
    getClusterByOrganizationOperation() {
        return (req, res) => {
            this.getClusterByOrganization(req, res);
        };
    }
    ClusterAddOrganizationOperation() {
        return (req, res) => {
            this.clusterAddOrganization(req, res);
        };
    }
    ClusterRemoveOrganizationOperation() {
        return (req, res) => {
            this.clusterRemoveOrganization(req, res);
        };
    }
    createClusterOperation() {
        return (req, res) => {
            this.createCluster(req, res);
        };
    }
    updateClusterOperation() {
        return (req, res) => {
            this.updateCluster(req, res);
        };
    }
    deleteClusterOperation() {
        return (req, res) => {
            this.deleteCluster(req, res);
        };
    }
    getClusters(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._clustersClient.getClusters(null, filter, paging, this.sendResult(req, res));
    }
    getCluster(req, res) {
        let clusterId = req.route.params.cluster_id;
        this._clustersClient.getClusterById(null, clusterId, this.sendResult(req, res));
    }
    getClusterByOrganization(req, res) {
        let orgId = req.route.params.org_id;
        this._clustersClient.getClusterByTenant(null, orgId, this.sendResult(req, res));
    }
    createCluster(req, res) {
        let data = req.body || {};
        let cluster;
        this._clustersClient.createCluster(null, data, this.sendResult(req, res));
    }
    clusterAddOrganization(req, res) {
        let orgId = req.param('org_id');
        this._clustersClient.addTenant(null, orgId, this.sendResult(req, res));
    }
    clusterRemoveOrganization(req, res) {
        let orgId = req.param('org_id');
        this._clustersClient.removeTenant(null, orgId, this.sendResult(req, res));
    }
    updateCluster(req, res) {
        let clusterId = req.route.params.cluster_id;
        let data = req.body || {};
        data.id = clusterId;
        let cluster;
        this._clustersClient.updateCluster(null, data, this.sendResult(req, res));
    }
    deleteCluster(req, res) {
        let clusterId = req.route.params.cluster_id;
        this._clustersClient.deleteClusterById(null, clusterId, this.sendResult(req, res));
    }
}
exports.ClustersOperationsV1 = ClustersOperationsV1;
//# sourceMappingURL=ClustersOperationsV1.js.map