import React from "react"
import { TouchableOpacity, Text, Image, ActivityIndicator, FlatList, View, Dimensions } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

interface ProductDisplayCompProps {
    productsData1: Array<{ key: string,
        name: string,
        description: string,
        stock_quantity: number,
        price: number,
        img_url: string}>;
    navigation: { navigate: (screen: string, params?: any) => void };
    max: number
}

const ProductDisplayComp: React.FC<ProductDisplayCompProps> = ({ productsData1, navigation, max }) => {
    const {height, width} = Dimensions.get('window')
    return (
        <FlatList 
            ListEmptyComponent={()=>(
                <ActivityIndicator size={20} color={'green'} />
            )}
            nestedScrollEnabled={true}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            style={{flex:1,}}
            data={productsData1}
            renderItem={({item, index})=>{
                if (index<max){
                return(
                    <TouchableOpacity onPress={()=>{navigation.navigate('pd', {item, related: productsData1})}} style={{ borderRadius:8,margin:8, width:width/2-20, marginBottom:10, backgroundColor:'white', paddingBottom:10}}>
                        <Image alt="loading" source={{uri: item.img_url[0]}} resizeMode='cover' style={{ borderRadius:8,height:width/2-10, width:width/2-20, marginBottom:10}} />
                        <View  style={{height:50}}>
                            <Text style={{ color:'black', marginHorizontal:10}}>{item.name}</Text>
                            <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:10}}><Text style={{textDecorationStyle:'solid', fontWeight:'bold', textDecorationLine:'line-through',marginRight:10 }}>${item.price}</Text><Text>${item.price/2}</Text></View>
                        </View>
                        <TouchableOpacity style={{elevation:10, marginHorizontal:10, backgroundColor:'green', padding:5, paddingHorizontal:12, borderRadius:5, marginTop:10}} onPress={()=>{navigation.navigate('cart')}}>
                            <Text style={{color:'white', textAlign:'center'}}>Add to Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:'absolute', right:10, top:10}}>
                            <MaterialIcons name="favorite" size={24} color="#999999" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            }}
            />
    )
}
export default ProductDisplayComp