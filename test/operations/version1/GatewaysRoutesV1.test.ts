let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { GatewayV1 } from 'iqs-clients-gateways-node';
import { GatewaysDirectClientV1 } from 'iqs-clients-gateways-node';
import { MqttGatewayNullClientV1 } from 'iqs-clients-mqttgateway-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { GatewaysOperationsV1 } from '../../../src/operations/version1/GatewaysOperationsV1';

let GATEWAY1: GatewayV1 = {
    id: '1',
    org_id: '1',
    udi: '1',
    model: 'MCTD',
    label: '3456',
    active: true
};
let GATEWAY2: GatewayV1 = {
    id: '2',
    org_id: '1',
    model: 'MCTD',
    udi: '2',
    label: '2334',
    active: true
};

suite('GatewaysOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-gateways', 'client', 'direct', 'default', '1.0'), new GatewaysDirectClientV1())
        references.put(new Descriptor('iqs-services-mqttgateway', 'client', 'null', 'default', '1.0'), new MqttGatewayNullClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'gateways', 'default', '1.0'), new GatewaysOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform gateway operations', (done) => {
        let gateway1, gateway2: GatewayV1;

        async.series([
        // Create one gateway
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + GATEWAY1.org_id + '/gateways',
                    GATEWAY1,
                    (err, req, res, gateway) => {
                        assert.isNull(err);

                        assert.isObject(gateway);
                        assert.equal(gateway.label, GATEWAY1.label);
                        assert.equal(gateway.org_id, GATEWAY1.org_id);
                        assert.isNotNull(gateway.pos);

                        gateway1 = gateway;

                        callback();
                    }
                );
            },
        // Create another gateway
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + GATEWAY2.org_id + '/gateways', 
                    GATEWAY2,
                    (err, req, res, gateway) => {
                        assert.isNull(err);

                        assert.isObject(gateway);
                        assert.equal(gateway.label, GATEWAY2.label);
                        assert.equal(gateway.org_id, GATEWAY2.org_id);
                        assert.isNotNull(gateway.pos);

                        gateway2 = gateway;

                        callback();
                    }
                );
            },
        // Get all gateways
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + GATEWAY1.org_id + '/gateways',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Validate gateway udi
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + gateway1.org_id + '/gateways/validate_udi?udi=' + gateway1.udi,
                    {},
                    (err, req, res, result) => {
                        assert.isNull(err);

                        assert.equal(result, gateway1.id);

                        callback();
                    }
                );
            },
        // Update the gateway
            (callback) => {
                gateway1.label = 'Updated gateway 1';
                gateway1.pos = { type: 'Point', coordinates: [33, -120] };

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + gateway1.org_id + '/gateways/' + gateway1.id,
                    gateway1,
                    (err, req, res, gateway) => {
                        assert.isNull(err);

                        assert.isObject(gateway);
                        assert.equal(gateway.label, 'Updated gateway 1');
                        assert.isNotNull(gateway.pos);

                        gateway1 = gateway;

                        callback();
                    }
                );
            },
            // Ping gateway
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + gateway1.org_id + '/gateways/' + gateway1.id + '/ping',
                    {},
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
            // Request statistics
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + gateway1.org_id + '/gateways/' + gateway1.id + '/request_stats',
                    {},
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
            // Delete gateway
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + gateway1.org_id + '/gateways/' + gateway1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete gateway
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + gateway1.org_id + '/gateways/' + gateway1.id,
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