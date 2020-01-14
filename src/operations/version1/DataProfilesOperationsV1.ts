let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IDataProfilesClientV1 } from 'iqs-clients-dataprofiles-node';
import { DataProfileV1 } from 'iqs-clients-dataprofiles-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class DataProfilesOperationsV1  extends FacadeOperations {
    private _profilesClient: IDataProfilesClientV1;
    
    public constructor() {
        super();

        this._dependencyResolver.put('data-profiles', new Descriptor('iqs-services-dataprofiles', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._profilesClient = this._dependencyResolver.getOneRequired<IDataProfilesClientV1>('data-profiles');
    }

    public getProfileOperation() {
        return (req, res) => {
            this.getProfile(req, res);
        }
    }

    public setProfileOperation() {
        return (req, res) => {
            this.setProfile(req, res);
        }
    }

    private getProfile(req: any, res: any): void {
        let orgId = req.route.params.org_id;

        this._profilesClient.getProfile(
            null, orgId, this.sendResult(req, res)
        );
    }

    private setProfile(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let profile = req.body || {};
        profile.id = orgId;

        this._profilesClient.setProfile(
            null, profile, this.sendResult(req, res)
        );
    }
    
}