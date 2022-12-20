export const navigationRoutes = {
    scenes: {
        onBoarding: {
            title: 'Boarding',
            name: 'on-boarding',
        },
        auth: {
            title: '',
            name: 'auth',
            screens: {
                signin: {
                    title: '',
                    name: 'sign-in',
                },
                signup: {
                    title: '',
                    name: 'sign-up',
                },
                signinschool: {
                    title: '',
                    name: 'sign-in-school',
                },
            }
        },
        mainapp: {
            title: '',
            name: 'mainapp',
            scenes: {
                common: {
                    title: '',
                    name: 'common',
                    screens: {

                    }
                },
                tutor: {
                    title: '',
                    name: 'tutor',
                    screens: {
                        home: {
                            title: 'Dashboard',
                            name: 'teacher-dashboard'
                        },
                        sclass: {
                            title: '',
                            name: 'student-class'
                        },
                        assessment: {
                            title: '',
                            name: 'assessment'
                        },
                        readAssessment: {
                            title: '',
                            name: 'read-assessment'
                        },
                        createAssessment: {
                            title: '',
                            name: 'create-assessment'
                        },
                        attendance: {
                            title: '',
                            name: 'attendance'
                        },
                        markAttendance: {
                            title: '',
                            name: 'mark-attendance'
                        },
                        classRegister: {
                            title: '',
                            name: 'class-register'
                        }
                    }
                },
                student: {
                    title: '',
                    name: 'tutor',
                    screens: {
                        
                    }
                }
            }
        }
    },

}