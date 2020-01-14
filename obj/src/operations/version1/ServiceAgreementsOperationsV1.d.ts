import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class ServiceAgreementsOperationsV1 extends FacadeOperations {
    private _agreementsClient;
    constructor();
    setReferences(references: IReferences): void;
    getAgreementsOperation(): (req: any, res: any) => void;
    verifyAgreementOperation(): (req: any, res: any) => void;
    getAgreementOperation(): (req: any, res: any) => void;
    createAgreementOperation(): (req: any, res: any) => void;
    updateAgreementOperation(): (req: any, res: any) => void;
    deleteAgreementOperation(): (req: any, res: any) => void;
    private getAgreements;
    private verifyAgreement;
    private getAgreement;
    private createAgreement;
    private updateAgreement;
    private deleteAgreement;
}
