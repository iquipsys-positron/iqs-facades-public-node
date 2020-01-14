let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { OperationalEventsDirectClientV1 } from 'iqs-clients-opevents-node';

import { OperationalEventV1 } from 'iqs-clients-opevents-node';
import { SeverityV1 } from 'iqs-clients-opevents-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { OperationalEventsOperationsV1 } from '../../../src/operations/version1/OperationalEventsOperationsV1';

let EVENT1: OperationalEventV1 = {
    id: '1',
    org_id: '1',
    create_time: new Date(),
    time: new Date(),
    rule_id: '1',
    type: 'auto',
    severity: SeverityV1.Medium,
    description: 'Test event #1'
};
let EVENT2: OperationalEventV1 = {
    id: '2',
    org_id: '1',
    create_time: new Date(),
    time: new Date(),
    type: 'manual',
    severity: SeverityV1.High,
    description: 'Test event #2'
};

suite('OperationalEventsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-opevents', 'client', 'direct', 'default', '1.0'), new OperationalEventsDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'operational-events', 'default', '1.0'), new OperationalEventsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform event operations', (done) => {
        let event1, event2: OperationalEventV1;

        async.series([
        // Create one event
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + EVENT1.org_id + '/operational_events',
                    EVENT1,
                    (err, req, res, event) => {
                        assert.isNull(err);

                        assert.isObject(event);
                        assert.equal(event.description, EVENT1.description);
                        assert.equal(event.org_id, EVENT1.org_id);

                        event1 = event;

                        callback();
                    }
                );
            },
        // Create another event
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + EVENT2.org_id + '/operational_events', 
                    EVENT2,
                    (err, req, res, event) => {
                        assert.isNull(err);

                        assert.isObject(event);
                        assert.equal(event.description, EVENT2.description);
                        assert.equal(event.org_id, EVENT2.org_id);

                        event2 = event;

                        callback();
                    }
                );
            },
        // Get all events
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + EVENT1.org_id + '/operational_events',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Delete event
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + EVENT1.org_id + '/operational_events/' + event1.id,
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