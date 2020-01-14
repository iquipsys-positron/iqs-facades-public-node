let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { ShiftV1 } from 'iqs-clients-shifts-node';
import { ShiftsDirectClientV1 } from 'iqs-clients-shifts-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { ShiftsOperationsV1 } from '../../../src/operations/version1/ShiftsOperationsV1';

let SHIFT1: ShiftV1 = {
    id: '1',
    org_id: '1',
    name: 'Test shift 1',
    start: 0,
    duration: 480
};
let SHIFT2: ShiftV1 = {
    id: '2',
    org_id: '1',
    name: 'Test shift 2',
    start: 480,
    duration: 480
};

suite('ShiftsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-shifts', 'client', 'direct', 'default', '1.0'), new ShiftsDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'shifts', 'default', '1.0'), new ShiftsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform shift operations', (done) => {
        let shift1, shift2: ShiftV1;

        async.series([
        // Create one shift
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + SHIFT1.org_id + '/shifts',
                    SHIFT1,
                    (err, req, res, shift) => {
                        assert.isNull(err);

                        assert.isObject(shift);
                        assert.equal(shift.org_id, SHIFT1.org_id);
                        assert.equal(shift.name, SHIFT1.name);

                        shift1 = shift;

                        callback();
                    }
                );
            },
        // Create another shift
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + SHIFT1.org_id + '/shifts', 
                    SHIFT2,
                    (err, req, res, shift) => {
                        assert.isNull(err);

                        assert.isObject(shift);
                        assert.equal(shift.org_id, SHIFT2.org_id);
                        assert.equal(shift.name, SHIFT2.name);

                        shift2 = shift;

                        callback();
                    }
                );
            },
        // Get all shifts
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + SHIFT1.org_id + '/shifts',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the shift
            (callback) => {
                shift1.name = 'Updated shift 1';
                shift1.type = 'circle';
                shift1.center = { type: 'Point', coordinates: [32, -110] };
                shift1.distance = 5;

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + shift1.org_id + '/shifts/' + shift1.id,
                    shift1,
                    (err, req, res, shift) => {
                        assert.isNull(err);

                        assert.isObject(shift);
                        assert.equal(shift.name, 'Updated shift 1');
                        assert.isNotNull(shift.boundaries);

                        shift1 = shift;

                        callback();
                    }
                );
            },
        // Delete shift
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + shift1.org_id + '/shifts/' + shift1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete shift
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + shift1.org_id + '/shifts/' + shift1.id,
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