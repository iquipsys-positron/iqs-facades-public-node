let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { DevicesMemoryClientV1 } from 'iqs-clients-devices-node';
import { DeviceV1 } from 'iqs-clients-devices-node';

import { StatusMessageV1 } from 'iqs-clients-restgateway-node';
import { RestGatewayDirectClientV1 } from 'iqs-clients-restgateway-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { RestGatewayOperationsV1 } from '../../../src/operations/version1/RestGatewayOperationsV1';

let STATUS_MSG1: StatusMessageV1 = {
    device_udi: '111',
    time: new Date(),
    lat: 32,
    lng: -110,
    alt: 750,
    angle: 0,
    speed: 1,
    freezed: false
};

suite('RestGatewayOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();

        let devicesClient = new DevicesMemoryClientV1();
        devicesClient.createDevice(null, { id: '1', org_id: '1', udi: '111', type: 'smartphone', status: 'active' }, () => {});
        devicesClient.createDevice(null, { id: '2', org_id: '1', udi: '222', type: 'smartphone', status: 'active' }, () => {});
        references.put(new Descriptor('iqs-services-devices', 'client', 'memory', 'default', '1.0'), devicesClient);

        references.put(new Descriptor('iqs-services-restgateway', 'client', 'direct', 'default', '1.0'), new RestGatewayDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'rest-gateway', 'default', '1.0'), new RestGatewayOperationsV1());
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should update device status', (done) => {
        rest.postAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/gateway/update_status',
            STATUS_MSG1,
            (err, req, res) => {
                assert.isNull(err);

                done();
            }
        );
    });


});