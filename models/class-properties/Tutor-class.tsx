export class TutorClass {
    sessionClass = "";
    sessionClassId = "";
    classId = ""
}

export class ClassNote {
    approvalStatus: number = -3;
    approvalStatusName: string = "";
    authorName: string = "";
    classNoteId: string = "";
    teacherClassNoteId: string = "";
    noteContent: string = "";
    noteTitle: string = "";
    subject :string = "";
    subjectName:string = "";
    classes:string[] = [""];
}

export class StudentNote {
    approvalStatus: number = -3;
    approvalStatusName: string = "";
    studentNoteId: string = "";
    studentName: string = "";
    teacherId: string = "";
    noteContent: string = "";
    noteTitle: string = "";
    subject :string = "";
    subjectName:string = "";
    sessionClassId:string = "";
    dateSubmitted:string = "";
}
