export class ClassAssessment {
    public assessmentScore: number = 0;
    public comment: string = "";
    public content: string = "";
    public dateDeadLine: string = "";
    public homeAssessmentId: string = "";
    public included: boolean = false;
    public numberOfStudentsNotSubmitted: string = "";
    public numberOfStudentsSubmitted: number = 0;
    public sessionClassGroupId: string = "";
    public sessionClassGroupName: string = "";
    public sessionClassId: string = "";
    public sessionClassName: string = "";
    public sessionClassSubjectId: string = "";
    public sessionClassSubjectName: string = "";
    public sessionTermId: string = "";
    public sessionTermName: string = "";
    public status: string = "";
    public studentCount: number = 0;
    public studentList: [] = [];
    public teacherId: string = "";
    public teacherName: string = "";
    public timeDeadLine: string = "";
    public title: string = "";
}

export class HomeAssessmentScoreRecord{
    public homeAsessmentFeedbackId: string = "";
    public included: boolean = false;
    public status: string = "";
    public studentName: string = "";
    public score: number = 0
}