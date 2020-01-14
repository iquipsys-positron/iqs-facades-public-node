let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { IncidentsDirectClientV1 } from 'iqs-clients-incidents-node';
import { IncidentV1 } from 'iqs-clients-incidents-node';
import { SeverityV1 } from 'iqs-clients-incidents-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { IncidentsOperationsV1 } from '../../../src/operations/version1/IncidentsOperationsV1';

let INCIDENT1: IncidentV1 = {
    id: '1',
    org_id: '1',
    create_time: new Date(),
    closed: false,
    time: new Date(),
    rule_id: '1',
    event_id: '1',
    object_id: '1',
    severity: SeverityV1.Medium,
    description: 'Test incident #1'
};
let INCIDENT2: IncidentV1 = {
    id: '2',
    org_id: '1',
    create_time: new Date(),
    closed: false,
    time: new Date(),
    rule_id: '1',
    event_id: '2',
    severity: SeverityV1.High,
    description: 'Test incident #2'
};

suite('IncidentsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-incidents', 'client', 'direct', 'default', '1.0'), new IncidentsDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'incidents', 'default', '1.0'), new IncidentsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform incident operations', (done) => {
        let incident1, incident2: IncidentV1;

        async.series([
        // Create one incident
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + INCIDENT1.org_id + '/incidents',
                    INCIDENT1,
                    (err, req, res, incident) => {
                        assert.isNull(err);

                        assert.isObject(incident);
                        assert.equal(incident.org_id, INCIDENT1.org_id);
                        assert.equal(incident.rule_id, INCIDENT1.rule_id);
                        assert.equal(incident.description, INCIDENT1.description);

                        incident1 = incident;

                        callback();
                    }
                );
            },
        // Create another incident
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + INCIDENT2.org_id + '/incidents', 
                    INCIDENT2,
                    (err, req, res, incident) => {
                        assert.isNull(err);

                        assert.isObject(incident);
                        assert.equal(incident.org_id, INCIDENT2.org_id);
                        assert.equal(incident.rule_id, INCIDENT2.rule_id);
                        assert.equal(incident.description, INCIDENT2.description);

                        incident2 = incident;

                        callback();
                    }
                );
            },
        // Get all incidents
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + INCIDENT1.org_id + '/incidents',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Get all incidents count
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + INCIDENT1.org_id + '/incidents/count',
                    (err, req, res, count) => {
                        assert.isNull(err);

                        assert.equal(2, count);

                        callback();
                    }
                );
            },
        // Close the incident
            (callback) => {
                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + incident1.org_id + '/incidents/' + incident1.id,
                    {
                        resolution: 'Test resolution',
                        resolution_id: '1'
                    },
                    (err, req, res, incident) => {
                        assert.isNull(err);

                        assert.isObject(incident);
                        assert.equal(incident.resolution, 'Test resolution');
                        assert.isTrue(incident.closed);
                        assert.equal(incident.resolution_id, '1');

                        incident1 = incident;

                        callback();
                    }
                );
            },
        // Delete incident
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + incident1.org_id + '/incidents/' + incident1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete incident
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/' + incident1.org_id + '/incidents/' + incident1.id,
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