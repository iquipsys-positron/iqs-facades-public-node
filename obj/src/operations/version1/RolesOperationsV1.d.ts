import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class RolesOperationsV1 extends FacadeOperations {
    private _accountsClient;
    private _sessionsClient;
    private _organizationsClient;
    private _rolesClient;
    constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getOrganizationUsersOperation(): (req: any, res: any) => void;
    grantOrganizationRoleOperation(): (req: any, res: any) => void;
    revokeOrganizationRoleOperation(): (req: any, res: any) => void;
    connectDemoOrganizationOperation(): (req: any, res: any) => void;
    private getOrganizationUsers;
    private grantOrganizationRole;
    private revokeOrganizationRole;
    private connectDemoOrganization;
}
