export class ClassStudent {
    studentAccountId: string = "";
    userType: number = 0;
    active: boolean = false;
    firstName: string = "";
    lastName: string = "";
    middleName: string = "";
    sessionClassID: string = "";
    registrationNumber: string = "";
}


export class ClassStudentInfo {
    studentAccountId: string = "";
    userType: number = 0;
    active: boolean = false;
    firstName: string = "";
    lastName: string = "";
    middleName: string = "";
    phone: string = "";
    dob: string = "";
    photo: string = "";
    homePhone: string = "";
    emergencyPhone: string = "";
    arentOrGuardianName: string = "";
    parentOrGuardianRelationship: string = "";
    parentOrGuardianPhone: string = "";
    parentOrGuardianEmail: string = "";
    homeAddress: string = "";
    cityId: string = "";
    stateId: string = "";
    countryId: string = "";
    zipCode: string = "";
    registrationNumber: string = "";
    userAccountId: string = "";
    userName: string = "";
    email: string = "";
    sessionClassID: string = "";
    sessionClass: string = "";
    hobbies: any[] = [];
    bestSubjectNames: any = null;
    bestSubjectIds: any[] = []
}

export class SessionClassInfo {
    assessment:number = 0;
    examSCore:number = 0;
    subjectId:string = "";
    subjectName : string = "";
    subjectTeacherId:string = "";
    subjectTeacherName:string = "";
}

export class SessionClassSubj {
    assessmentCount:number = 0;
    assessmentScore:number = 0;
    attendanceCount:number = 0;
    class:string = "";
    classCaptain:string = "";
    classCaptainId:string = "";
    classId:string = "";
    classSubjects:any[]= []
    examScorenumber = 0;
    formTeacher:string = "";
    formTeacherId:string = "";
    inSession : boolean=false;
    passMark:number = 0;
    session:string = "";
    sessionClassId:string = "";
    sessionId:string = "";
    studentCount:number = 0;
    subjectCount:number = 0;
   
}