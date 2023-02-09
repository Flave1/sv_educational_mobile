import React, { useState } from "react";
import { ListItem, Avatar } from "@react-native-material/core";
import ProtectedTeacher from "../authentication/protected-teacher";
import { Button, useColorScheme, View } from "react-native";
import TeacherAnnouncementBox from "../components/layouts/teacher-announcement-box";
import { AppDark, AppLight } from "../../tools/color";
import { GetAnnouncements, ResetAnnouncementState } from "../../store/actions/announcement-actions";
import { FlatList, NativeBaseProvider } from "native-base";
import { screens } from "../../screen-routes/navigation";
import { useNavigation, StackActions } from "@react-navigation/native";

const AnnouncementList = ({ route, navigation, dispatch, state, backgroundColor, persistedUser }: any) => {

    const isDarkMode = useColorScheme() === 'dark';
    const [pageNumber, setPageNUmber] = useState(1)

    const { announcementList, paginationProps } = state.announcementState;
    React.useEffect(() => {
        if (persistedUser.baseUrlSuffix) {
            GetAnnouncements(persistedUser.baseUrlSuffix, pageNumber)(dispatch)
        }
        return () => {
            ResetAnnouncementState()(dispatch);
        }
    }, [persistedUser.baseurlSuffix, pageNumber]);


    return (
        <>
            <ProtectedTeacher backgroundColor={backgroundColor}>
                <View style={{ height: '100%' }}>

                    <NativeBaseProvider>
                        <FlatList
                            scrollEnabled={true}
                            scrocol
                            data={announcementList}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => setPageNUmber(paginationProps.nextPage ? pageNumber + 1 : pageNumber)}
                            keyExtractor={(item: any, index) => {
                                return index;
                            }}
                            renderItem={(item: any, index: any, separators: any) => {
                                return <ListItem
                                    key={index}
                                    onPress={() => {
                                        navigation.navigate({
                                            name: screens.scenes.mainapp.scenes.tutor.screens.announcement.screen.detail.name,
                                            params: { announcementsId: item.item.announcementsId }
                                            // merge: true,
                                          });
                                    }}
                                    leadingMode="avatar"
                                    leading={<Avatar image={{ uri: "https://w7.pngwing.com/pngs/537/580/png-transparent-bell-notification-communication-information-icon-thumbnail.png" }} />}
                                    title={item.item.header}
                                    secondaryText={item.item.content} />;
                            }}
                        />


                    </NativeBaseProvider>




                </View>

            </ProtectedTeacher>
        </>
    );
}

export default AnnouncementList;