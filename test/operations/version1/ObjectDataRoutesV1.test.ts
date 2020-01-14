let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { TransducerDataDirectClientV1 } from 'pip-clients-transducerdata-node';

import { ObjectDataV1 } from 'pip-clients-transducerdata-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { ObjectDataOperationsV1 } from '../../../src/operations/version1/ObjectDataOperationsV1';

let now = new Date().getTime();
let interval = 300000;
let point1 = new Date(now);
let point2 = new Date(now + (interval / 2));
let point3 = new Date(now + interval);

suite('ObjectDataOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('pip-services-transducerdata', 'client', 'direct', 'default', '1.0'), new TransducerDataDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'object-data', 'default', '1.0'), new ObjectDataOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform data operations', (done) => {
        async.series([
        // Add one data
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/object_data',
                    { org_id: '1', object_id: '1', time: point1, params: [ { id: 1, typ: 1, val: 1 }, { id: 2, typ: 2, val: 2 } ] },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get all data
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/object_data',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
        // Delete data
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/object_data',
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });

});