let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IInvitationsClientV1 } from 'pip-clients-invitations-node';
import { InvitationV1 } from 'pip-clients-invitations-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class InvitationsOperationsV1  extends FacadeOperations {
    private _invitationsClient: IInvitationsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('invitations', new Descriptor('pip-services-invitations', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._invitationsClient = this._dependencyResolver.getOneRequired<IInvitationsClientV1>('invitations');
    }

    public getInvitationsOperation() {
        return (req, res) => {
            this.getInvitations(req, res);
        }
    }

    public getInvitationOperation() {
        return (req, res) => {
            this.getInvitation(req, res);
        }
    }

    public sendInvitationOperation() {
        return (req, res) => {
            this.sendInvitation(req, res);
        }
    }

    public deleteInvitationOperation() {
        return (req, res) => {
            this.deleteInvitation(req, res);
        }
    }

    public approveInvitationOperation() {
        return (req, res) => {
            this.approveInvitation(req, res);
        }
    }

    public denyInvitationOperation() {
        return (req, res) => {
            this.denyInvitation(req, res);
        }
    }
    
    public resendInvitationOperation() {
        return (req, res) => {
            this.resendInvitation(req, res);
        }
    }

    public notifyInvitationOperation() {
        return (req, res) => {
            this.notifyInvitation(req, res);
        }
    }
    
    private getInvitations(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._invitationsClient.getInvitations(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getInvitation(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let invitationId = req.route.params.invitation_id;

        this._invitationsClient.getInvitationById(
            null, invitationId, this.sendResult(req, res)
        );
    }

    private sendInvitation(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let invitation = req.body || {};
        let user = req.user || {};

        invitation.create_time = new Date();
        invitation.creator_id = user.id;
        invitation.creator_name = user.name;

        this._invitationsClient.createInvitation(
            null, invitation, this.sendResult(req, res)
        );
    }

    private deleteInvitation(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let invitationId = req.route.params.invitation_id;

        this._invitationsClient.deleteInvitationById(
            null, invitationId, this.sendResult(req, res)
        );
    }

    private approveInvitation(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let invitationId = req.route.params.invitation_id;
        let role = req.param('role');

        this._invitationsClient.approveInvitation(
            null, invitationId, role, this.sendResult(req, res)
        );
    }

    private denyInvitation(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let invitationId = req.route.params.invitation_id;

        this._invitationsClient.denyInvitation(
            null, invitationId, this.sendResult(req, res)
        );
    }
    
    private resendInvitation(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let invitationId = req.route.params.invitation_id;

        this._invitationsClient.resendInvitation(
            null, invitationId, this.sendResult(req, res)
        );
    }

    private notifyInvitation(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let invitation = req.body || {};
        let user = req.user || {};

        invitation.create_time = new Date();
        invitation.creator_id = user.id;
        invitation.creator_name = user.name;

        this._invitationsClient.notifyInvitation(
            null, invitation, this.sendEmptyResult(req, res)
        );
    }
    
}