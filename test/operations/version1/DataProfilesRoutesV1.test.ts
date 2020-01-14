let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { DataProfileV1 } from 'iqs-clients-dataprofiles-node';
import { DataProfilesDirectClientV1 } from 'iqs-clients-dataprofiles-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { DataProfilesOperationsV1 } from '../../../src/operations/version1/DataProfilesOperationsV1';

let PROFILE: DataProfileV1 = {
    id: '1',
    param_types: [{
        id: 100,
        name: 'Param 1',
        value_type: 'int',
        algorithm: 'custom'
    }],
    event_types: [{
        id: 100,
        name: 'Event 1',
        value_type: 'int',
        algorithm: 'custom'
    }],
    command_types: [{
        id: 100,
        name: 'Command 1',
        value_type: 'int',
        algorithm: 'custom'
    }],
    state_types: [{
        id: 100,
        name: 'State 1',
        algorithm: 'custom'
    }]
};

suite('DataProfilesOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-dataprofiles', 'client', 'direct', 'default', '1.0'), new DataProfilesDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'data-profiles', 'default', '1.0'), new DataProfilesOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform data profile operations', (done) => {
        async.series([
        // Set one profile
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + PROFILE.id + '/data_profiles',
                    PROFILE,
                    (err, req, res, profile) => {
                        assert.isNull(err);

                        assert.isObject(profile);
                        assert.equal(profile.id, PROFILE.id);
                        assert.isTrue(profile.param_types.length > 1);
                        assert.isTrue(profile.event_types.length > 1);
                        assert.isTrue(profile.command_types.length > 1);
                        assert.isTrue(profile.state_types.length > 1);

                        callback();
                    }
                );
            },
        // Get and check data profile
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + PROFILE.id + '/data_profiles',
                    (err, req, res, profile) => {
                        assert.isNull(err);

                        assert.isObject(profile);
                        assert.equal(profile.id, PROFILE.id);
                        assert.isTrue(profile.param_types.length > 1);
                        assert.isTrue(profile.event_types.length > 1);
                        assert.isTrue(profile.command_types.length > 1);
                        assert.isTrue(profile.state_types.length > 1);

                        callback();
                    }
                );
            }
        ], done);
    });

});