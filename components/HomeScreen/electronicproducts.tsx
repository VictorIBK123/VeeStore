import React from "react"
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from "react-native"
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
    return (
        <View>
            <View style={{marginHorizontal:5, marginBottom:20,flexDirection:'row', alignItems:'center',marginTop:20, justifyContent:'space-between'}}>
                <View ><Text style={{fontSize:19,  }}>Electronic Products</Text></View>
                <TouchableOpacity style={{backgroundColor:'green', padding:5, paddingHorizontal:12, borderRadius:5}}><Text>View all</Text></TouchableOpacity>
            </View>
            <FlatList 
                ListEmptyComponent={()=>(
                    <ActivityIndicator size={20} color={'green'} />
                )}
                nestedScrollEnabled={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{flex:1,}}
                data={electronics}
                renderItem={({item, index})=>{
                    if (index<3){
                    return(
                        <TouchableOpacity onPress={()=>{navigation.navigate('pd', {item})}} style={{ borderRadius:8,margin:8}}>
                            <Image alt="loading" source={{uri: item.img_url[0]}} resizeMode='cover' style={{ borderRadius:8,height:200, width:180}} />
                            <Text style={{textAlign:'center', color:'black'}}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                }}
                />
            </View>
    )
}
export default ElectronicsComp