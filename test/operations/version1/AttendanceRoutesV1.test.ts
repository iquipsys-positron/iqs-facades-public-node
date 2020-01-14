let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';

import { AttendanceDirectClientV1 } from 'iqs-clients-attendance-node';

import { AttendanceV1 } from 'iqs-clients-attendance-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { AttendanceOperationsV1 } from '../../../src/operations/version1/AttendanceOperationsV1';
import { MqttGatewayClientFactory } from 'iqs-clients-mqttgateway-node';

let UPDATE1: AttendanceV1 = {
    org_id: '1',
    object_id: '1',
    start_time: new Date(2017,10,18,9,0,0),
    end_time: new Date(2017,10,18,17,0,0)
};
let UPDATE2: AttendanceV1 = {
    org_id: '1',
    object_id: '2',
    start_time: new Date(2017,10,18,10,30,0),
    end_time: new Date(2017,10,18,16,45,0)
};
let UPDATE3: AttendanceV1 = {
    org_id: '1',
    object_id: '1',
    start_time: new Date(2017,10,20,9,0,0),
    end_time: new Date(2017,10,20,17,0,0)
};


suite('AttendanceOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        let factory = new MqttGatewayClientFactory();
        let obj = factory.create(new Descriptor('iqs-services-mqttgateway', 'client', '*', '*', '1.0'));


        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-attendance', 'client', 'direct', 'default', '1.0'), new AttendanceDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'attendance', 'default', '1.0'), new AttendanceOperationsV1())
        references.open(null, (err) => {
            done(err);
        });
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform attendance operations', (done) => {
        async.series([
        // Add one attendance
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + UPDATE1.org_id + '/attendance',
                    UPDATE1,
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get all attendancesz
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + UPDATE1.org_id + '/attendance',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
        // Get attendances within time interval
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + UPDATE1.org_id + '/attendance/within_time'
                        + '?from_time=' + StringConverter.toString(new Date())
                        + '?to_time=' + StringConverter.toString(new Date()),
                    (err, req, res, attendances) => {
                        assert.isNull(err);

                        assert.isObject(attendances);
                        assert.equal(attendances.org_id, UPDATE1.org_id)

                        callback();
                    }
                );
            },
        // Delete attendances
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + UPDATE1.org_id + '/attendance',
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });


});