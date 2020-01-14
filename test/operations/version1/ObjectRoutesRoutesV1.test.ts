let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { RouteTypeV1 } from 'pip-clients-routes-node';
import { ObjectRouteV1 } from 'pip-clients-routes-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { ObjectRoutesOperationsV1 } from '../../../src/operations/version1/ObjectRoutesOperationsV1';

let now = new Date().getTime();
let interval = 300000;
let time1 = new Date(now);
let time2 = new Date(now + interval);
let time3 = new Date(now + 2 * interval);
let point1 = new Date(now);
let point2 = new Date(now + (interval / 2));
let point3 = new Date(now + interval);

suite('ObjectRoutesOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-facade', 'operations', 'routes', 'default', '1.0'), new ObjectRoutesOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform object route operations', (done) => {
        let route1: ObjectRouteV1;

        async.series([
        // Create one route
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/object_routes',
                    { id: '1', org_id: '1', object_id: '1', type: RouteTypeV1.Travel, start_time: time1, end_time: time2, duration: 1000, positions: [] },
                    (err, req, res, route) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Delete route
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/object_routes/1',
                    (err, req, res, route) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete routes
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/object_routes/1',
                    (err, req, res, route) => {
                        assert.isNull(err);

                        //assert.isNull(route || null);

                        callback();
                    }
                );
            }
        ], done);
    });

});