let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { PositionsDirectClientV1 } from 'pip-clients-positions-node';

import { ObjectPositionsV1 } from 'pip-clients-positions-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { ObjectPositionsOperationsV1 } from '../../../src/operations/version1/ObjectPositionsOperationsV1';

let now = new Date().getTime();
let interval = 300000;
let point1 = new Date(now);
let point2 = new Date(now + (interval / 2));
let point3 = new Date(now + interval);

suite('ObjectPositionsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('pip-services-positions', 'client', 'direct', 'default', '1.0'), new PositionsDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'object-positions', 'default', '1.0'), new ObjectPositionsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform position operations', (done) => {
        async.series([
        // Add one position
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/object_positions',
                    {
                        org_id: '1',
                        object_id: '1',
                        lat: 32.32,
                        lng: -110.92
                    },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get all positions
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/object_positions',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
        // Get positions count
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/object_positions/count',
                    {
                        org_id: '1',
                        object_ids: ['1']
                    },
                    (err, req, res, count) => {
                        assert.isNull(err);

                        assert.equal(count, 1);

                        callback();
                    }
                );
            },
        // Delete positions
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/object_positions',
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });

});