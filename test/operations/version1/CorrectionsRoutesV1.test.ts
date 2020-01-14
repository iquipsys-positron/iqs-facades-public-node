let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { CorrectionV1 } from 'iqs-clients-corrections-node';
import { CorrectionStatusV1 } from 'iqs-clients-corrections-node';
import { CorrectionsDirectClientV1 } from 'iqs-clients-corrections-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { CorrectionsOperationsV1 } from '../../../src/operations/version1/CorrectionsOperationsV1';

let CORRECTION1: CorrectionV1 = {
    id: '1',
    org_id: '1',
    status: CorrectionStatusV1.Requested,
    object_id: '1',
    time: new Date()
};
let CORRECTION2: CorrectionV1 = {
    id: '2',
    org_id: '1',
    status: CorrectionStatusV1.Approved,
    object_id: '1',
    time: new Date()
};

suite('CorrectionsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-corrections', 'client', 'direct', 'default', '1.0'), new CorrectionsDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'corrections', 'default', '1.0'), new CorrectionsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform correction operations', (done) => {
        let correction1, correction2: CorrectionV1;

        async.series([
        // Create one correction
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + CORRECTION1.org_id + '/corrections',
                    CORRECTION1,
                    (err, req, res, correction) => {
                        assert.isNull(err);

                        assert.isObject(correction);
                        assert.equal(correction.org_id, CORRECTION1.org_id);
                        assert.equal(correction.status, CORRECTION1.status);
                        assert.equal(correction.object_id, CORRECTION1.object_id);

                        correction1 = correction;

                        callback();
                    }
                );
            },
        // Create another correction
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + CORRECTION2.org_id + '/corrections', 
                    CORRECTION2,
                    (err, req, res, correction) => {
                        assert.isNull(err);

                        assert.isObject(correction);
                        assert.equal(correction.org_id, CORRECTION2.org_id);
                        assert.equal(correction.status, CORRECTION2.status);
                        assert.equal(correction.object_id, CORRECTION2.object_id);

                        correction2 = correction;

                        callback();
                    }
                );
            },
        // Get all corrections
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + CORRECTION1.org_id + '/corrections',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the correction
            (callback) => {
                correction1.name = 'Updated correction 1';
                correction1.type = 'circle';
                correction1.center = { type: 'Point', coordinates: [32, -110] };
                correction1.distance = 5;

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + correction1.org_id + '/corrections/' + correction1.id,
                    correction1,
                    (err, req, res, correction) => {
                        assert.isNull(err);

                        assert.isObject(correction);
                        assert.equal(correction.name, 'Updated correction 1');
                        assert.isNotNull(correction.boundaries);

                        correction1 = correction;

                        callback();
                    }
                );
            },
        // Delete correction
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + correction1.org_id + '/corrections/' + correction1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete correction
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + correction1.org_id + '/corrections/' + correction1.id,
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