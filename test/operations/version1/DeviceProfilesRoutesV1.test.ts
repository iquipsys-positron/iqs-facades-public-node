let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { DeviceProfileV1 } from 'iqs-clients-deviceprofiles-node';
import { DeviceProfilesDirectClientV1 } from 'iqs-clients-deviceprofiles-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { DeviceProfilesOperationsV1 } from '../../../src/operations/version1/DeviceProfilesOperationsV1';

let PROFILE1: DeviceProfileV1 = {
    id: '1',
    org_id: '1',
    base_profile_id: 'custom',
    name: 'Test profile 1',
    params: [],
    events: []
};
let PROFILE2: DeviceProfileV1 = {
    id: '2',
    org_id: '1',
    base_profile_id: 'custom',
    name: 'Test profile 2',
    params: [],
    events: []
};

suite('DeviceProfilesOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-deviceprofiles', 'client', 'direct', 'default', '1.0'), new DeviceProfilesDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'device-profiles', 'default', '1.0'), new DeviceProfilesOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform device profile operations', (done) => {
        let profile1, profile2: DeviceProfileV1;

        async.series([
        // Create one profile
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + PROFILE1.org_id + '/devices/profiles',
                    PROFILE1,
                    (err, req, res, profile) => {
                        assert.isNull(err);

                        assert.isObject(profile);
                        assert.equal(profile.name, PROFILE1.name);
                        assert.equal(profile.org_id, PROFILE1.org_id);
                        assert.isNotNull(profile.pos);

                        profile1 = profile;

                        callback();
                    }
                );
            },
        // Create another profile
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + PROFILE2.org_id + '/devices/profiles', 
                    PROFILE2,
                    (err, req, res, profile) => {
                        assert.isNull(err);

                        assert.isObject(profile);
                        assert.equal(profile.name, PROFILE2.name);
                        assert.equal(profile.org_id, PROFILE2.org_id);
                        assert.isNotNull(profile.pos);

                        profile2 = profile;

                        callback();
                    }
                );
            },
        // Get all profiles
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + PROFILE1.org_id + '/devices/profiles',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the profile
            (callback) => {
                profile1.name = 'Updated profile 1';

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + profile1.org_id + '/devices/profiles/' + profile1.id,
                    profile1,
                    (err, req, res, profile) => {
                        assert.isNull(err);

                        assert.isObject(profile);
                        assert.equal(profile.name, 'Updated profile 1');

                        profile1 = profile;

                        callback();
                    }
                );
            },
        // Delete profile
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + profile1.org_id + '/devices/profiles/' + profile1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete profile
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + profile1.org_id + '/devices/profiles/' + profile1.id,
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