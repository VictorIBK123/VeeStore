import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import { View, Text,ImageBackground, TextInput, TouchableOpacity, Alert, ScrollView, useWindowDimensions, StyleSheet, KeyboardAvoidingView} from "react-native"
import { app,auth } from "../../firebaseConfig"
import { createUserWithEmailAndPassword, updatePhoneNumber, } from "firebase/auth"
import { getAuth, sendEmailVerification , updateProfile} from "firebase/auth"
export default function Signup({navigation}){

  const [emailVerified, setEmailVerified] = useState(false)
  const [signedUp, setSignedUp] = useState(false)
  const [emailUsed, setEmailUsed] = useState(false)
    
  const [email, setEmail] = useState('')
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [backgroundColor, setBackgrounsColor] = useState('black')

  const [emailValidated, setEmailValidated] = useState(false)
  const [passwordValidated, setPasswordValidated] = useState(false)
  const [fNameValidated, setFNameValidated] = useState(false)
  const [lNameValidated, setLNameValidated] = useState(false)
  const [userNameValidated, setUserNameValidated] = useState(false)
  const [phoneValidated, setPhoneValidated] = useState(false)
  const [confirmValidated, setConFirmValidated] = useState(false)
  const [subAll, setSubAll] = useState(true)

  const [emailBlurred, setEmailBlurred] = useState(false)
  const [passwordBlurred, setPasswordBlurred] = useState(false)
  const [fNameBlurred, setFNameBlurred] = useState(false)
  const [lNameBlured, setLNameBlurred] = useState(false)
  const [userNameBlurred, setUserNameBlurred] = useState(false)
  const [phoneBlurred, setPhoneBlurred] = useState(false)
  const [confirmBlurred, setConfirmBlurred] = useState(false)

  const authenticate =()=>{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      sendEmailVerification(auth.currentUser)
      .then(() => {
        setSignedUp(true)
        setInterval(async()=>{
          await auth.currentUser.reload()
          if (auth.currentUser!=null ){
            if (auth.currentUser.emailVerified){
              updateProfile(auth.currentUser, {
                displayName: `${username}`
              }).then(() => {
                // Profile updated!
                // ...
              }).catch((error) => {
                alert(error.message)
              });
              navigation.navigate('home')
            } 
          }
        },3000)
        
      });
        })
    .catch((error)=>{
      if (error.message == 'Firebase: Error (auth/network-request-failed).'){
        alert('Network request failed, ensure you have a good internet connection')
      }
      else if(error.message=='Firebase: Error (auth/email-already-in-use).'){
        setEmailUsed(true)
      }
      else{
        alert(error.message)
      }
    })
  }
    

const updateData=(value, type)=>{
  switch (type) {
    case 'email':
      if (!value.includes(' ') && value.includes('@') && value.includes('.com')){
        setEmailValidated(true)
      }
      else{
        setEmailValidated(false)
      }
      setEmail(value)
      break;
    case 'firstname':
      if (value.length >1){
        setFNameValidated(true)
      }
      else{
        setFNameValidated(false)
      }
      setFName(value)
      break;
    case 'lastname':
      if (value.length>1){
        setLNameValidated(true)
      }
      else{
        setLNameValidated(false)
      }
      setLName(value)
      break
    case 'username':
      if (value.length >1 && !value.includes(' ')){
        setUserNameValidated(true)
      }
      else{
        setUserNameValidated(false)
      }
      setUsername(value)
      break;
    case 'phone':
      if ((value.length==10 && value[0]!=0) || (value.length==11 && value[0]==0)){
        setPhoneValidated(true)
      }
      else{
        setPhoneValidated(false)
      }
      setPhone(value)
      break;
    case 'password':
      if (!value.includes(' ') && value.length>=8 && /[a-zA-Z]/.test(value) && /\d/.test(value) && /[!@#$%^&*90,.?":{}|<>]/.test(value) ){
        setPasswordValidated(true)
        if (value==confirm){
          setConFirmValidated(true)
        }
        else{
          setConFirmValidated(false)
        }
      }
      else{
        setPasswordValidated(false)
      }
      setPassword(value)
      break;
    case 'confirm':
      if (password==value){
        setConFirmValidated(true)
      }
      else{
        setConFirmValidated(false)
      }
      setConfirm(value)
      break;
  }
}
const proceedFunc=()=>{
  if (fNameValidated && lNameValidated && userNameValidated && phoneValidated && emailValidated && passwordValidated && confirmValidated){
    setSubAll(true)
    authenticate()
  }
  else{
    setSubAll(false)
  }
  
}
  const {height, width} = useWindowDimensions()
  return(
    <ImageBackground style={[styles.imgBackground, {backgroundColor}]}
        imageStyle={{opacity:0.4}}
        source={require('../../assets/background.jpeg')}>
      <ScrollView scrollsToTop={emailUsed} style={{ width:330,backgroundColor:'#ffffff55',paddingHorizontal:15,borderRadius:5, borderColor: 'white', marginVertical:20,paddingVertical:10 }}>
      <View >
        <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center'}}>
          <Text style={{textTransform:'capitalize', fontSize:20,fontWeight:'bold', textAlign:'center', color:'black'}}>Sign Up</Text><TouchableOpacity onPress={()=>{navigation.navigate('login')}} style={{alignSelf:'flex-end'}}><Text style={{color:'blue', textDecorationLine:'underline', paddingLeft:10}}>or Log in</Text></TouchableOpacity>
        </View>
        <Text style={{fontSize: 17,marginTop:10}}>E-mail</Text>
        <View style={{alignItems:'center',flexDirection:'row',marginTop:10,borderWidth: 1, borderColor: 'white', padding:5,backgroundColor:'#00000055'}}>
          <TextInput onBlur={()=>setEmailBlurred(true)} value={email} onChangeText={(text)=>{updateData(text, 'email')}} keyboardType='email-address' style={{color:'white',height:'100%', width:'100%'}}/>
        </View>
        {emailBlurred && !emailValidated && <Text style={{color:'red'}}>email is incorrect</Text>}
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1/2, paddingRight:5}}>
            <Text style={{ fontSize: 17,marginTop:10}}>First Name</Text>
            <View style={{alignItems:'center',flexDirection:'row', marginTop:10,borderWidth: 1, borderColor: 'white', padding:5, backgroundColor:'#00000055',}}>
              <TextInput onBlur={()=>setFNameBlurred(true)} value={fName} onChangeText={(text)=>{updateData(text, 'firstname')}} style={{color:'white', height:'100%', width:'100%'}}/>
            </View>
            {fNameBlurred && !fNameValidated && <Text style={{color:'red'}}>Length must be at least 2</Text>}
          </View>
          <View style={{flex:1/2}}>
            <Text style={{ fontSize: 17,marginTop:10}}>Last Name</Text>
            <View style={{alignItems:'center',flexDirection:'row', marginTop:10,borderWidth: 1, borderColor: 'white', padding:5, backgroundColor:'#00000055',}}>
              <TextInput onBlur={()=>setLNameBlurred(true)} value={lName} onChangeText={(text)=>{updateData(text, 'lastname')}} style={{color:'white', height:'100%', width:'100%'}}/>
            </View>
            {lNameBlured && !lNameValidated && <Text style={{color:'red'}}>Length must be at least 2</Text>}
          </View>
        </View>

        <View style={{flexDirection:'row'}}>
          <View style={{flex:1/2, paddingRight:5}}>
            <Text style={{ fontSize: 17,marginTop:10}}>Username</Text>
            <View style={{alignItems:'center',flexDirection:'row', marginTop:10,borderWidth: 1, borderColor: 'white', padding:5, backgroundColor:'#00000055',}}>
              <TextInput onBlur={()=>setUserNameBlurred(true)} value={username} onChangeText={(text)=>{updateData(text, 'username')}} style={{color:'white', height:'100%', width:'100%'}}/>
            </View>
            {userNameBlurred && !userNameValidated && <Text style={{color:'red'}}>Length must be at least 2 and must not contain spaces</Text>}
          </View>
          <View style={{flex:1/2}}>
            <Text style={{ fontSize: 17,marginTop:10}}>Phone</Text>
            <View style={{alignItems:'center',flexDirection:'row', marginTop:10,borderWidth: 1, borderColor: 'white', padding:5, backgroundColor:'#00000055',}}>
              <TextInput onBlur={()=>setPhoneBlurred(true)} value={phone} onChangeText={(text)=>{updateData(text, 'phone')}} keyboardType="numeric"  style={{color:'white', height:'100%', width:'100%'}}/>
            </View>
            {phoneBlurred && !phoneValidated && <Text style={{color:'red'}}>Incorrect format</Text>}
          </View>
        </View>
        
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1/2, paddingRight:5}}>
            <Text style={{ fontSize: 17,marginTop:10}}>Password</Text>
            <View style={{alignItems:'center',flexDirection:'row', marginTop:10,borderWidth: 1, borderColor: 'white', padding:5, backgroundColor:'#00000055',}}>
              <TextInput onBlur={()=>setPasswordBlurred(true)} value={password} onChangeText={(text)=>{updateData(text, 'password')}} secureTextEntry={true}  style={{color:'white', height:'100%', width:'100%'}}/>
            </View>
            {passwordBlurred && !passwordValidated && <View><Text style={{color:'red'}}>{'Incorrect password format, must contain one of the special characters, !@#$%^&*90,.?":{}|<></>, must contain at least a digit and must not contain spaces'}</Text></View>}
          </View>
          <View style={{flex:1/2}}>
            <Text style={{fontSize: 17,marginTop:10}}>Re-enter</Text>
            <View style={{alignItems:'center',flexDirection:'row',marginTop:10,borderWidth: 1, borderColor: 'white', padding:5,backgroundColor:'#00000055'}}>
              <TextInput onBlur={()=>setConfirmBlurred(true)} value={confirm} onChangeText={(text)=>{updateData(text, 'confirm')}} secureTextEntry={true} style={{color:'white',eight:'100%', width:'100%'}}/>
            </View>
              {confirmBlurred && !confirmValidated &&  <Text style={{color:'red'}}>password does not match</Text>}
          </View>
        </View>
        
        <View style={{flexDirection:'row-reverse', marginBottom:20, justifyContent:'space-between', marginTop:30, alignItems:'center'}}>
          <TouchableOpacity onPress={proceedFunc} style={{backgroundColor:'#2e64d1', padding:4, borderRadius:5}}>
            <Text style={{fontSize:16, color:'white'}}>Proceed</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={{}}>
            <Text style={{color: 'blue',  fontSize:16,borderRadius:3}}>Sign up with google</Text>
          </TouchableOpacity>
        </View>
        {signedUp && <Text style={{marginBottom:20, color:'blue'}}>Email verification link has been sent to {email}</Text>}
        {emailUsed && <Text style={{marginBottom:20, color:'red', fontSize:16}}>Email already exists</Text>}
        {!subAll && <View style={{marginBottom:20}}>
          <Text style={{color:'red'}}>Please, vaidate all inputs to proceed</Text>
        </View>}
        
      </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imgBackground:{
    height:'100%', 
    width:'100%', 
    justifyContent:'center', 
    alignItems:'center',
  }
})