let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { SignalV1 } from 'iqs-clients-signals-node';
import { SignalsDirectClientV1 } from 'iqs-clients-signals-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { SignalsOperationsV1 } from '../../../src/operations/version1/SignalsOperationsV1';

let SIGNAL1: SignalV1 = {
    id: '1',
    org_id: '1',
    time: new Date(),
    device_id: '1',
    type: 1
};
let SIGNAL2: SignalV1 = {
    id: '2',
    org_id: '1',
    time: new Date(),
    device_id: '1',
    type: 2,
    lock_until: new Date().getTime() + 10000
};

suite('SignalsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-signals', 'client', 'direct', 'default', '1.0'), new SignalsDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'signals', 'default', '1.0'), new SignalsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform signal operations', (done) => {
        let signal1, signal2: SignalV1;

        async.series([
        // Create one signal
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + SIGNAL1.org_id + '/signals',
                    SIGNAL1,
                    (err, req, res, signal) => {
                        assert.isNull(err);

                        assert.isObject(signal);
                        assert.equal(signal.org_id, SIGNAL1.org_id);
                        assert.equal(signal.device_id, SIGNAL1.device_id);
                        assert.equal(signal.type, SIGNAL1.type);

                        signal1 = signal;

                        callback();
                    }
                );
            },
        // Create another signal
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + SIGNAL2.org_id + '/signals', 
                    SIGNAL2,
                    (err, req, res, signal) => {
                        assert.isNull(err);

                        assert.isObject(signal);
                        assert.equal(signal.org_id, SIGNAL2.org_id);
                        assert.equal(signal.device_id, SIGNAL2.device_id);
                        assert.equal(signal.type, SIGNAL2.type);

                        signal2 = signal;

                        callback();
                    }
                );
            },
        // Get all signals
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + SIGNAL1.org_id + '/signals',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Lock the signal
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + signal1.org_id + '/signals/' + signal1.id + '/lock',
                    signal1,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isTrue(result);

                        callback();
                    }
                );
            },
        // Mark the signal sent
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + signal1.org_id + '/signals/' + signal1.id + '/close',
                    signal1,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isTrue(result);

                        callback();
                    }
                );
            },
        // Delete signal
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + signal1.org_id + '/signals/' + signal1.id,
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