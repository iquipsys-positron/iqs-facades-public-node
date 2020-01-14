let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { DeviceV1 } from 'iqs-clients-devices-node';
import { DevicesDirectClientV1 } from 'iqs-clients-devices-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { DevicesOperationsV1 } from '../../../src/operations/version1/DevicesOperationsV1';

let DEVICE1: DeviceV1 = {
    id: '1',
    org_id: '1',
    udi: '1',
    type: 'smartphone',
    label: '3456',
    status: 'active',
    object_id: '1'
};
let DEVICE2: DeviceV1 = {
    id: '2',
    org_id: '1',
    type: 'smartphone',
    udi: '2',
    label: '2334',
    status: 'active',
    object_id: '1'
};

suite('DevicesOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-devices', 'client', 'direct', 'default', '1.0'), new DevicesDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'devices', 'default', '1.0'), new DevicesOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform device operations', (done) => {
        let device1, device2: DeviceV1;

        async.series([
        // Create one device
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + DEVICE1.org_id + '/devices',
                    DEVICE1,
                    (err, req, res, device) => {
                        assert.isNull(err);

                        assert.isObject(device);
                        assert.equal(device.label, DEVICE1.label);
                        assert.equal(device.org_id, DEVICE1.org_id);
                        assert.isNotNull(device.pos);

                        device1 = device;

                        callback();
                    }
                );
            },
        // Create another device
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + DEVICE2.org_id + '/devices', 
                    DEVICE2,
                    (err, req, res, device) => {
                        assert.isNull(err);

                        assert.isObject(device);
                        assert.equal(device.label, DEVICE2.label);
                        assert.equal(device.org_id, DEVICE2.org_id);
                        assert.isNotNull(device.pos);

                        device2 = device;

                        callback();
                    }
                );
            },
        // Get all devices
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + DEVICE1.org_id + '/devices',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Validate device udi
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + device1.org_id + '/devices/validate_udi?udi=' + device1.udi + '&org_id=' + device1.org_id,
                    {},
                    (err, req, res, result) => {
                        assert.isNull(err);

                        assert.equal(result, device1.id);

                        callback();
                    }
                );
            },
        // Update the device
            (callback) => {
                device1.label = 'Updated device 1';
                device1.pos = { type: 'Point', coordinates: [33, -120] };

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + device1.org_id + '/devices/' + device1.id,
                    device1,
                    (err, req, res, device) => {
                        assert.isNull(err);

                        assert.isObject(device);
                        assert.equal(device.label, 'Updated device 1');
                        assert.isNotNull(device.pos);

                        device1 = device;

                        callback();
                    }
                );
            },
        // Delete device
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + device1.org_id + '/devices/' + device1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete device
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + device1.org_id + '/devices/' + device1.id,
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