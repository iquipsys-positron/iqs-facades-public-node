let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';
import { FloatConverter } from 'pip-services3-commons-node';

import { IAttendanceClientV1 } from 'iqs-clients-attendance-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class AttendanceOperationsV1  extends FacadeOperations {
    private _attendanceClient: IAttendanceClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('attendance', new Descriptor('iqs-services-attendance', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._attendanceClient = this._dependencyResolver.getOneRequired<IAttendanceClientV1>('attendance');
    }

    public getAttendancesOperation() {
        return (req, res) => {
            this.getAttendances(req, res);
        }
    }

    public getAttendancesWithinTimeOperation() {
        return (req, res) => {
            this.getAttendancesWithinTime(req, res);
        }
    }

    public addAttendanceOperation() {
        return (req, res) => {
            this.addAttendance(req, res);
        }
    }

    public addAttendancesOperation() {
        return (req, res) => {
            this.addAttendances(req, res);
        }
    }
    
    public deleteAttendancesOperation() {
        return (req, res) => {
            this.deleteAttendances(req, res);
        }
    }

    private getAttendances(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._attendanceClient.getAttendances(
            null, orgId, filter, paging, this.sendResult(req, res)
        );
    }

    private getAttendancesWithinTime(req: any, res: any): void {
        let fromTime = DateTimeConverter.toDateTime(req.param('from_time'));
        let toTime = DateTimeConverter.toDateTime(req.param('to_time'));
        
        let orgId = req.route.params.org_id;
        
        this._attendanceClient.getAttendancesWithinTime(
            null, orgId, fromTime, toTime, this.sendResult(req, res)
        );
    }

    private addAttendance(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let attendance = req.body || {};
        
        this._attendanceClient.addAttendance(
            null, orgId, attendance, this.sendEmptyResult(req, res)
        );
    }

    private addAttendances(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let attendances = req.body || [];

        this._attendanceClient.addAttendances(
            null, orgId, attendances, this.sendEmptyResult(req, res)
        );
    }
    
    private deleteAttendances(req: any, res: any): void {
        let filter = this.getFilterParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._attendanceClient.deleteAttendances(
            null, orgId, filter, this.sendEmptyResult(req, res)
        );
    }

}