let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IDeviceProfilesClientV1 } from 'iqs-clients-deviceprofiles-node';
import { BaseDeviceProfileV1 } from 'iqs-clients-deviceprofiles-node';
import { DeviceProfileV1 } from 'iqs-clients-deviceprofiles-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class DeviceProfilesOperationsV1  extends FacadeOperations {
    private _profilesClient: IDeviceProfilesClientV1;
    
    public constructor() {
        super();

        this._dependencyResolver.put('device-profiles', new Descriptor('iqs-services-deviceprofiles', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._profilesClient = this._dependencyResolver.getOneRequired<IDeviceProfilesClientV1>('device-profiles');
    }

    public getBaseProfilesOperation() {
        return (req, res) => {
            this.getBaseProfiles(req, res);
        }
    }

    public getProfilesOperation() {
        return (req, res) => {
            this.getProfiles(req, res);
        }
    }

    public getProfileOperation() {
        return (req, res) => {
            this.getProfile(req, res);
        }
    }

    public createProfileOperation() {
        return (req, res) => {
            this.createProfile(req, res);
        }
    }

    public updateProfileOperation() {
        return (req, res) => {
            this.updateProfile(req, res);
        }
    }

    public deleteProfileOperation() {
        return (req, res) => {
            this.deleteProfile(req, res);
        }
    }
    
    private getBaseProfiles(req: any, res: any): void {
        this._profilesClient.getBaseProfiles(
            null, this.sendResult(req, res)
        );
    }

    private getProfiles(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._profilesClient.getProfiles(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getProfile(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let profileId = req.route.params.profile_id;

        this._profilesClient.getProfileById(
            null, profileId, this.sendResult(req, res)
        );
    }

    private createProfile(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let profile = req.body || {};

        this._profilesClient.createProfile(
            null, profile, this.sendResult(req, res)
        );
    }

    private updateProfile(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let profileId = req.route.params.profile_id;
        let profile = req.body || {};
        profile.id = profileId;

        this._profilesClient.updateProfile(
            null, profile, this.sendResult(req, res)
        );
    }

    private deleteProfile(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let profileId = req.route.params.profile_id;

        this._profilesClient.deleteProfileById(
            null, profileId, this.sendResult(req, res)
        );
    }
    
}