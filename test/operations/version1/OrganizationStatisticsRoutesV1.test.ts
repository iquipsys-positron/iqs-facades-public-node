let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { IStatisticsClientV1 } from 'iqs-clients-statistics-node';

import { OrganizationV1 } from 'pip-clients-organizations-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { OrganizationStatisticsOperationsV1 } from '../../../src/operations/version1/OrganizationStatisticsOperationsV1';

suite('OrganizationStatisticsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;
    let statisticsClient: IStatisticsClientV1;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-facade', 'operations', 'organization-statistics', 'default', '1.0'), new OrganizationStatisticsOperationsV1())
        statisticsClient = references.getOneRequired<IStatisticsClientV1>(
            new Descriptor('iqs-services-statistics', 'client', '*', '*', '*')
        );
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should update statistic counters as admin', (done) => {
        rest.postAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/organizations/1/statistics/test?group=1&name=test&value=1&time=20180101T00:00:00.00Z&timezone=UTC',
            null,
            (err, req, res) => {
                assert.isNull(err);

                done();
            }
        );
    });

    test('should get user statistics', (done) => {
        async.series([
            (callback) => {
                statisticsClient.incrementCounter(
                    null, '1', '1', 'test', new Date(), 'UTC', 1, callback
                );
            },
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/statistics/test?type=0',
                    (err, req, res, set) => {
                        assert.isNull(err);

                        assert.isObject(set);
                        assert.lengthOf(set.values, 1);
                        assert.equal(1, set.values[0].value);

                        callback();
                    }
                );
            },
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/organizations/1/statistics?type=0',
                    (err, req, res, sets) => {
                        assert.isNull(err);

                        assert.isArray(sets);
                        assert.lengthOf(sets, 1);

                        callback();
                    }
                );
            }
        ], done)
    });

});