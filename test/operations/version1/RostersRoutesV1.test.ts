let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { RosterV1 } from 'iqs-clients-rosters-node';
import { RostersDirectClientV1 } from 'iqs-clients-rosters-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { RostersOperationsV1 } from '../../../src/operations/version1/RostersOperationsV1';

let ROSTER1: RosterV1 = {
    id: '1',
    org_id: '1',
    name: 'Test roster 1',
    start_time: new Date(),
    end_time: new Date()
};
let ROSTER2: RosterV1 = {
    id: '2',
    org_id: '1',
    name: 'Test roster 2',
    start_time: new Date(),
    end_time: new Date()
};

suite('RostersOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-rosters', 'client', 'direct', 'default', '1.0'), new RostersDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'rosters', 'default', '1.0'), new RostersOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform roster operations', (done) => {
        let roster1, roster2: RosterV1;

        async.series([
        // Create one roster
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + ROSTER1.org_id + '/rosters',
                    ROSTER1,
                    (err, req, res, roster) => {
                        assert.isNull(err);

                        assert.isObject(roster);
                        assert.equal(roster.org_id, ROSTER1.org_id);
                        assert.equal(roster.name, ROSTER1.name);

                        roster1 = roster;

                        callback();
                    }
                );
            },
        // Create another roster
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + ROSTER2.org_id + '/rosters', 
                    ROSTER2,
                    (err, req, res, roster) => {
                        assert.isNull(err);

                        assert.isObject(roster);
                        assert.equal(roster.org_id, ROSTER2.org_id);
                        assert.equal(roster.name, ROSTER2.name);

                        roster2 = roster;

                        callback();
                    }
                );
            },
        // Get all rosters
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + ROSTER1.org_id + '/rosters',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the roster
            (callback) => {
                roster1.name = 'Updated roster 1';
                roster1.type = 'circle';
                roster1.center = { type: 'Point', coordinates: [32, -110] };
                roster1.distance = 5;

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + roster1.org_id + '/rosters/' + roster1.id,
                    roster1,
                    (err, req, res, roster) => {
                        assert.isNull(err);

                        assert.isObject(roster);
                        assert.equal(roster.name, 'Updated roster 1');
                        assert.isNotNull(roster.boundaries);

                        roster1 = roster;

                        callback();
                    }
                );
            },
        // Delete roster
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + roster1.org_id + '/rosters/' + roster1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete roster
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + roster1.org_id + '/rosters/' + roster1.id,
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