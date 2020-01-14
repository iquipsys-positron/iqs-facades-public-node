import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class InvitationsOperationsV1 extends FacadeOperations {
    private _invitationsClient;
    constructor();
    setReferences(references: IReferences): void;
    getInvitationsOperation(): (req: any, res: any) => void;
    getInvitationOperation(): (req: any, res: any) => void;
    sendInvitationOperation(): (req: any, res: any) => void;
    deleteInvitationOperation(): (req: any, res: any) => void;
    approveInvitationOperation(): (req: any, res: any) => void;
    denyInvitationOperation(): (req: any, res: any) => void;
    resendInvitationOperation(): (req: any, res: any) => void;
    notifyInvitationOperation(): (req: any, res: any) => void;
    private getInvitations;
    private getInvitation;
    private sendInvitation;
    private deleteInvitation;
    private approveInvitation;
    private denyInvitation;
    private resendInvitation;
    private notifyInvitation;
}
