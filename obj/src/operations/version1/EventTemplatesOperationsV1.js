"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
class EventTemplatesOperationsV1 extends pip_services3_facade_node_1.FacadeOperations {
    constructor() {
        super();
        this._dependencyResolver.put('event-templates', new pip_services3_commons_node_1.Descriptor('iqs-services-eventtemplates', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._templatesClient = this._dependencyResolver.getOneRequired('event-templates');
    }
    getTemplatesOperation() {
        return (req, res) => {
            this.getTemplates(req, res);
        };
    }
    getTemplateOperation() {
        return (req, res) => {
            this.getTemplate(req, res);
        };
    }
    createTemplateOperation() {
        return (req, res) => {
            this.createTemplate(req, res);
        };
    }
    updateTemplateOperation() {
        return (req, res) => {
            this.updateTemplate(req, res);
        };
    }
    deleteTemplateOperation() {
        return (req, res) => {
            this.deleteTemplate(req, res);
        };
    }
    getTemplates(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        this._templatesClient.getTemplates(null, filter, paging, this.sendResult(req, res));
    }
    getTemplate(req, res) {
        let orgId = req.route.params.org_id;
        let templateId = req.route.params.template_id;
        this._templatesClient.getTemplateById(null, templateId, this.sendResult(req, res));
    }
    createTemplate(req, res) {
        let orgId = req.route.params.org_id;
        let template = req.body || {};
        this._templatesClient.createTemplate(null, template, this.sendResult(req, res));
    }
    updateTemplate(req, res) {
        let orgId = req.route.params.org_id;
        let templateId = req.route.params.template_id;
        let template = req.body || {};
        template.id = templateId;
        this._templatesClient.updateTemplate(null, template, this.sendResult(req, res));
    }
    deleteTemplate(req, res) {
        let orgId = req.route.params.org_id;
        let templateId = req.route.params.template_id;
        this._templatesClient.deleteTemplateById(null, templateId, this.sendResult(req, res));
    }
}
exports.EventTemplatesOperationsV1 = EventTemplatesOperationsV1;
//# sourceMappingURL=EventTemplatesOperationsV1.js.map