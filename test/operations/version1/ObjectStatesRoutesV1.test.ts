let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';

import { ObjectStatesDirectClientV1 } from 'iqs-clients-objectstates-node';

import { ObjectStateV1 } from 'iqs-clients-objectstates-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { ObjectStatesOperationsV1 } from '../../../src/operations/version1/ObjectStatesOperationsV1';

let STATE1: ObjectStateV1 = {
    org_id: '1',
    device_id: '1',
    object_id: '1',
    time: new Date(),
    online: 0,
    freezed: 0
};
let STATE2: ObjectStateV1 = {
    org_id: '1',
    device_id: '1',
    object_id: '1',
    time: new Date(),
    online: 1,
    freezed: 1
};

suite('ObjectStatesOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-objectstates', 'client', 'direct', 'default', '1.0'), new ObjectStatesDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'object-states', 'default', '1.0'), new ObjectStatesOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform state operations', (done) => {
        async.series([
        // Add one state
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + STATE1.org_id + '/object_states',
                    STATE1,
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get all states
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + STATE1.org_id + '/object_states',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
        // Get latest states
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + STATE1.org_id + '/object_states/timeline?time=' + StringConverter.toString(new Date()),
                    (err, req, res, states) => {
                        assert.isNull(err);

                        assert.isArray(states);
                        assert.lengthOf(states, 1);

                        callback();
                    }
                );
            },
        // Delete states
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + STATE1.org_id + '/object_states',
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });


});