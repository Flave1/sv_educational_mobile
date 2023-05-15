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
    subject: string = "";
    subjectName: string = "";
    classes: string[] = [""];
}

export class StudentNote {
    approvalStatus: number = -3;
    approvalStatusName: string = "";
    studentNoteId: string = "";
    studentName: string = "";
    teacherId: string = "";
    noteContent: string = "";
    noteTitle: string = "";
    subject: string = "";
    subjectName: string = "";
    sessionClassId: string = "";
    dateSubmitted: string = "";
}


export class Teacher {
    firstName: string = "";
    fullNam: string = "";
    isShared: boolean = false;
    lastName: string = "";
    middleName: string = "";
    teacherAccountId: string = "";
    teacherUserAccountId: string = "";
}

export class SendToClasses {
    sessionClass: string = "";
    sessionClassId: string = "";
    classId: string = "";
    isSent : Boolean = false;
}

