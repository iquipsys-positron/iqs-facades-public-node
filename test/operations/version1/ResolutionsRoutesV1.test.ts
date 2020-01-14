let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { ResolutionsDirectClientV1 } from 'iqs-clients-resolutions-node';
import { ResolutionV1 } from 'iqs-clients-resolutions-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { ResolutionsOperationsV1 } from '../../../src/operations/version1/ResolutionsOperationsV1';

let RESOLUTION1: ResolutionV1 = {
    id: '1',
    org_id: '1',
    rule_ids: ['1'],
    resolution: 'Resolution 1'
};
let RESOLUTION2: ResolutionV1 = {
    id: '2',
    org_id: '1',
    rule_ids: ['2'],
    resolution: 'Resolution 2'
};

suite('ResolutionsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-resolutions', 'client', 'direct', 'default', '1.0'), new ResolutionsDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'resolutions', 'default', '1.0'), new ResolutionsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform resolution operations', (done) => {
        let resolution1, resolution2: ResolutionV1;

        async.series([
        // Create one resolution
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + RESOLUTION1.org_id + '/resolutions',
                    RESOLUTION1,
                    (err, req, res, resolution) => {
                        assert.isNull(err);

                        assert.isObject(resolution);
                        assert.equal(resolution.org_id, RESOLUTION1.org_id);
                        assert.sameMembers(resolution.rule_ids, RESOLUTION1.rule_ids);
                        assert.equal(resolution.resolution, RESOLUTION1.resolution);

                        resolution1 = resolution;

                        callback();
                    }
                );
            },
        // Create another resolution
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + RESOLUTION2.org_id + '/resolutions', 
                    RESOLUTION2,
                    (err, req, res, resolution) => {
                        assert.isNull(err);

                        assert.isObject(resolution);
                        assert.equal(resolution.org_id, RESOLUTION2.org_id);
                        assert.sameMembers(resolution.rule_ids, RESOLUTION2.rule_ids);
                        assert.equal(resolution.resolution, RESOLUTION2.resolution);

                        resolution2 = resolution;

                        callback();
                    }
                );
            },
        // Get all resolutions
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + RESOLUTION1.org_id + '/resolutions',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the resolution
            (callback) => {
                resolution1.resolution = 'Updated resolution 1';

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + resolution1.org_id + '/resolutions/' + resolution1.id,
                    resolution1,
                    (err, req, res, resolution) => {
                        assert.isNull(err);

                        assert.isObject(resolution);
                        assert.equal(resolution.resolution, 'Updated resolution 1');

                        resolution1 = resolution;

                        callback();
                    }
                );
            },
        // Delete resolution
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + resolution1.org_id + '/resolutions/' + resolution1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete resolution
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + resolution1.org_id + '/resolutions/' + resolution1.id,
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