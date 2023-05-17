import React, { useState, useEffect, useRef } from "react";
import { HStack, Stack, Text, TextInput } from "@react-native-material/core";
import ScreenTitle from "../layouts/screen-title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView, View, StyleSheet } from "react-native";
import CustomTextInput from "../layouts/CustomTextInput";
import * as Yup from 'yup';
import { useFormik } from "formik";
import CustomButton from "../layouts/CustomButton";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomTextArea from "../layouts/CustomTextArea";
import CustomCheckBoxWithBorder from "../layouts/checkbox-component";
import ProtectedTeacher from "../authentication/protected-teacher";
import CustomFileInput from "../layouts/CustomFileInput";
import { connect } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import { GetTeacherDetails, updateStaffDetails } from "../../store/actions/profile-actions";
import { TouchableOpacity } from "@gorhom/bottom-sheet";


const EditProfile = (props: any) => {
  const [tags, setTags] = useState<any>([]);
  useEffect(() => {
    props.getDetails(props?.onboardedUser.id);
  }, [])
  const screenLocalColor = "#868C8E";
  const refInput = useRef<any>(null);
  const [inputValue, setInputValue] = useState('');


  const validation = Yup.object().shape({
    FirstName: Yup.string()
      .min(2, "First Name Too Short!")
      .required("First Name is required"),
    LastName: Yup.string()
      .min(2, "Last Name Too Short!")
      .required("Last Name is required"),
    Email: Yup.string().email("Invalid email format")
      .required("Email is required"),
    DOB: Yup.string()
      .required("Date of birth is required!"),
    Phone: Yup.string().required("Phone Number is required"),
  });


  const handleTagPress = (tag: any) => {
    const updatedTags = tags.filter((t: any) => t !== tag);
    setTags(updatedTags);
  };

  const handleInputChange = (text: any) => {
    setInputValue(text);
  };

  const handleInputSubmit = () => {
    if (inputValue.trim() !== '') {
      const newTag = inputValue.trim();
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      setInputValue('');
    }
  };
  React.useEffect(() => {
    // settextAreaUser(props.teacherDetail?.shortBiography);
    if (props.teacherDetail?.hobbies) {
      setTags([...props.teacherDetail?.hobbies]);
    }
  }, [props.teacherDetail]);


  const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched }: any = useFormik({
    initialValues: {
      TeacherUserAccountId: props.teacherDetail?.teacherUserAccountId,
      Hobbies: [],
      ProfileImage: null,
      Email: props.teacherDetail?.email,
      FirstName: props.teacherDetail?.firstNam,
      LastName: props.teacherDetail?.lastName,
      MiddleName: props.teacherDetail?.middleName,
      Phone: props.teacherDetail?.phone,
      DOB: props.teacherDetail?.dob,
      Address: props.teacherDetail?.address,
      ShortBiography: props.teacherDetail?.shortBiography,
    },
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: (values) => {
      values.TeacherUserAccountId = values.TeacherUserAccountId;
      values.Hobbies = tags;
      // values.ShortBiography = textAreaUser;
      const params = new FormData();
      params.append("TeacherUserAccountId", values.TeacherUserAccountId);
      params.append("Hobbies", values.Hobbies);
      params.append("Email", values.Email);
      params.append("FirstName", values.FirstName);
      params.append("LastName", values.LastName);
      params.append("MiddleName", values.MiddleName);
      params.append("Phone", values.Phone);
      params.append("DOB", values.DOB);
      params.append("Address", values.Address);
      params.append("ShortBiography", values.ShortBiography);
      params.append("ProfileImage", values.ProfileImage);
      console.log("values",values);
      props.update(params, props?.onboardedUser.id, props.navigation);
    }
  });


  return (
    <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Edit Staff Profile">
      <ScrollView>
        <Stack spacing={10} style={{ flex: 1, marginHorizontal: 30, }}>
          <Stack style={{ flex: 0 }}>
            <HStack style={{ alignItems: 'center' }}>
              <ScreenTitle icon={<Feather name="edit" color="white" size={20} />} title={'EDIT STAFF PROFILE'} />
            </HStack>
          </Stack>
          <Stack center>
            {(touched.FirstName && errors.FirstName) && <Text color='red'>{errors.FirstName}</Text>}
            {(touched.LastName && errors.LastName) && <Text color='red'>{errors.LastName}</Text>}
            {(touched.MiddleName && errors.MiddleName) && <Text color='red'>{errors.MiddleName}</Text>}
            {(touched.Email && errors.Email) && <Text color='red'>{errors.Email}</Text>}
            {(touched.Phone && errors.Phone) && <Text color='red'>{errors.Phone}</Text>}
            {(touched.DOB && errors.DOB) && <Text color='red'>{errors.DOB}</Text>}
          </Stack>
          <Stack spacing={10} style={{ height: '60%' }}>
            <View style={{ width: '100%' }}>
              <Text color='white'>First Name:</Text>
              <CustomTextInput
                icon={<Feather name="user" size={16} />}
                placeholder='First Name'
                autoCapitalize='none'
                autoCompleteType='text'
                keyboardType='text'
                keyboardAppearance='dark'
                returnKeyType='next'
                returnKeyLabel='next'
                onBlur={handleBlur('FirstName')}
                value={values.FirstName}
                error={errors.FirstName}
                touched={touched.FirstName}
                onChange={(e: any) => {
                  handleChange('FirstName');
                  setFieldValue('FirstName', e.nativeEvent.text)
                }}
              />
            </View>

            <View style={{ width: '100%' }}>
              <Text color='white'>Last Name:</Text>
              <CustomTextInput
                icon={<Feather name="user" size={16} />}
                placeholder='Last Name'
                autoCapitalize='none'
                autoCompleteType='text'
                keyboardType='text'
                keyboardAppearance='dark'
                returnKeyType='next'
                returnKeyLabel='next'
                onBlur={handleBlur('LastName')}
                value={values.LastName}
                error={errors.LastName}
                touched={touched.LastName}
                onChange={(e: any) => {
                  handleChange('LastName');
                  setFieldValue('LastName', e.nativeEvent.text)
                }}
              />
            </View>

            <View style={{ width: '100%' }}>
              <Text color='white'>Middle Name:</Text>
              <CustomTextInput
                icon={<Feather name="user" size={16} />}
                placeholder='MiddleName'
                autoCapitalize='none'
                autoCompleteType='text'
                keyboardType='text'
                keyboardAppearance='dark'
                returnKeyType='next'
                returnKeyLabel='next'
                onBlur={handleBlur('MiddleName')}
                value={values.MiddleName}
                error={errors.MiddleName}
                touched={touched.MiddleName}
                onChange={(e: any) => {
                  handleChange('MiddleName');
                  setFieldValue('MiddleName', e.nativeEvent.text)
                }}
              />
            </View>

            <View style={{ width: '100%' }}>
              <Text color='white'>Last Name:</Text>
              <CustomTextInput
                icon={<Feather name="user" size={16} />}
                placeholder='Last Name'
                autoCapitalize='none'
                autoCompleteType='text'
                keyboardType='text'
                keyboardAppearance='dark'
                returnKeyType='next'
                returnKeyLabel='next'
                onBlur={handleBlur('LastName')}
                value={values.LastName}
                error={errors.LastName}
                touched={touched.LastName}
                onChange={(e: any) => {
                  handleChange('LastName');
                  setFieldValue('LastName', e.nativeEvent.text)
                }}
              />
            </View>
            <View style={{ width: '100%' }}>
              <Text color='white'>Email:</Text>
              <CustomTextInput
                icon={<Feather name="user" size={16} />}
                placeholder='Email '
                autoCapitalize='none'
                autoCompleteType='email'
                keyboardType='email address'
                keyboardAppearance='dark'
                returnKeyType='next'
                returnKeyLabel='next'
                onBlur={handleBlur('Email')}
                value={values.Email}
                error={errors.Email}
                touched={touched.Email}
                onChange={(e: any) => {
                  handleChange('Email');
                  setFieldValue('Email', e.nativeEvent.text)
                }}
              />
            </View>
            <View style={{ width: '100%' }}>
              <Text color='white'>Address:</Text>
              <CustomTextInput
                icon={<Feather name="user" size={16} />}
                placeholder='Address'
                autoCapitalize='none'
                autoCompleteType='text'
                keyboardType='text'
                keyboardAppearance='dark'
                returnKeyType='next'
                returnKeyLabel='next'
                onBlur={handleBlur('Address')}
                value={values.Address}
                error={errors.Address}
                touched={touched.Address}
                onChange={(e: any) => {
                  handleChange('Address');
                  setFieldValue('Address', e.nativeEvent.text)
                }}
              />
            </View>

            <View style={{ width: '100%' }}>
              <Text color='white'>Date Of Birth:</Text>
              <CustomTextInput
                icon={<Feather name="user" size={16} />}
                placeholder='Date Of Birth'
                autoCapitalize='none'
                autoCompleteType='text'
                keyboardType='text'
                keyboardAppearance='dark'
                returnKeyType='next'
                returnKeyLabel='next'
                onBlur={handleBlur('DOB')}
                value={values.DOB}
                error={errors.DOB}
                touched={touched.DOB}
                onChange={(e: any) => {
                  handleChange('DOB');
                  setFieldValue('DOB', e.nativeEvent.text)
                }}
              />
            </View>

            <View>
              <Text color='white'>Hobbies:</Text>
              <View style={styles.tagsContainer}>
                {tags.map((tag: any) => (
                  <TouchableOpacity
                    key={tag}
                    style={styles.tag}
                    onPress={() => handleTagPress(tag)}
                  >
                    <Text style={styles.tagText}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter Hobbies"
                value={inputValue}
                onChangeText={handleInputChange}
              />
            </View>

            <View style={{ justifyContent: 'flex-end', alignItems: 'center',marginTop:10,  }}>
              <CustomButton
              style={{padding:5}}
                title="Add Hobbies" onPress={() => {
                  handleInputSubmit()
                }}
              />
            </View>

            <View style={{ width: '100%' }}>
              <Text color='white'>Biography:</Text>
              <CustomTextArea
                placeholder='Biography'
                autoCapitalize='none'
                autoCompleteType='text'
                keyboardType='text'
                keyboardAppearance='dark'
                returnKeyType='next'
                returnKeyLabel='next'
                onBlur={handleBlur('ShortBiography')}
                value={values.ShortBiography}
                error={errors.ShortBiography}
                touched={touched.ShortBiography}
                disabled={true}
                onChange={(e: any) => {
                  handleChange('ShortBiography');
                  setFieldValue('ShortBiography', e.nativeEvent.text)
                }}
              />
            </View>




            <HStack spacing={3} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
              <View>

                <CustomButton
                  backgroundColor={screenLocalColor}
                  title="CLOSE" onPress={() => {
                    props.navigation.goBack()
                  }}
                />
              </View>
              <View>
                <CustomButton title="SUBMIT" onPress={handleSubmit} />
              </View>
            </HStack>

          </Stack>

        </Stack>
      </ScrollView>

    </ProtectedTeacher>
  )
}
function get(onboardedUser: any) {
  try {
    return JSON.parse(onboardedUser)
  } catch (error) {
    return JSON.parse(JSON.stringify(onboardedUser))
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    padding: 5,
    margin: 2,
  },
  tagText: {
    color: '#333',
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
function mapStateToProps(state: any) {
  return {
    onboardedUser: get(state.appState.onboardedUser),
    teacherDetail: state.profileState.teacherDetail,
    teacherClassAndSubject: state.profileState.teacherClassAndSubject,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    getDetails: (teacherAccountId: string) => GetTeacherDetails(teacherAccountId)(dispatch),
    update: (values: any, teacherAccountId: string, navigation: any) => updateStaffDetails(values, teacherAccountId, navigation)(dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)