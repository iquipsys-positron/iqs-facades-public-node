let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { OrganizationsMemoryClientV1 } from 'pip-clients-organizations-node';
import { DevicesMemoryClientV1 } from 'iqs-clients-devices-node';
import { DeviceV1 } from 'iqs-clients-devices-node';

import { StateUpdateV1 } from 'iqs-clients-stateupdates-node';
import { StateUpdatesDirectClientV1 } from 'iqs-clients-stateupdates-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { StateUpdatesOperationsV1 } from '../../../src/operations/version1/StateUpdatesOperationsV1';

let STATE1: StateUpdateV1 = {
    org_id: '1',
    device_id: '1',
    time: new Date(),
    lat: 32,
    lng: -110,
    alt: 750,
    angle: 0,
    speed: 1,
    freezed: false
};
let STATE2: StateUpdateV1 = {
    org_id: '1',
    device_id: '2',
    time: new Date(),
    lat: 33,
    lng: -111,
    alt: 750,
    angle: 0,
    speed: 1,
    freezed: false
};

suite('StateUpdatesOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();

        let organizationsClient = new OrganizationsMemoryClientV1();
        organizationsClient.createOrganization(null, { id: '1', name: 'Test organization', active: true }, () => {});
        references.put(new Descriptor('pip-services-organizations', 'client', 'memory', 'default', '1.0'), organizationsClient);

        let devicesClient = new DevicesMemoryClientV1();
        devicesClient.createDevice(null, { id: '1', org_id: '1', object_id: '1', udi: '111', type: 'smartphone', status: 'active' }, () => {});
        devicesClient.createDevice(null, { id: '2', org_id: '1', object_id: '2', udi: '222', type: 'smartphone', status: 'active' }, () => {});
        references.put(new Descriptor('iqs-services-devices', 'client', 'memory', 'default', '1.0'), devicesClient);

        references.put(new Descriptor('iqs-services-stateupdates', 'client', 'direct', 'default', '1.0'), new StateUpdatesDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'state-updates', 'default', '1.0'), new StateUpdatesOperationsV1());
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should state object states', (done) => {
        rest.postAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/organizations/' + STATE1.org_id + '/state_updates',
            STATE1,
            (err, req, res, state) => {
                assert.isNull(err);

                assert.isObject(state);
                assert.equal(state.org_id, STATE1.org_id);
                assert.equal(state.online, 1);
                assert.equal(state.freezed, 0);

                done();
            }
        );
    });
    

});