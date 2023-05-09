export const screens = {
    scenes: {
        onBoarding: {
            title: 'Boarding',
            name: 'on-boarding',
            screens: {
                setup: {
                    title: 'OnboardingSetup',
                    name: 'on-boarding-setup',
                },
                viewpagers: {
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
                            name: 't-student-class'
                        },

                        readAssessment: {
                            title: '',
                            name: 'read-assessment'
                        },
                        createAssessment: {
                            title: '',
                            name: 't-create-assessment'
                        },
                        attendance: {
                            title: 't-attendance',
                            name: 't-attendance',
                            screens: {
                                takeAttendanceRecord: {
                                    title: 't-take-attendance-record',
                                    name: 't-take-attendance-record',
                                },
                                continueAttendanceRecord: {
                                    title: 't-continue-attendance-record',
                                    name: 't-continue-attendance-record',
                                }
                            }
                        },
                        classnote: {
                            title: 't-classnote',
                            name: 't-classnote',
                            screens: {
                                createClassnote: {
                                    title: 't-classnote-create',
                                    name: 't-classnote-create',
                                },
                                updateClassnote: {
                                    title: 't-classnote-update',
                                    name: 't-classnote-update',
                                }
                            }
                        }, 
                         studentnote: {
                            title: 't-studentnote',
                            name: 't-studentnote',
                            screens: {
                                studentnoteDetails: {
                                    title: 't-studentnote-details',
                                    name: 't-studentnote-details',
                                }
                            }
                        }, 
                         classInfo: {
                            title: 't-classInfo',
                            name: 't-classInfo',
                            screens: {
                                classInfoDetails: {
                                    title: 't-classInfo-details',
                                    name: 't-classInfo-details',
                                }
                            }
                        },
                        classStudents: {
                            title: 't-classstudents',
                            name: 't-classstudents',
                            screens: {
                                info: {
                                    title: 't-classstudent-info',
                                    name: 't-classstudent-info',
                                }
                            }
                        },
                        classSubjects: {
                            title: 't-classsubject',
                            name: 't-classsubject'
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