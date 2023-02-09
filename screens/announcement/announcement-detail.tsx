import React from "react";
import ProtectedTeacher from "../authentication/protected-teacher";
import { useColorScheme, View } from "react-native";
import { AppLight } from "../../tools/color";
import { OpenAnnouncement } from "../../store/actions/announcement-actions";
import { Avatar, Banner, Button, HStack } from "@react-native-material/core";

const AnnouncementDetail = ({ route, navigation, dispatch, state, backgroundColor, persistedUser }: any) => {

    const isDarkMode = useColorScheme() === 'dark';

    const { selectedAnnouncement } = state.announcementState;
    const { announcementsId } = route.params;

    console.log('selectedAnnouncement', selectedAnnouncement);
    
    React.useEffect(() => {
        if (persistedUser.baseUrlSuffix) {
            OpenAnnouncement(persistedUser.baseUrlSuffix, announcementsId)(dispatch)
        }
    }, [persistedUser.baseurlSuffix, announcementsId]);

    return (
        <>
            <ProtectedTeacher backgroundColor={backgroundColor}>
                <View style={{ backgroundColor: isDarkMode ? AppLight : AppLight, height: '100%' }}>
                    <Banner
                    style={{ marginVertical:20}}
                        illustration={props => (
                            <Avatar image={{ uri: "https://w7.pngwing.com/pngs/537/580/png-transparent-bell-notification-communication-information-icon-thumbnail.png" }} />
                        )}
                        
                        text={(selectedAnnouncement?.content)}
                        buttons={
                            <HStack spacing={2}>
                                <Button key="learn-more" variant="text" title="Learn More" compact />
                            </HStack>
                        }
                    />
                </View>
            </ProtectedTeacher>
        </>
    );
}

export default AnnouncementDetail;

 {/* <RenderHtml
                        contentWidth={100}
                        source={{
                            html: `
                                <p style='text-align:center;'>
                                    Hello World!
                                </p>`
                        }}
                    /> */}