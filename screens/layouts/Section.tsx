import { Pressable } from "@react-native-material/core";
import React, { PropsWithChildren } from "react";
import { StyleSheet, useColorScheme, View, Image } from "react-native";
import CustomText from "./CustomText";
import { School } from "../../models/on-boarding/all-schools";
import { AppLight, AppDark, AppLightBlue } from "../../tools/color";
const Section: React.FC<PropsWithChildren<{ school: School; onPress: any, setSelectedSchool: any }>> = ({ school, onPress, setSelectedSchool }) => {
    const isDarkMode = useColorScheme() === 'dark';
    
    return (
        <Pressable onPress={onPress}
            style={[styles.sectionContainer ]}>
            <View style={{ width: '20%' }}>
                <Image
                    source={{ uri: !school.schoolLogo ? "https://www.kaleo-asbl.be/content/uploads/2017/05/Profil-site.jpg" : school.schoolLogo }}
                    style={styles.logo} />
            </View>
            <View style={{ width: '80%', alignContent: 'flex-end', alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
                <CustomText style={[styles.sectionTitle]} title={school.schoolName} />
                <CustomText style={[styles.sectionDescription]} title={school.address} />
                <CustomText style={[styles.schoolHead]} title={school.schoolHead} />
            </View>
        </Pressable>
    );
};


const styles = StyleSheet.create({
    sectionContainer: {
        justifyContent: 'flex-start',
        marginTop: 10,
        alignItems: 'flex-start',
        flexDirection: 'row',
        borderColor: AppLightBlue,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 15,
        padding:5
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        flexWrap: 'wrap',
        marginRight: 5,
        textTransform:'uppercase'
    },
    sectionDescription: {
        marginTop: 5,
        fontWeight: '400',
        fontSize: 13,
        color: 'gray',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    schoolHead: {
        marginTop: 0,
        fontWeight: '400',
        fontSize: 13,
        flexWrap: 'wrap',
        alignSelf: 'flex-end',
        marginRight: 5
    },
    logo: {
        height: 70,
        margin: 5,
        marginVertical: 10,
        borderRadius: 100
    },
    borderDark: {
        borderColor: AppDark,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 5
    }
});

export default Section;