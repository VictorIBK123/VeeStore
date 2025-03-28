import React, { Dispatch, SetStateAction } from "react"
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, Text, TouchableOpacity, TextInput } from "react-native"
interface Props{
    setSearch: Dispatch<SetStateAction<boolean>>,
    width: number
}
const SearchModeComp: React.FC<Props> =({setSearch, width})=>{
    return (
        <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
            <Text style={{marginRight:25, fontSize:20}}>Search</Text>
            <TextInput style={{width:width/2, borderWidth:1, borderRadius:20, paddingHorizontal:20, height:30}} />
            <TouchableOpacity onPress={()=>setSearch(false)}>
                <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}
export default SearchModeComp