let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { ServiceAgreementsDirectClientV1 } from 'iqs-clients-agreements-node';
import { ServiceAgreementV1 } from 'iqs-clients-agreements-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { ServiceAgreementsOperationsV1 } from '../../../src/operations/version1/ServiceAgreementsOperationsV1';

let AGREEMENT1: ServiceAgreementV1 = {
    id: '1',
    number: 'A',
    create_time: new Date(),
    active: true,
    start_time: new Date(2017, 2, 1),
    end_time: new Date(2017, 3, 1),
    company: 'Company 1'
};
let AGREEMENT2: ServiceAgreementV1 = {
    id: '2',
    number: 'B',
    create_time: new Date(),
    active: true,
    start_time: new Date(2017, 2, 1),
    end_time: new Date(2017, 3, 1),
    company: 'Company 2'
};

suite('ServiceAgreementsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('iqs-services-agreements', 'client', 'direct', 'default', '1.0'), new ServiceAgreementsDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'agreements', 'default', '1.0'), new ServiceAgreementsOperationsV1())
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform agreement operations', (done) => {
        let agreement1, agreement2: ServiceAgreementV1;

        async.series([
        // Create one agreement
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/agreements',
                    AGREEMENT1,
                    (err, req, res, agreement) => {
                        assert.isNull(err);

                        assert.isObject(agreement);
                        assert.equal(agreement.number, AGREEMENT1.number);
                        assert.equal(agreement.active, AGREEMENT1.active);
                        assert.equal(agreement.company, AGREEMENT1.company);

                        agreement1 = agreement;

                        callback();
                    }
                );
            },
        // Create another agreement
            (callback) => {
                rest.postAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/agreements', 
                    AGREEMENT2,
                    (err, req, res, agreement) => {
                        assert.isNull(err);

                        assert.isObject(agreement);
                        assert.equal(agreement.number, AGREEMENT2.number);
                        assert.equal(agreement.active, AGREEMENT2.active);
                        assert.equal(agreement.company, AGREEMENT2.company);

                        agreement2 = agreement;

                        callback();
                    }
                );
            },
        // Get all agreements
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/agreements',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Verify agreement
        (callback) => {
            rest.getAsUser(
                TestUsers.User1SessionId,
                '/api/v1/agreements/verify?number=' + AGREEMENT1.number,
                (err, req, res, result) => {
                    assert.isNull(err);

                    console.log(err);
                    console.log(result);
                    assert.isTrue(result);

                    callback();
                }
            );
        },
    // Update the agreement
            (callback) => {
                agreement1.number = 'A1';

                rest.putAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/agreements/' + agreement1.id,
                    agreement1,
                    (err, req, res, agreement) => {
                        assert.isNull(err);

                        assert.isObject(agreement);
                        assert.equal(agreement.number, 'A1');
                        assert.equal(agreement.id, agreement1.id);

                        agreement1 = agreement;

                        callback();
                    }
                );
            },
        // Delete agreement
            (callback) => {
                rest.delAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/agreements/' + agreement1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete agreement
            (callback) => {
                rest.getAsUser(
                    TestUsers.AdminUserSessionId,
                    '/api/v1/agreements/' + agreement1.id,
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