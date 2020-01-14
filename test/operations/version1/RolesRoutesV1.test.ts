let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { OrganizationV1 } from 'pip-clients-organizations-node';
import { OrgRolesDirectClientV1 } from 'pip-clients-orgroles-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { TestOrganizations } from '../../fixtures/TestOrganizations';
import { RolesOperationsV1 } from '../../../src/operations/version1/RolesOperationsV1';

suite('RolesOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('pip-services-orgroles', 'client', 'direct', 'default', '1.0'), new OrgRolesDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'roles', 'default', '1.0'), new RolesOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should get organization users', (done) => {
        rest.getAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/organizations/' + TestOrganizations.Organization1Id + '/users',
            (err, req, res, page) => {
                assert.isNull(err);

                assert.isObject(page);
                assert.lengthOf(page.data, 3);

                let roles = page.data[0].roles;
                assert.isArray(roles);
                assert.isTrue(roles.length > 0);

                done();
            }
        );
    });

    test('Grant and Revoke Organization Roles', (done) => {
        async.series([
            // Grant organization role
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + TestOrganizations.Organization1Id + '/roles',
                    {
                        user_id: '123',
                        role: 'manager'
                    },
                    (err, req, res, roles) => {
                        assert.isNull(err);
        
                        assert.isArray(roles);
                        assert.lengthOf(roles, 1);
                        assert.equal('1:manager', roles[0]);
        
                        callback();
                    }
                );
            },
            // Get organization roles
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + TestOrganizations.Organization1Id + '/users',
                    (err, req, res, users) => {
                        assert.isNull(err);
        
                        // assert.isArray(userRoles);
                        // assert.lengthOf(userRoles, 4);
        
                        callback();
                    }
                );
            },
            // Revoke organization role
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + TestOrganizations.Organization1Id + '/roles?user_id=123&role=manager',
                    (err, req, res, roles) => {
                        assert.isNull(err);
        
                        assert.isArray(roles);
                        assert.lengthOf(roles, 0);
        
                        callback();
                    }
                );
            }
        ], done);
    });
    
    test('should connect demo organization', (done) => {
        rest.postAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/organizations/demo/roles?user_id=1',
            null,
            (err, req, res, orgId) => {
                assert.isNull(err);

                assert.isString(orgId);

                done();
            }
        );
    });

});