import { NavigationProp } from "@react-navigation/native"
import React from "react"
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, Dimensions } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
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
            <FlatList 
                ListEmptyComponent={()=>(
                    <ActivityIndicator size={20} color={'green'} />
                )}
                nestedScrollEnabled={true}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                style={{flex:1,}}
                data={trending}
                renderItem={({item, index})=>{
                    if (index<4){
                    return(
                        <TouchableOpacity onPress={()=>{navigation.navigate('pd', {item, related: trending})}} style={{ borderRadius:8,margin:8, width:width/2-20, marginBottom:10, backgroundColor:'white', paddingBottom:10}}>
                            <Image alt="loading" source={{uri: item.img_url[0]}} resizeMode='cover' style={{alignSelf:'center', borderRadius:8,height:width/2-10, width:width/2-20, marginBottom:10}} />
                            <View style={{height:50}}>
                                <Text style={{ color:'black', width:width/2, marginHorizontal:10, }}>{item.name}</Text>
                                <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:10}}><Text style={{textDecorationStyle:'solid', fontWeight:'bold', textDecorationLine:'line-through',marginRight:10 }}>${item.price}</Text><Text>${item.price/2}</Text></View>
                            </View>
                            <TouchableOpacity style={{elevation:10,marginHorizontal:10, backgroundColor:'green', padding:5, paddingHorizontal:12, borderRadius:5, marginTop:10}} onPress={()=>{navigation.navigate('cart')}}>
                                <Text style={{color:'white', textAlign:'center'}}>Add to Cart</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{position:'absolute', right:10, top:10}}>
                                <MaterialIcons name="favorite" size={24} color="#999999" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                }}
                />
            </View>
    )
}
export default TrendingComp