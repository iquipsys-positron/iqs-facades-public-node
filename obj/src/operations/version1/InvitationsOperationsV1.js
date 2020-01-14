"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class InvitationsOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('invitations', new pip_services3_commons_node_1.Descriptor('pip-services-invitations', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._invitationsClient = this._dependencyResolver.getOneRequired('invitations');
    }
    getInvitationsOperation() {
        return (req, res) => {
            this.getInvitations(req, res);
        };
    }
    getInvitationOperation() {
        return (req, res) => {
            this.getInvitation(req, res);
        };
    }
    sendInvitationOperation() {
        return (req, res) => {
            this.sendInvitation(req, res);
        };
    }
    deleteInvitationOperation() {
        return (req, res) => {
            this.deleteInvitation(req, res);
        };
    }
    approveInvitationOperation() {
        return (req, res) => {
            this.approveInvitation(req, res);
        };
    }
    denyInvitationOperation() {
        return (req, res) => {
            this.denyInvitation(req, res);
        };
    }
    resendInvitationOperation() {
        return (req, res) => {
            this.resendInvitation(req, res);
        };
    }
    notifyInvitationOperation() {
        return (req, res) => {
            this.notifyInvitation(req, res);
        };
    }
    getInvitations(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._invitationsClient.getInvitations(null, filter, paging, this.sendResult(req, res));
    }
    getInvitation(req, res) {
        let orgId = req.route.params.org_id;
        let invitationId = req.route.params.invitation_id;
        this._invitationsClient.getInvitationById(null, invitationId, this.sendResult(req, res));
    }
    sendInvitation(req, res) {
        let orgId = req.route.params.org_id;
        let invitation = req.body || {};
        let user = req.user || {};
        invitation.create_time = new Date();
        invitation.creator_id = user.id;
        invitation.creator_name = user.name;
        this._invitationsClient.createInvitation(null, invitation, this.sendResult(req, res));
    }
    deleteInvitation(req, res) {
        let orgId = req.route.params.org_id;
        let invitationId = req.route.params.invitation_id;
        this._invitationsClient.deleteInvitationById(null, invitationId, this.sendResult(req, res));
    }
    approveInvitation(req, res) {
        let orgId = req.route.params.org_id;
        let invitationId = req.route.params.invitation_id;
        let role = req.param('role');
        this._invitationsClient.approveInvitation(null, invitationId, role, this.sendResult(req, res));
    }
    denyInvitation(req, res) {
        let orgId = req.route.params.org_id;
        let invitationId = req.route.params.invitation_id;
        this._invitationsClient.denyInvitation(null, invitationId, this.sendResult(req, res));
    }
    resendInvitation(req, res) {
        let orgId = req.route.params.org_id;
        let invitationId = req.route.params.invitation_id;
        this._invitationsClient.resendInvitation(null, invitationId, this.sendResult(req, res));
    }
    notifyInvitation(req, res) {
        let orgId = req.route.params.org_id;
        let invitation = req.body || {};
        let user = req.user || {};
        invitation.create_time = new Date();
        invitation.creator_id = user.id;
        invitation.creator_name = user.name;
        this._invitationsClient.notifyInvitation(null, invitation, this.sendEmptyResult(req, res));
    }
}
exports.InvitationsOperationsV1 = InvitationsOperationsV1;
//# sourceMappingURL=InvitationsOperationsV1.js.map