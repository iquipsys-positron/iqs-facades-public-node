let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { EventRuleV1 } from 'iqs-clients-eventrules-node';
import { EventRuleTypeV1 } from 'iqs-clients-eventrules-node';
import { EventRulesDirectClientV1 } from 'iqs-clients-eventrules-node';
import { ResolutionsDirectClientV1 } from 'iqs-clients-resolutions-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { EventRulesOperationsV1 } from '../../../src/operations/version1/EventRulesOperationsV1';

let RULE1: EventRuleV1 = {
    id: '1',
    org_id: '1',
    type: EventRuleTypeV1.Entry,
    name: 'Test rule 1',
    interval: 3600,
    severity: 0
};
let RULE2: EventRuleV1 = {
    id: '2',
    org_id: '1',
    type: EventRuleTypeV1.Disappear,
    name: 'Test rule 2',
    interval: 3600,
    severity: 0
};

suite('EventRulesOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-resolutions', 'client', 'direct', 'default', '1.0'), new ResolutionsDirectClientV1())
        references.put(new Descriptor('iqs-services-eventrules', 'client', 'direct', 'default', '1.0'), new EventRulesDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'rules', 'default', '1.0'), new EventRulesOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform rule operations', (done) => {
        let rule1, rule2: EventRuleV1;

        async.series([
        // Create one rule
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + RULE1.org_id + '/event_rules',
                    RULE1,
                    (err, req, res, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.org_id, RULE1.org_id);
                        assert.equal(rule.type, RULE1.type);
                        assert.equal(rule.name, RULE1.name);

                        rule1 = rule;

                        callback();
                    }
                );
            },
        // Create another rule
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + RULE1.org_id + '/event_rules', 
                    RULE2,
                    (err, req, res, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.org_id, RULE2.org_id);
                        assert.equal(rule.type, RULE2.type);
                        assert.equal(rule.name, RULE2.name);

                        rule2 = rule;

                        callback();
                    }
                );
            },
        // Get all rules
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + RULE1.org_id + '/event_rules',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the rule
            (callback) => {
                rule1.name = 'Updated rule 1';

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + rule1.org_id + '/event_rules/' + rule1.id,
                    rule1,
                    (err, req, res, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.name, 'Updated rule 1');

                        rule1 = rule;

                        callback();
                    }
                );
            },
        // Delete rule
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + rule1.org_id + '/event_rules/' + rule1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete rule
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + rule1.org_id + '/event_rules/' + rule1.id,
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