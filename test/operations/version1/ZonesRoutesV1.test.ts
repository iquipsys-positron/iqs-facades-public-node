let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { ZoneV1 } from 'iqs-clients-zones-node';
import { ZonesDirectClientV1 } from 'iqs-clients-zones-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { ZonesOperationsV1 } from '../../../src/operations/version1/ZonesOperationsV1';

let ZONE1: ZoneV1 = {
    id: '1',
    org_id: '1',
    type: 'line',
    name: 'Test zone 1',
    geometry: { type: 'LineString', coordinates: [[0, 0], [1, 1]] },
};
let ZONE2: ZoneV1 = {
    id: '2',
    org_id: '1',
    type: 'circle',
    name: 'Test zone 2',
    center: { type: 'Point', coordinates: [1, 1] },
};
let ZONE3: ZoneV1 = {
    id: '3',
    org_id: '1',
    type: 'polygon',
    name: 'Test zone 3',
    geometry: '{"type": "Polygon", "coordinates": [[[32.332407646162665, -110.89171528816223], [32.331709605245905, -110.89171528816223], [32.33234418811992, -110.89113593101501]]]}'
};

suite('ZonesOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-zones', 'client', 'direct', 'default', '1.0'), new ZonesDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'zones', 'default', '1.0'), new ZonesOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform zone operations', (done) => {
        let zone1, zone2, zone3: ZoneV1;

        async.series([
        // Create one zone
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + ZONE1.org_id + '/zones',
                    ZONE1,
                    (err, req, res, zone) => {
                        assert.isNull(err);

                        assert.isObject(zone);
                        assert.equal(zone.org_id, ZONE1.org_id);
                        assert.equal(zone.type, ZONE1.type);
                        assert.equal(zone.name, ZONE1.name);
                        assert.isNotNull(zone.geometry);
                        assert.isNotNull(zone.center);
                        assert.isNotNull(zone.boundaries);

                        zone1 = zone;

                        callback();
                    }
                );
            },
        // Create another zone
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + ZONE2.org_id + '/zones', 
                    ZONE2,
                    (err, req, res, zone) => {
                        assert.isNull(err);

                        assert.isObject(zone);
                        assert.equal(zone.org_id, ZONE2.org_id);
                        assert.equal(zone.type, ZONE2.type);
                        assert.equal(zone.name, ZONE2.name);
                        assert.isNotNull(zone.geometry);
                        assert.isNotNull(zone.center);
                        assert.isNotNull(zone.boundaries);

                        zone2 = zone;

                        callback();
                    }
                );
            },
        // Create yet another zone
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + ZONE3.org_id + '/zones', 
                    ZONE3,
                    (err, req, res, zone) => {
                        assert.isNull(err);

                        assert.isObject(zone);
                        assert.equal(zone.org_id, ZONE3.org_id);
                        assert.equal(zone.type, ZONE3.type);
                        assert.equal(zone.name, ZONE3.name);
                        assert.isNotNull(zone.geometry);
                        assert.isNotNull(zone.center);
                        assert.isNotNull(zone.boundaries);

                        zone3 = zone;

                        callback();
                    }
                );
            },
        // Get all zones
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + ZONE1.org_id + '/zones',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        callback();
                    }
                );
            },
        // Update the zone
            (callback) => {
                zone1.name = 'Updated zone 1';
                zone1.type = 'circle';
                zone1.center = { type: 'Point', coordinates: [32, -110] };
                zone1.distance = 5;

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + zone1.org_id + '/zones/' + zone1.id,
                    zone1,
                    (err, req, res, zone) => {
                        assert.isNull(err);

                        assert.isObject(zone);
                        assert.equal(zone.name, 'Updated zone 1');
                        assert.isNotNull(zone.boundaries);

                        zone1 = zone;

                        callback();
                    }
                );
            },
        // Delete zone
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + zone1.org_id + '/zones/' + zone1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete zone
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + zone1.org_id + '/zones/' + zone1.id,
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