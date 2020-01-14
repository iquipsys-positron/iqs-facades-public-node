let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { BeaconV1 } from 'pip-clients-beacons-node';
import { BeaconsDirectClientV1 } from 'pip-clients-beacons-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { BeaconsOperationsV1 } from '../../../src/operations/version1/BeaconsOperationsV1';

let BEACON1: BeaconV1 = {
    id: '1',
    udi: '000001',
    org_id: '1',
    label: 'TestBeacon1',
    center: { type: 'Point', coordinates: [0, 0] },
    radius: 50
};
let BEACON2: BeaconV1 = {
    id: '2',
    udi: '000002',
    org_id: '1',
    label: 'TestBeacon2',
    center: { type: 'Point', coordinates: [2, 2] },
    radius: 70
};
let BEACON3: BeaconV1 = {
    id: '3',
    udi: '000003',
    org_id: '2',
    label: 'TestBeacon3',
    center: { type: 'Point', coordinates: [10, 10] },
    radius: 50
};

suite('BeaconsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('pip-services-beacons', 'client', 'direct', 'default', '1.0'), new BeaconsDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'beacons', 'default', '1.0'), new BeaconsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform beacon operations', (done) => {
        let beacon1, beacon2, beacon3: BeaconV1;

        async.series([
        // Create one beacon
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + BEACON1.org_id + '/beacons',
                    BEACON1,
                    (err, req, res, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.org_id, BEACON1.org_id);
                        assert.equal(beacon.udi, BEACON1.udi);
                        assert.equal(beacon.label, BEACON1.label);
                        assert.isNotNull(beacon.center);

                        beacon1 = beacon;

                        callback();
                    }
                );
            },
        // Create another beacon
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + BEACON2.org_id + '/beacons', 
                    BEACON2,
                    (err, req, res, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.org_id, BEACON2.org_id);
                        assert.equal(beacon.udi, BEACON2.udi);
                        assert.equal(beacon.label, BEACON2.label);
                        assert.isNotNull(beacon.center);

                        beacon2 = beacon;

                        callback();
                    }
                );
            },
        // Create yet another beacon
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + BEACON3.org_id + '/beacons', 
                    BEACON3,
                    (err, req, res, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.org_id, BEACON3.org_id);
                        assert.equal(beacon.udi, BEACON3.udi);
                        assert.equal(beacon.label, BEACON3.label);
                        assert.isNotNull(beacon.center);

                        beacon3 = beacon;

                        callback();
                    }
                );
            },
        // Get all beacons
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + BEACON1.org_id + '/beacons',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Calculate positions
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + BEACON1.org_id + '/beacons/calculate_position',
                    {
                        org_id: BEACON1.org_id,
                        udis: [BEACON1.udi]
                    },
                    (err, req, res, position) => {
                        assert.isNull(err);

                        assert.isObject(position);
                        assert.equal(position.type, 'Point');

                        callback();
                    }
                );
            },
            // Validate beacon udi
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + beacon1.org_id + '/beacons/validate_udi?udi=' + beacon1.udi,
                    {},
                    (err, req, res, result) => {
                        assert.isNull(err);

                        assert.equal(result, beacon1.id);

                        callback();
                    }
                );
            },
        // Update the beacon
            (callback) => {
                beacon1.label = 'ABC';

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + beacon1.org_id + '/beacons/' + beacon1.id,
                    beacon1,
                    (err, req, res, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.label, 'ABC');

                        beacon1 = beacon;

                        callback();
                    }
                );
            },
        // Delete beacon
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + beacon1.org_id + '/beacons/' + beacon1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete beacon
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + beacon1.org_id + '/beacons/' + beacon1.id,
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