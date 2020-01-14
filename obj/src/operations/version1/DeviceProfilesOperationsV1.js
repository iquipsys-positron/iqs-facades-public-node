"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class DeviceProfilesOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('device-profiles', new pip_services3_commons_node_1.Descriptor('iqs-services-deviceprofiles', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._profilesClient = this._dependencyResolver.getOneRequired('device-profiles');
    }
    getBaseProfilesOperation() {
        return (req, res) => {
            this.getBaseProfiles(req, res);
        };
    }
    getProfilesOperation() {
        return (req, res) => {
            this.getProfiles(req, res);
        };
    }
    getProfileOperation() {
        return (req, res) => {
            this.getProfile(req, res);
        };
    }
    createProfileOperation() {
        return (req, res) => {
            this.createProfile(req, res);
        };
    }
    updateProfileOperation() {
        return (req, res) => {
            this.updateProfile(req, res);
        };
    }
    deleteProfileOperation() {
        return (req, res) => {
            this.deleteProfile(req, res);
        };
    }
    getBaseProfiles(req, res) {
        this._profilesClient.getBaseProfiles(null, this.sendResult(req, res));
    }
    getProfiles(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._profilesClient.getProfiles(null, filter, paging, this.sendResult(req, res));
    }
    getProfile(req, res) {
        let orgId = req.route.params.org_id;
        let profileId = req.route.params.profile_id;
        this._profilesClient.getProfileById(null, profileId, this.sendResult(req, res));
    }
    createProfile(req, res) {
        let orgId = req.route.params.org_id;
        let profile = req.body || {};
        this._profilesClient.createProfile(null, profile, this.sendResult(req, res));
    }
    updateProfile(req, res) {
        let orgId = req.route.params.org_id;
        let profileId = req.route.params.profile_id;
        let profile = req.body || {};
        profile.id = profileId;
        this._profilesClient.updateProfile(null, profile, this.sendResult(req, res));
    }
    deleteProfile(req, res) {
        let orgId = req.route.params.org_id;
        let profileId = req.route.params.profile_id;
        this._profilesClient.deleteProfileById(null, profileId, this.sendResult(req, res));
    }
}
exports.DeviceProfilesOperationsV1 = DeviceProfilesOperationsV1;
//# sourceMappingURL=DeviceProfilesOperationsV1.js.map