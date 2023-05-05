import { ClassNote } from "../models/class-properties/Tutor-class";
import { ClassStudent } from "../models/class-properties/students";

export class ClassService {
    static re_initialize_students = async (
        freshStudents: ClassStudent[],
        existingStudents: ClassStudent[]): Promise<ClassStudent[]> => {
        if (existingStudents.length > 0) {
            const otherClassStudents = existingStudents
                .filter(function (_std) {
                    return !freshStudents.find(function (std) {
                        return _std.registrationNumber === std.registrationNumber
                    })
                });

            return [...otherClassStudents, ...freshStudents];
        } else {
            return freshStudents
        }
    }

    static getSingleClassNote = async (teacherClassNoteId: string, notes: ClassNote[]): Promise<ClassNote> => {
        return notes.find(d => d.teacherClassNoteId == teacherClassNoteId) as ClassNote;
    }

}

