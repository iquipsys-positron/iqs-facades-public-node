let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { CurrentObjectStateV1 } from 'iqs-clients-currobjectstates-node';
import { CurrentObjectStatesDirectClientV1 } from 'iqs-clients-currobjectstates-node';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { CurrentObjectStatesOperationsV1 } from '../../../src/operations/version1/CurrentObjectStatesOperationsV1';

suite('CurrentObjectStatesOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup((done) => {
        rest = new TestRestClient();
        references = new TestReferences();

        references.put(new Descriptor('iqs-services-currobjectstates', 'client', 'direct', 'default', '1.0'), new CurrentObjectStatesDirectClientV1())
        references.put(new Descriptor('iqs-services-facade', 'operations', 'curr-object-states', 'default', '1.0'), new CurrentObjectStatesOperationsV1());
        references.open(null, done);
    });

    teardown((done) => {
        references.close(null, done);
    });

    test('should perform state operations', (done) => {
        let state1, state2: CurrentObjectStateV1;

        async.series([
        // Get all states
            (callback) => {
                rest.getAsUser(
                    TestUsers.User2SessionId,
                    '/api/v1/organizations/1/curr_object_states',
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        //assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    });


});