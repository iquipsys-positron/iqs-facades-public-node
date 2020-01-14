let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { DeviceConfigV1 } from 'iqs-clients-deviceconfigs-node';
import { DeviceConfigsDirectClientV1 } from 'iqs-clients-deviceconfigs-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { DeviceConfigsOperationsV1 } from '../../../src/operations/version1/DeviceConfigsOperationsV1';

let CONFIG1: DeviceConfigV1 = {
    id: '1',
    org_id: '1',
    params: [
        { id: 1, val: 111 },
        { id: 2, val: 222 },
        { id: 3, val: 333 }
    ]
};

suite('DeviceConfigsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-deviceconfigs', 'client', 'direct', 'default', '1.0'), new DeviceConfigsDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'device-configs', 'default', '1.0'), new DeviceConfigsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform device config operations', (done) => {
        let config1, config2: DeviceConfigV1;

        async.series([
        // Set config
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + CONFIG1.org_id + '/devices/configs/' + CONFIG1.id,
                    CONFIG1,
                    (err, req, res, config) => {
                        assert.isNull(err);

                        assert.isObject(config);
                        assert.equal(config.id, CONFIG1.id);
                        assert.equal(config.org_id, CONFIG1.org_id);
                        assert.lengthOf(config.params, CONFIG1.params.length);

                        config1 = config;

                        callback();
                    }
                );
            },
            // Request the config
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + config1.org_id + '/devices/configs/' + config1.id + '/request',
                    config1,
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Send the config
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + config1.org_id + '/devices/configs/' + config1.id + '/send',
                    config1,
                    (err, req, res, config) => {
                        assert.isNull(err);

                        assert.isObject(config);
                        assert.equal(config.id, config1.id);
                        assert.equal(config.org_id, config1.org_id);

                        config1 = config;

                        callback();
                    }
                );
            },
            // Receive the config
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + config1.org_id + '/devices/configs/' + config1.id + '/receive',
                    config1,
                    (err, req, res, config) => {
                        assert.isNull(err);

                        assert.isObject(config);
                        assert.equal(config.id, config1.id);
                        assert.equal(config.org_id, config1.org_id);

                        config1 = config;

                        callback();
                    }
                );
            },
        // Delete config
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + config1.org_id + '/devices/configs/' + config1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete config
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + config1.org_id + '/devices/configs/' + config1.id,
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