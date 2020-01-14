let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IEventRulesClientV1 } from 'iqs-clients-eventrules-node';
import { EventRuleV1 } from 'iqs-clients-eventrules-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class EventRulesOperationsV1  extends FacadeOperations {
    private _eventRulesClient: IEventRulesClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('event-rules', new Descriptor('iqs-services-eventrules', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._eventRulesClient = this._dependencyResolver.getOneRequired<IEventRulesClientV1>('event-rules');
    }

    public getEventRulesOperation() {
        return (req, res) => {
            this.getEventRules(req, res);
        }
    }

    public getEventRuleOperation() {
        return (req, res) => {
            this.getEventRule(req, res);
        }
    }

    public createEventRuleOperation() {
        return (req, res) => {
            this.createEventRule(req, res);
        }
    }

    public updateEventRuleOperation() {
        return (req, res) => {
            this.updateEventRule(req, res);
        }
    }

    public deleteEventRuleOperation() {
        return (req, res) => {
            this.deleteEventRule(req, res);
        }
    }

    private getEventRules(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._eventRulesClient.getEventRules(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getEventRule(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let ruleId = req.route.params.rule_id;

        this._eventRulesClient.getEventRuleById(
            null, ruleId, this.sendResult(req, res)
        );
    }

    private createEventRule(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let rule = req.body || {};

        this._eventRulesClient.createEventRule(
            null, rule, this.sendResult(req, res)
        );
    }

    private updateEventRule(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let ruleId = req.route.params.rule_id;
        let rule = req.body || {};
        rule.id = ruleId;

        this._eventRulesClient.updateEventRule(
            null, rule, this.sendResult(req, res)
        );
    }

    private deleteEventRule(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let ruleId = req.route.params.rule_id;

        this._eventRulesClient.deleteEventRuleById(
            null, ruleId, this.sendResult(req, res)
        );
    }

}