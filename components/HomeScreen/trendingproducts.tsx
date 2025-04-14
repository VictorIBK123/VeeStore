import { NavigationProp } from "@react-navigation/native"
import React from "react"
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, Dimensions } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import ProductDisplayComp from "../productdisplaycomp"
interface Trending{
    key: string,
    name: string,
    description: string,
    stock_quantity: number,
    price: number,
    img_url: string
}
interface Props{
    navigation: NavigationProp<any>,
    trending: Trending[]
}
const TrendingComp: React.FC <Props>=({navigation, trending})=>{
    const {height, width} = Dimensions.get('window')
    return (
        <View>
            <View style={{marginHorizontal:5, marginBottom:20,flexDirection:'row', alignItems:'center',marginTop:20, justifyContent:'space-between'}}>
                <View ><Text style={{fontSize:19,  }}>Trending Products</Text></View>
                <TouchableOpacity onPress={()=>navigation.navigate('productsdata', {category: "trending_products"})} style={{backgroundColor:'green', padding:5, paddingHorizontal:12, borderRadius:5}}><Text style={{color:'white'}}>View all</Text></TouchableOpacity>
            </View>
            <ProductDisplayComp productsData1={trending} navigation={navigation} max={4} />
            </View>
    )
}
export default TrendingComp