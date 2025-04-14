import React from "react"
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, Dimensions } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import ProductDisplayComp from "../productdisplaycomp"
import { NavigationProp } from "@react-navigation/native"
interface Sports{
    key: string,
    name: string,
    description: string,
    stock_quantity: number,
    price: number,
    img_url: string
}
interface Props{
    navigation: NavigationProp<any>,
    sports: Sports[]
}
const SportsComp: React.FC <Props>=({navigation, sports})=>{
    const {height, width} = Dimensions.get('window')
    return (
        <View>
            <View style={{marginHorizontal:5, marginBottom:20,flexDirection:'row', alignItems:'center',marginTop:20, justifyContent:'space-between'}}>
                <View ><Text style={{fontSize:19,  }}>Sport Products</Text></View>
                <TouchableOpacity onPress={()=>navigation.navigate('productsdata', {category: "sports"})} style={{backgroundColor:'green', padding:5, paddingHorizontal:12, borderRadius:5}}><Text style={{color:'white'}}>View all</Text></TouchableOpacity>
            </View>
            <ProductDisplayComp productsData1={sports} navigation={navigation} max={4} />
            </View>
    )
}
export default SportsComp