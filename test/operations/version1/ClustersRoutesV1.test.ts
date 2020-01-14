let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { ClustersDirectClientV1 } from 'pip-clients-clusters-node';
import { ClusterV1 } from 'pip-clients-clusters-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { ClustersOperationsV1 } from '../../../src/operations/version1/ClustersOperationsV1';

let CLUSTER1: ClusterV1 = {
    id: '1',
    name: 'Cluster #1',
    type: 'root',
    active: true,
    max_tenant_count: 1,
    tenants_count: 1,
    active_tenants: ['1']
};
let CLUSTER2: ClusterV1 = {
    id: '2',
    name: 'Cluster #2',
    type: 'organizations',
    active: true,
    max_tenant_count: 10,
    tenants_count: 4,
    active_tenants: ['2', '3'],
    inactive_tenants: ['4']
};

suite('ClustersOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('pip-services-clusters', 'client', 'direct', 'default', '1.0'), new ClustersDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'clusters', 'default', '1.0'), new ClustersOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform cluster operations', (done) => {
        let cluster1, cluster2: ClusterV1;

        async.series([
        // Create one cluster
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/clusters',
                    CLUSTER1,
                    (err, req, res, cluster) => {
                        assert.isNull(err);

                        assert.isObject(cluster);
                        assert.equal(cluster.name, CLUSTER1.name);

                        cluster1 = cluster;

                        callback();
                    }
                );
            },
        // Create another cluster
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/clusters', 
                    CLUSTER2,
                    (err, req, res, cluster) => {
                        assert.isNull(err);

                        assert.isObject(cluster);
                        assert.equal(cluster.name, CLUSTER2.name);

                        cluster2 = cluster;

                        callback();
                    }
                );
            },
        // Get all clusters
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/clusters',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the cluster
            (callback) => {
                cluster1.active = false;
                cluster1.max_tenant_count = 2;
                cluster1.tenants_count = 2;

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/clusters/' + cluster1.id,
                    cluster1,
                    (err, req, res, cluster) => {
                        assert.isNull(err);

                        assert.isObject(cluster);
                        assert.isFalse(cluster.active);
                        assert.equal(cluster.max_tenant_count, 2);
                        assert.equal(cluster.tenants_count, 2);
                        assert.isFalse(cluster.open);

                        cluster1 = cluster;

                        callback();
                    }
                );
            },
        // Delete cluster
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/clusters/' + cluster1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete cluster
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/clusters/' + cluster1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });

});