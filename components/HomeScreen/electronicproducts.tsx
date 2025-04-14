import React from "react"
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, Dimensions } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import ProductDisplayComp from "../productdisplaycomp"
interface Electronics{
    key: string,
    name: string,
    description: string,
    stock_quantity: number,
    price: number,
    img_url: string
}
interface Props{
    navigation: any,
    electronics: Electronics[]
}
const ElectronicsComp: React.FC <Props>=({navigation, electronics})=>{
    const {height, width} = Dimensions.get('window')
    return (
        <View>
            <View style={{marginHorizontal:5, marginBottom:20,flexDirection:'row', alignItems:'center',marginTop:20, justifyContent:'space-between'}}>
                <View ><Text style={{fontSize:19,  }}>Electronic Products</Text></View>
                <TouchableOpacity onPress={()=>navigation.navigate('productsdata', {category: "electronics"})} style={{backgroundColor:'green', padding:5, paddingHorizontal:12, borderRadius:5}}><Text style={{color:'white'}}>View all</Text></TouchableOpacity>
            </View>
            <ProductDisplayComp productsData1={electronics} navigation={navigation} max={4} />
            </View>
    )
}
export default ElectronicsComp