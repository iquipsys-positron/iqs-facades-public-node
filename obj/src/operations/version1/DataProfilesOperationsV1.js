"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class DataProfilesOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('data-profiles', new pip_services3_commons_node_1.Descriptor('iqs-services-dataprofiles', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._profilesClient = this._dependencyResolver.getOneRequired('data-profiles');
    }
    getProfileOperation() {
        return (req, res) => {
            this.getProfile(req, res);
        };
    }
    setProfileOperation() {
        return (req, res) => {
            this.setProfile(req, res);
        };
    }
    getProfile(req, res) {
        let orgId = req.route.params.org_id;
        this._profilesClient.getProfile(null, orgId, this.sendResult(req, res));
    }
    setProfile(req, res) {
        let orgId = req.route.params.org_id;
        let profile = req.body || {};
        profile.id = orgId;
        this._profilesClient.setProfile(null, profile, this.sendResult(req, res));
    }
}
exports.DataProfilesOperationsV1 = DataProfilesOperationsV1;
//# sourceMappingURL=DataProfilesOperationsV1.js.map