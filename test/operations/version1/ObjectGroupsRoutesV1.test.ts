let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { ObjectGroupV1 } from 'iqs-clients-objectgroups-node';
import { ObjectGroupsDirectClientV1 } from 'iqs-clients-objectgroups-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { ObjectGroupsOperationsV1 } from '../../../src/operations/version1/ObjectGroupsOperationsV1';

let GROUP1: ObjectGroupV1 = {
    id: '1',
    org_id: '1',
    name: 'Group 1',
    object_ids: ['1', '2'],
};
let GROUP2: ObjectGroupV1 = {
    id: '2',
    org_id: '1',
    name: 'Group 2',
    object_ids: ['2', '3'],
};

suite('ObjectGroupsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-objectgroups', 'client', 'direct', 'default', '1.0'), new ObjectGroupsDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'objectgroups', 'default', '1.0'), new ObjectGroupsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform group operations', (done) => {
        let group1, group2: ObjectGroupV1;

        async.series([
        // Create one group
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + GROUP1.org_id + '/object_groups',
                    GROUP1,
                    (err, req, res, group) => {
                        assert.isNull(err);

                        assert.isObject(group);
                        assert.equal(group.name, GROUP1.name);
                        assert.equal(group.id, GROUP1.id);

                        group1 = group;

                        callback();
                    }
                );
            },
        // Create another group
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + GROUP2.org_id + '/object_groups', 
                    GROUP2,
                    (err, req, res, group) => {
                        assert.isNull(err);

                        assert.isObject(group);
                        assert.equal(group.name, GROUP2.name);
                        assert.equal(group.id, GROUP2.id);

                        group2 = group;

                        callback();
                    }
                );
            },
        // Get all groups
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + GROUP1.org_id + '/object_groups',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the group
            (callback) => {
                group1.name = 'Updated group 1';
                group1.object_ids = ['1'];

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + group1.org_id + '/object_groups/' + group1.id,
                    group1,
                    (err, req, res, group) => {
                        assert.isNull(err);

                        assert.isObject(group);
                        assert.equal(group.name, 'Updated group 1');
                        assert.sameMembers(group.object_ids, ['1']);

                        group1 = group;

                        callback();
                    }
                );
            },
        // Delete group
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + group1.org_id + '/object_groups/' + group1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete group
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + group1.org_id + '/object_groups/' + group1.id,
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