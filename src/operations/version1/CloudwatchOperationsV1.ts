let _ = require('lodash');
let async = require('async');

import { ConfigParams, IntegerConverter } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';

import { ICloudwatchClientV1 } from 'iqs-clients-cloudwatch-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class CloudwatchOperationsV1 extends FacadeOperations {
    private _cloudwatchClient: ICloudwatchClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('cloudwatch', new Descriptor('iqs-services-cloudwatch', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._cloudwatchClient = this._dependencyResolver.getOneRequired<ICloudwatchClientV1>('cloudwatch');
    }

    public getAWSLogGroupsOperation() {
        return (req, res) => {
            this.getAWSLogGroups(req, res);
        }
    }

    public getAWSLogStreamsOperation() {
        return (req, res) => {
            this.getAWSLogStreams(req, res);
        }
    }

    public getAWSLogEventsOperation() {
        return (req, res) => {
            this.getAWSLogEvents(req, res);
        }
    }

    public getAWSMetricDataOperation() {
        return (req, res) => {
            this.getAWSMetricData(req, res);
        }
    }

    private getAWSLogGroups(req: any, res: any): void {
        let namePrefix = req.param('name_prefix');
        let limit = req.param('limit');

        this._cloudwatchClient.getLogGroups(null, namePrefix, limit, this.sendResult(req, res));
    }

    private getAWSLogStreams(req: any, res: any): void {
        let group = req.param('group');
        let streamPrefix = req.param('stream_prefix');
        let limit = req.param('limit');

        this._cloudwatchClient.getLogStreams(null, group, streamPrefix, limit, this.sendResult(req, res));
    }

    private getAWSLogEvents(req: any, res: any): void {
        let group = req.param('group');
        let stream = req.param('stream');
        let startTime = new Date(req.param('start_time'));
        let endTime = new Date(req.param('end_time'));
        let filter = req.param('filter');
        let limit = IntegerConverter.toInteger(req.param('limit'));

        this._cloudwatchClient.getLogEvents(
            null, group, stream, startTime, endTime, filter, limit, this.sendResult(req, res)
        );
    }

    private getAWSMetricData(req: any, res: any): void {
        let namespace = req.param('namespace');
        let startTime = new Date(req.param('start_time'));
        let endTime = new Date(req.param('end_time'));
        let period = IntegerConverter.toInteger(req.param('period'));
        let type = req.param('type');
        let unit = req.param('unit');
        let metric = req.param('metric');

        this._cloudwatchClient.getMetricData(
            null, namespace, startTime, endTime, period, type, unit, metric, this.sendResult(req, res)
        );
    }

}