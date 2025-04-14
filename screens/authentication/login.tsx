import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import { View, Text, Image, ImageBackground, TextInput, StyleSheet, TouchableOpacity, Alert, TouchableHighlight, ActivityIndicator, } from "react-native"
import { auth } from "../../firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Formik } from "formik"
import * as  Yup from 'yup'
export default function Login({navigation}){
  const [signing, setSigning] = useState(false)
  const authenticate =(values)=>{
    setSigning(true)
    // logging in with email and password
    signInWithEmailAndPassword(auth, values.email, values.password)
    .then(async(userCredential) => {
      await auth.currentUser.reload()
      if (auth.currentUser.emailVerified){
        setSigning(false)
        navigation.navigate('home')
      }
  })
  .catch((error)=>{
    setSigning(false)
    Alert.alert(error.code, error.message)
  })
}
// form validation
const loginSchema= Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please, enter your email'),
    password: Yup.string().min(6, 'Password is too short, min 6 chars').max(15, 'Password is too long, max 15 chars').required('Please, enter your password').matches(/^\S*$/, 'Password must not contain spaces')
  })
  
  const [backgroundColor, setBackgrounsColor] = useState('black')
  const [textColor, setTextColor] = useState('white')

  return(
    <Formik
      initialValues={{
        'email':'',
        'password':'',
      }}
      onSubmit={(values)=>{authenticate(values)}}
      validationSchema={loginSchema} //validation
    >
      {({handleSubmit, handleBlur, handleChange, values, errors, touched, isValid})=>(
        <ImageBackground style={[styles.imgBackground, {backgroundColor}]}
    imageStyle={{opacity:0.4}}
    source={require('../../assets/background.jpeg')}>
          <View style={{width:330, height:300,backgroundColor:'#ffffff55',borderRadius:5, borderColor: 'white', paddingHorizontal:15}}>
            <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center'}}>
              <Text style={{textTransform:'capitalize', fontSize:23,fontWeight:'bold', textAlign:'center', color:'black'}}>Log In </Text><TouchableOpacity onPress={()=>{navigation.navigate('signup')}} style={{alignSelf:'flex-end'}}><Text style={{color:'blue', textDecorationLine:'underline', paddingLeft:10}}>or Sign up</Text></TouchableOpacity>
            </View>
            <Text style={styles.headers}>E-mail</Text>
            <View style={styles.inputContainer}>
              <TextInput onBlur={handleBlur('email')} onChangeText={handleChange('email')} value={values.email}  style={styles.input}/>
            </View>
            <View>
              {touched.email && errors.email && <Text style={{color:'#dd3333'}}>{errors.email}</Text>}
              {touched.email && !errors.email && <Text style={styles.valid}>Email rules passed</Text>}
            </View>
            <Text style={styles.headers}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput onBlur={handleBlur('password')} onChangeText={handleChange('password')} value={values.password} secureTextEntry={true} style={styles.input}/>
            </View>
            <View>
              {touched.password && errors.password && <Text style={{color:'#dd3333'}}>{errors.password}</Text>}
              {touched.password && !errors.password && <Text style={styles.valid}>Password rules passed</Text>}
            </View>
            <View style={{flexDirection:'row-reverse'}}>
              <TouchableOpacity disabled={signing} onPress={()=>{handleSubmit()}} style={{backgroundColor:'#2e64d1', padding:4, borderRadius:5}}>
                <Text style={{fontSize:16, color:'white'}}>Proceed</Text>
              </TouchableOpacity>
            </View>
            {signing && <ActivityIndicator size={50} color={'green'} />}
            <TouchableOpacity  style={{position:'absolute', bottom:2, left:15}}>
              <Text style={{color: 'blue',  fontSize:14, paddingHorizontal:5, borderRadius:3}}>Sign in with google</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={{position:'absolute', bottom:2, right:0}}>
              <Text style={{color: 'blue', fontSize:14,  paddingHorizontal:5, borderRadius:3}}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </Formik>
  )
}
const styles = StyleSheet.create({
  valid:{
    color:'#44ff33'
  },
  headers:{
    fontSize: 17,
    marginTop:10,
  },
  inputContainer:{
    alignItems:'center',
    flexDirection:'row',
    marginTop:10,
    borderWidth: 1, 
    borderColor: 'white', 
    padding:10,
    backgroundColor:'#00000055',
    borderRadius:5
  },
  input:{
    color:'white', 
    height:'100%', 
    width:'100%',
  },
  imgBackground:{
    height:'100%', 
    width:'100%', 
    justifyContent:'center', 
    alignItems:'center'
  }
})