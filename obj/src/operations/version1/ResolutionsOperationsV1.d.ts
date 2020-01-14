import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class ResolutionsOperationsV1 extends FacadeOperations {
    private _resolutionsClient;
    constructor();
    setReferences(references: IReferences): void;
    getResolutionsOperation(): (req: any, res: any) => void;
    getResolutionOperation(): (req: any, res: any) => void;
    createResolutionOperation(): (req: any, res: any) => void;
    updateResolutionOperation(): (req: any, res: any) => void;
    deleteResolutionOperation(): (req: any, res: any) => void;
    private getResolutions;
    private getResolution;
    private createResolution;
    private updateResolution;
    private deleteResolution;
}
