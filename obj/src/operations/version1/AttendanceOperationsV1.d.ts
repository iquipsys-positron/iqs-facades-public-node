import { IReferences } from 'pip-services3-commons-node';
import { FacadeOperations } from 'pip-services3-facade-node';
export declare class AttendanceOperationsV1 extends FacadeOperations {
    private _attendanceClient;
    constructor();
    setReferences(references: IReferences): void;
    getAttendancesOperation(): (req: any, res: any) => void;
    getAttendancesWithinTimeOperation(): (req: any, res: any) => void;
    addAttendanceOperation(): (req: any, res: any) => void;
    addAttendancesOperation(): (req: any, res: any) => void;
    deleteAttendancesOperation(): (req: any, res: any) => void;
    private getAttendances;
    private getAttendancesWithinTime;
    private addAttendance;
    private addAttendances;
    private deleteAttendances;
}
