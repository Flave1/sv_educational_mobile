export const screens = {
    scenes: {
        onBoarding: {
            title: 'Boarding',
            name: 'on-boarding',
            screens:{
                setup:{
                    title: 'OnboardingSetup',
                    name: 'on-oarding-setup', 
                },
                viewpagers:{
                    title: 'ViewPagers',
                    name: 'view-pagers', 
                }
            }
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
                        wrapper: {
                            title: 'wrapper',
                            name: 'protected-teacher'
                        },
                        home: {
                            title: 'Dashboard',
                            name: 'teacher-dashboard'
                        },
                        sclass: {
                            title: '',
                            name: 'student-class'
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
                        sessionClass: {
                            title: '',
                            name: 't-session-class',
                            screen: {
                                assessment: {
                                    title: '',
                                    name: 't-assessment',
                                    screen: {
                                        create: {
                                            title: '',
                                            name: 't-assessment-create',
                                        },
                                        detail: {
                                            title: '',
                                            name: 't-assessment-detail',
                                            screens: {
                                                feedback: {
                                                    title: '',
                                                    name: 't-student-assessment-feedback',
                                                }
                                            }
                                        },
                                        update: {
                                            title: '',
                                            name: 't-assessment-update',
                                        }
                                    }
                                },
                                classRegister: {
                                    title: '',
                                    name: 't-class-register'
                                },
                            }
                        },
                        announcement: {
                            title: '',
                            name: 'teacher-announcement',
                            screen: {
                                detail: {
                                    title: '',
                                    name: 'teacher-announcement-detail',
                                }
                            }
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