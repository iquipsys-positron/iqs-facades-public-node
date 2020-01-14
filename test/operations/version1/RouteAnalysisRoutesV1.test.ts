let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { RouteAnalysisDirectClientV1 } from 'pip-clients-routeanalysis-node';

import { RouteTypeV1 } from 'pip-clients-routeanalysis-node';
import { ObjectPositionV1 } from 'pip-clients-routeanalysis-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { RouteAnalysisOperationsV1 } from '../../../src/operations/version1/RouteAnalysisOperationsV1';

suite('RouteAnalysisOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('pip-services-routeanalysis', 'client', 'direct', 'default', '1.0'), new RouteAnalysisDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'route-analysis', 'default', '1.0'), new RouteAnalysisOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform route operations', (done) => {
        let time = new Date().getTime();

        async.series([
            // Add point
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/curr_object_routes/positions',
                    { org_id: '1', object_id: '1', time: new Date(time), lat: 1, lng: 1 },
                    (err, req, res) => {
                        assert.isNull(err);
                        callback(err);
                    }
                );
            },
            // Add another point
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/curr_object_routes/positions/batch',
                    [ { org_id: '1', object_id: '2', time: new Date(time), lat: 2, lng: 2 } ],
                    (err, req, res) => {
                        assert.isNull(err);
                        callback(err);
                    }
                );
            },
            // Get all routes
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/curr_object_routes',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                )
            },
            // Get route for specific object
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/curr_object_routes/1',
                    (err, req, res, route) => {
                        assert.isNull(err);

                        assert.isObject(route);
                        assert.equal(RouteTypeV1.Travel, route.type);
                        // assert.equal(time, route.start_time.getTime());
                        // assert.equal(time, route.end_time.getTime());
                        assert.equal(0, route.duration);
                        assert.lengthOf(route.positions, 1);

                        callback();
                    }
                )
            },
        ], done);
    });

});