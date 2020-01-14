let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { OrganizationV1 } from 'pip-clients-organizations-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { OrganizationsOperationsV1 } from '../../../src/operations/version1/OrganizationsOperationsV1';

let ORG1: OrganizationV1 = {
    id: '2',
    code: '111',
    name: 'Organization #1',
    description: 'Test organization #1',
    create_time: new Date(),
    creator_id: '123',
    active: true
};
let ORG2: OrganizationV1 = {
    id: '3',
    code: '222',
    name: 'Organization #2',
    description: 'Test organization #2',
    create_time: new Date(),
    creator_id: '123',
    active: true
};

suite('OrganizationsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-facade', 'operations', 'organizations', 'default', '1.0'), new OrganizationsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform organization operations', (done) => {
        let organization1, organization2: OrganizationV1;

        async.series([
        // Create one organization
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations',
                    ORG1,
                    (err, req, res, organization) => {
                        assert.isNull(err);

                        assert.isObject(organization);
                        assert.equal(organization.name, ORG1.name);
                        assert.equal(organization.description, ORG1.description);

                        organization1 = organization;

                        callback();
                    }
                );
            },
        // Create another organization
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations', 
                    ORG2,
                    (err, req, res, organization) => {
                        assert.isNull(err);

                        assert.isObject(organization);
                        assert.equal(organization.name, ORG2.name);
                        assert.equal(organization.description, ORG2.description);

                        organization2 = organization;

                        callback();
                    }
                );
            },
        // Get all organizations
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        // Account for 1 test organization
                        assert.lengthOf(page.data, 3);

                        callback();
                    }
                );
            },
        // Find organization by code
            (callback) => {
                rest.get(
                    '/api/v1/organizations/find_by_code?code=' + organization1.code,
                    (err, req, res, organization) => {
                        assert.isNull(err);

                        assert.isObject(organization);
                        assert.equal(organization.id, organization1.id);

                        callback();
                    }
                );
            },
        // Validate organization code
        (callback) => {
            rest.postAsUser(
                TestUsers.AdminUserSessionId,
                '/api/v1/organizations/validate_code?code=' + organization1.code,
                {},
                (err, req, res, result) => {
                    assert.isNull(err);

                    assert.equal(result, organization1.id);

                    callback();
                }
            );
        },
    // Generate code
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + organization1.id + '/generate_code',
                    {},
                    (err, req, res, result) => {
                        assert.isNull(err);

                        assert.isNotNull(result);

                        callback();
                    }
                );
            },
        // Update the organization
            (callback) => {
                organization1.description = 'Updated Content 1';
                organization1.center = { type: 'Point', coordinates: [32, -110] };
                organization1.radius = 5;

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + organization1.id,
                    organization1,
                    (err, req, res, organization) => {
                        assert.isNull(err);

                        assert.isObject(organization);
                        assert.equal(organization.description, 'Updated Content 1');
                        assert.equal(organization.name, organization1.name);
                        assert.isNotNull(organization.boundaries);
                        assert.isNotNull(organization.geometry);

                        organization1 = organization;

                        callback();
                    }
                );
            },
        // Delete organization
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + organization1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete organization
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + organization1.id,
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