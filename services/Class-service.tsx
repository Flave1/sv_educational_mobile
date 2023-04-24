import { ClassStudents } from "../models/class-properties/students";

export class ClassService {
    static re_initialize_students = async (
        freshStudents: ClassStudents[],
        existingStudents: ClassStudents[]): Promise<ClassStudents[]> => {
        if (existingStudents.length > 0) {
            const otherClassStudents = existingStudents
                .filter(function(_std){
                    return !freshStudents.find(function(std){
                        return _std.registrationNumber === std.registrationNumber
                    })
                });
            return [...otherClassStudents, ...freshStudents];
        } else {
            return freshStudents
        }

    }

}

