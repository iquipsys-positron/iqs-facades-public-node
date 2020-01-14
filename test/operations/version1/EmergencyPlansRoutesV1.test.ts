let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { EmergencyPlanV1 } from 'iqs-clients-emergencyplans-node';
import { EmergencyPlansDirectClientV1 } from 'iqs-clients-emergencyplans-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { EmergencyPlansOperationsV1 } from '../../../src/operations/version1/EmergencyPlansOperationsV1';

let PLAN1: EmergencyPlanV1 = {
    id: '1',
    org_id: '1',
    name: 'Test plan 1',
    steps: []
};
let PLAN2: EmergencyPlanV1 = {
    id: '2',
    org_id: '1',
    name: 'Test plan 2',
    steps: []
};

suite('EmergencyPlansOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-emergencyplans', 'client', 'direct', 'default', '1.0'), new EmergencyPlansDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'emergency-plans', 'default', '1.0'), new EmergencyPlansOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform emergency plans operations', (done) => {
        let plan1, plan2: EmergencyPlanV1;

        async.series([
        // Create one plan
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + PLAN1.org_id + '/emergency_plans',
                    PLAN1,
                    (err, req, res, plan) => {
                        assert.isNull(err);

                        assert.isObject(plan);
                        assert.equal(plan.name, PLAN1.name);
                        assert.equal(plan.id, PLAN1.id);

                        plan1 = plan;

                        callback();
                    }
                );
            },
        // Create another plan
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + PLAN2.org_id + '/emergency_plans', 
                    PLAN2,
                    (err, req, res, plan) => {
                        assert.isNull(err);

                        assert.isObject(plan);
                        assert.equal(plan.name, PLAN2.name);
                        assert.equal(plan.id, PLAN2.id);

                        plan2 = plan;

                        callback();
                    }
                );
            },
        // Get all plans
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + PLAN1.org_id + '/emergency_plans',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the plan
            (callback) => {
                plan1.name = 'Updated plan 1';

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + plan1.org_id + '/emergency_plans/' + plan1.id,
                    plan1,
                    (err, req, res, plan) => {
                        assert.isNull(err);

                        assert.isObject(plan);
                        assert.equal(plan.name, 'Updated plan 1');

                        plan1 = plan;

                        callback();
                    }
                );
            },
        // Delete plan
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + plan1.org_id + '/emergency_plans/' + plan1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete plan
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + plan1.org_id + '/emergency_plans/' + plan1.id,
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