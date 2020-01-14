let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { ControlObjectV1 } from 'iqs-clients-controlobjects-node';
import { ControlObjectsDirectClientV1 } from 'iqs-clients-controlobjects-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { ControlObjectsOperationsV1 } from '../../../src/operations/version1/ControlObjectsOperationsV1';

let OBJECT1: ControlObjectV1 = {
    id: '1',
    org_id: '1',
    category: 'person',
    type: 'employee',
    name: 'Object 1',
    description: 'Control object #1',
    device_id: '1',
    group_ids: ['1', '2']
};
let OBJECT2: ControlObjectV1 = {
    id: '2',
    org_id: '1',
    category: 'person',
    type: 'visitor',
    name: 'Object 2',
    description: 'Control object #2',
    device_id: '2',
    group_ids: ['1', '2']
};

suite('ControlObjectsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-controlobjects', 'client', 'direct', 'default', '1.0'), new ControlObjectsDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'control-objects', 'default', '1.0'), new ControlObjectsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform object operations', (done) => {
        let obj1, obj2: ControlObjectV1;

        async.series([
        // Create one object
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + OBJECT1.org_id + '/control_objects',
                    OBJECT1,
                    (err, req, res, obj) => {
                        assert.isNull(err);

                        assert.isObject(obj);
                        assert.equal(obj.name, OBJECT1.name);
                        assert.equal(obj.id, OBJECT1.id);

                        obj1 = obj;

                        callback();
                    }
                );
            },
        // Create another obejct
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + OBJECT2.org_id + '/control_objects', 
                    OBJECT2,
                    (err, req, res, obj) => {
                        assert.isNull(err);

                        assert.isObject(obj);
                        assert.equal(obj.name, OBJECT2.name);
                        assert.equal(obj.id, OBJECT2.id);

                        obj2 = obj;

                        callback();
                    }
                );
            },
        // Get all objects
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + OBJECT1.org_id + '/control_objects',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the object
            (callback) => {
                obj1.name = 'Updated object 1';
                obj1.group_ids = ['1'];

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + obj1.org_id + '/control_objects/' + obj1.id,
                    obj1,
                    (err, req, res, obj) => {
                        assert.isNull(err);

                        assert.isObject(obj);
                        assert.equal(obj.name, 'Updated object 1');
                        assert.sameMembers(obj.group_ids, ['1']);

                        obj1 = obj;

                        callback();
                    }
                );
            },
        // Delete object
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + obj1.org_id + '/control_objects/' + obj1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete object
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + obj1.org_id + '/control_objects/' + obj1.id,
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