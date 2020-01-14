let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node'; 
import { DependencyResolver } from 'pip-services3-commons-node';

import { IShiftsClientV1 } from 'iqs-clients-shifts-node';
import { ShiftV1 } from 'iqs-clients-shifts-node';

import { FacadeOperations } from 'pip-services3-facade-node';

export class ShiftsOperationsV1  extends FacadeOperations {
    private _shiftsClient: IShiftsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('shifts', new Descriptor('iqs-services-shifts', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._shiftsClient = this._dependencyResolver.getOneRequired<IShiftsClientV1>('shifts');
    }

    public getShiftsOperation() {
        return (req, res) => {
            this.getShifts(req, res);
        }
    }

    public getShiftOperation() {
        return (req, res) => {
            this.getShift(req, res);
        }
    }

    public createShiftOperation() {
        return (req, res) => {
            this.createShift(req, res);
        }
    }

    public updateShiftOperation() {
        return (req, res) => {
            this.updateShift(req, res);
        }
    }

    public deleteShiftOperation() {
        return (req, res) => {
            this.deleteShift(req, res);
        }
    }

    private getShifts(req: any, res: any): void {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let orgId = req.route.params.org_id;
        filter.setAsObject('org_id', orgId);
        
        this._shiftsClient.getShifts(
            null, filter, paging, this.sendResult(req, res)
        );
    }

    private getShift(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let shiftId = req.route.params.shift_id;

        this._shiftsClient.getShiftById(
            null, shiftId, this.sendResult(req, res)
        );
    }

    private createShift(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let shift = req.body || {};

        this._shiftsClient.createShift(
            null, shift, this.sendResult(req, res)
        );
    }

    private updateShift(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let shiftId = req.route.params.shift_id;
        let shift = req.body || {};
        shift.id = shiftId;

        this._shiftsClient.updateShift(
            null, shift, this.sendResult(req, res)
        );
    }

    private deleteShift(req: any, res: any): void {
        let orgId = req.route.params.org_id;
        let shiftId = req.route.params.shift_id;

        this._shiftsClient.deleteShiftById(
            null, shiftId, this.sendResult(req, res)
        );
    }

}