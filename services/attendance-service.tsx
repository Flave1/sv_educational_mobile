import { dateNow, generateGUID } from "../Utils/generate";
import { ClassRegister } from "../models/class-properties/attendance";

export class AttendanceService {
    static createRegister = async (sessionClassId: string, studentsCount: number): Promise<ClassRegister> => {
        const dt = dateNow();
        return {
            classRegisterId: generateGUID(),
            sessionClassId,
            classRegisterLabel: "ATTENDANCE AS AT " + dt,
            dateTime: dt,
            totalStudentAbsent: 0,
            totalStudentInClass: studentsCount,
            totalStudentPresent: 0,
            attendanceList: [],
        } as ClassRegister;
    }
    static updateRegister = async (register: ClassRegister, unsynchronized: ClassRegister[], attendanceList: any[]): Promise<ClassRegister[]> => {
        const updatedRegs = unsynchronized?.map((obj) => {
            if (obj.classRegisterId === register.classRegisterId) {
                register.totalStudentAbsent = attendanceList.filter(d => d.isPresent == false).length;
                register.totalStudentPresent = attendanceList.filter(d => d.isPresent == true).length;
                register.attendanceList = attendanceList;
                return register;
            }
            return obj
        });
        return updatedRegs;
    }
    static getRegister = async (registerId: string, classRegisters: ClassRegister[]): Promise<ClassRegister> => {
        return classRegisters.find(d => d.classRegisterId === registerId) as ClassRegister;
    }
}