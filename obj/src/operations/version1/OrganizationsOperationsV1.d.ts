import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class OrganizationsOperationsV1 extends FacadeOperations {
    private _rolesClient;
    private _sessionsClient;
    private _organizationsClient;
    constructor();
    setReferences(references: IReferences): void;
    getOrganizationsOperation(): (req: any, res: any) => void;
    getAuthorizedOrganizationsOperation(): (req: any, res: any) => void;
    getOrganizationOperation(): (req: any, res: any) => void;
    findOrganizationByCodeOperation(): (req: any, res: any) => void;
    generateCodeOperation(): (req: any, res: any) => void;
    createOrganizationOperation(): (req: any, res: any) => void;
    updateOrganizationOperation(): (req: any, res: any) => void;
    deleteOrganizationOperation(): (req: any, res: any) => void;
    removeOrganizationOperation(): (req: any, res: any) => void;
    validateOrganizationCodeOperation(): (req: any, res: any) => void;
    private getOrganizations;
    private getAuthorizedOrganizations;
    private getOrganization;
    private findOrganizationByCode;
    private generateCode;
    private createOrganization;
    private updateOrganization;
    private deleteOrganization;
    private removeOrganization;
    private validateOrganizationCode;
}
