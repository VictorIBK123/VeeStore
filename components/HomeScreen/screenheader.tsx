import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { SharedValue } from "react-native-reanimated";
import React from "react";

interface Props{
    measureLayout: (event: {nativeEvent: {layout: {x: number;y: number;width: number;height: number;};};}) => void
    showSide: () => void,
    sideMenuTranslate: SharedValue<number>,
    setSearch : React.Dispatch<React.SetStateAction<boolean>>
    
}
const Header: React.FC<Props> =({measureLayout, showSide, sideMenuTranslate, setSearch})=>{
    const {height, width} = Dimensions.get('window')
    return (
        <View onLayout={measureLayout} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width, height:60, paddingRight:20, paddingLeft:10, marginTop:20}}>
            <TouchableOpacity onPress={showSide}>
                <Feather name="menu" size={28} color="black"/>
            </TouchableOpacity>
            <Text style={{fontWeight:'bold', fontSize:18}}>VeeStore</Text>
            <TouchableOpacity onPress={()=>{sideMenuTranslate.value=(-width/1.5)-10;  setSearch(true)}}>
                <Ionicons name="search" size={28} color="black" />
            </TouchableOpacity>
        </View>
    )
}
export default Header