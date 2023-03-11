import { Pressable } from "@react-native-material/core";
import React, { PropsWithChildren } from "react";
import { StyleSheet, useColorScheme, View, Image } from "react-native";
import { School } from "../../../models/on-boarding/all-schools";
import { AppDark, AppLight } from "../../../tools/color";
import CustomText from "./CustomText";
const Section: React.FC<PropsWithChildren<{ school: School; onPress: any, setSelectedSchool: any }>> = ({ school, onPress, setSelectedSchool }) => {
    const isDarkMode = useColorScheme() === 'dark';
    
    return (
        <Pressable onPress={onPress}
            style={[styles.sectionContainer, isDarkMode ? styles.borderLight : styles.borderDark]}>
            <View style={{ width: '30%' }}>
                <Image
                    source={{ uri: !school.schoolLogo ? "https://www.kaleo-asbl.be/content/uploads/2017/05/Profil-site.jpg" : school.schoolLogo }}
                    style={styles.logo} />
            </View>
            <View style={{ width: '70%', alignContent: 'flex-end', alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
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
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        flexWrap: 'wrap',
        marginRight: 5,
        textTransform:'uppercase'
    },
    sectionDescription: {
        marginTop: 5,
        fontWeight: '400',
        fontSize: 20,
        color: 'grey',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    schoolHead: {
        marginTop: 2,
        fontWeight: '400',
        fontSize: 18,
        flexWrap: 'wrap',
        alignSelf: 'flex-end',
        marginRight: 5
    },
    logo: {

        height: 100,
        margin: 5,
        marginVertical: 10,
        borderRadius: 50
    },
    borderLight: {
        borderColor: AppLight,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 5
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