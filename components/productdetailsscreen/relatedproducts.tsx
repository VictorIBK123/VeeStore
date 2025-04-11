import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';

interface RelatedProductsProps {
    relatedProducts: { image_url: string[]; name: string; price: number }[];
    navigation: any;
}
const {height, width} = Dimensions.get('window')
const RelatedProducts: React.FC<RelatedProductsProps> = ({ relatedProducts, navigation }) => {
    return (
        <View style={{flex:1,}}>
            <View>
                <Text style={{fontWeight:'bold', marginLeft:10, fontSize:20, marginVertical:10}}>Related Products</Text>
            </View>
        <FlatList
        nestedScrollEnabled={true}
            data={relatedProducts}
            renderItem={({item})=>renderItem(item, navigation, relatedProducts)}
            numColumns={2}
        />
        </View>
        
    );
}
const renderItem = (item, navigation:any, relatedProducts) => (
    <TouchableOpacity onPress={()=>{navigation.navigate('pd', {item, related: relatedProducts})}} style={{ borderRadius:8,margin:8, width:width/2-20, marginBottom:10, backgroundColor:'white', paddingBottom:10}}>
        <Image source={{ uri: item.img_url[0] }} style={{resizeMode:'cover', alignSelf:'center', height:width/2-10, width:width/2-20, borderRadius:5,   }} />
        <View style={{height:50}}>
            <Text style={{ color:'black', width:width/2, marginHorizontal:10, }}>{item.name}</Text>
            <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:10}}><Text style={{textDecorationStyle:'solid', fontWeight:'bold', textDecorationLine:'line-through',marginRight:10 }}>${item.price}</Text><Text>${item.price/2}</Text></View>
        </View>
        <TouchableOpacity style={{elevation:10, marginHorizontal:10, backgroundColor:'green', padding:5, paddingHorizontal:12, borderRadius:5, marginTop:10}} onPress={()=>{}}>
            <Text style={{color:'white'}}>Add to Cart</Text>
        </TouchableOpacity>
    </TouchableOpacity>
);

export default RelatedProducts;