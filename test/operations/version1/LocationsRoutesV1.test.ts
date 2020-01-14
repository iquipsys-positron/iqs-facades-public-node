let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { LocationV1 } from 'iqs-clients-locations-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { LocationsOperationsV1 } from '../../../src/operations/version1/LocationsOperationsV1';

let LOCATION1: LocationV1 = {
    id: '1',
    org_id: '1',
    name: 'Location 1',
    pos: { type: 'Point', coordinates: [32, -110] }
};
let LOCATION2: LocationV1 = {
    id: '2',
    org_id: '1',
    name: 'Location 2',
    pos: { type: 'Point', coordinates: [33, -110] }
};

suite('LocationsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-facade', 'operations', 'locations', 'default', '1.0'), new LocationsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform location operations', (done) => {
        let location1, location2: LocationV1;

        async.series([
        // Create one location
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + LOCATION1.org_id + '/locations',
                    LOCATION1,
                    (err, req, res, location) => {
                        assert.isNull(err);

                        assert.isObject(location);
                        assert.equal(location.name, LOCATION1.name);
                        assert.equal(location.org_id, LOCATION1.org_id);
                        assert.isNotNull(location.pos);

                        location1 = location;

                        callback();
                    }
                );
            },
        // Create another location
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + LOCATION2.org_id + '/locations', 
                    LOCATION2,
                    (err, req, res, location) => {
                        assert.isNull(err);

                        assert.isObject(location);
                        assert.equal(location.name, LOCATION2.name);
                        assert.equal(location.org_id, LOCATION2.org_id);
                        assert.isNotNull(location.pos);

                        location2 = location;

                        callback();
                    }
                );
            },
        // Get all locations
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + LOCATION1.org_id + '/locations',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the location
            (callback) => {
                location1.name = 'Updated location 1';
                location1.pos = { type: 'Point', coordinates: [33, -120] };

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + location1.org_id + '/locations/' + location1.id,
                    location1,
                    (err, req, res, location) => {
                        assert.isNull(err);

                        assert.isObject(location);
                        assert.equal(location.name, 'Updated location 1');
                        assert.isNotNull(location.pos);

                        location1 = location;

                        callback();
                    }
                );
            },
        // Delete location
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + location1.org_id + '/locations/' + location1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete location
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + location1.org_id + '/locations/' + location1.id,
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