let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { EventTemplateV1 } from 'iqs-clients-eventtemplates-node';
import { SeverityV1 } from 'iqs-clients-eventtemplates-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { EventTemplatesOperationsV1 } from '../../../src/operations/version1/EventTemplatesOperationsV1';

let TEMPLATE1: EventTemplateV1 = {
    id: '1',
    org_id: '1',
    severity: SeverityV1.Medium,
    description: 'Event template #1'
};
let TEMPLATE2: EventTemplateV1 = {
    id: '2',
    org_id: '1',
    severity: SeverityV1.High,
    description: 'Event template #2'
};

suite('EventTemplatesOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-facade', 'operations', 'event-templates', 'default', '1.0'), new EventTemplatesOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform template operations', (done) => {
        let template1, template2: EventTemplateV1;

        async.series([
        // Create one template
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + TEMPLATE1.org_id + '/event_templates',
                    TEMPLATE1,
                    (err, req, res, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.org_id, TEMPLATE1.org_id);
                        assert.equal(template.severity, TEMPLATE1.severity);
                        assert.equal(template.description, TEMPLATE1.description);

                        template1 = template;

                        callback();
                    }
                );
            },
        // Create another template
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + TEMPLATE2.org_id + '/event_templates', 
                    TEMPLATE2,
                    (err, req, res, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.org_id, TEMPLATE2.org_id);
                        assert.equal(template.severity, TEMPLATE2.severity);
                        assert.equal(template.description, TEMPLATE2.description);

                        template2 = template;

                        callback();
                    }
                );
            },
        // Get all templates
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + TEMPLATE1.org_id + '/event_templates',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the template
            (callback) => {
                template1.description = 'Updated template 1';

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + template1.org_id + '/event_templates/' + template1.id,
                    template1,
                    (err, req, res, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.description, 'Updated template 1');

                        template1 = template;

                        callback();
                    }
                );
            },
        // Delete template
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + template1.org_id + '/event_templates/' + template1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete template
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + template1.org_id + '/event_templates/' + template1.id,
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