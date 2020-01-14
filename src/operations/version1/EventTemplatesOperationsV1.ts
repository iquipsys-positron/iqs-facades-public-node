let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IEventTemplatesClientV1 } from 'iqs-clients-eventtemplates-node';
import { EventTemplateV1 } from 'iqs-clients-eventtemplates-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class EventTemplatesOperationsV1  extends FacadeOperations {
    private _templatesClient: IEventTemplatesClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('event-templates', new Descriptor('iqs-services-eventtemplates', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._templatesClient = this._dependencyResolver.getOneRequired<IEventTemplatesClientV1>('event-templates');
    }

    public getTemplatesOperation() {
        return (req, res) => {
            this.getTemplates(req, res);
        }
    }

    public getTemplateOperation() {
        return (req, res) => {
            this.getTemplate(req, res);
        }
    }

    public createTemplateOperation() {
        return (req, res) => {
            this.createTemplate(req, res);
        }
    }

    public updateTemplateOperation() {
        return (req, res) => {
            this.updateTemplate(req, res);
        }
    }

    public deleteTemplateOperation() {
        return (req, res) => {
            this.deleteTemplate(req, res);
        }
    }

    private getTemplates(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._templatesClient.getTemplates(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getTemplate(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let templateId = req.route.params.template_id;

        this._templatesClient.getTemplateById(
            null, templateId, this.sendResult(req, res)
        );
    }

    private createTemplate(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let template = req.body || {};

        this._templatesClient.createTemplate(
            null, template, this.sendResult(req, res)
        );
    }

    private updateTemplate(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let templateId = req.route.params.template_id;
        let template = req.body || {};
        template.id = templateId;

        this._templatesClient.updateTemplate(
            null, template, this.sendResult(req, res)
        );
    }

    private deleteTemplate(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let templateId = req.route.params.template_id;

        this._templatesClient.deleteTemplateById(
            null, templateId, this.sendResult(req, res)
        );
    }

}