import {Dimensions, TouchableOpacity,Image,View,Text, FlatList, ScrollView } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useMemo } from 'react';
import MainDetailsComp from '../components/productdetailsscreen/maindetails';
import VariantComp from '../components/productdetailsscreen/variants';
import RelatedProducts from '../components/productdetailsscreen/relatedproducts';
const ProductDetails =({navigation,route})=>{
    const details = route.params.item
    const otherImageData = useMemo(()=>details.img_url.map((item: string, index:number)=>({key:index, img_url:item})),[details]) 
    return (details.length==0? <Text style={{opacity:0}}>Nothing</Text>: 
    <ScrollView scrollsToTop={true} showsVerticalScrollIndicator={false} style={[{backgroundColor:'#eeeeff', flex:1 }]}>
        <View style={{}}>
            <MainDetailsComp details={details} />
            <VariantComp otherImageData={otherImageData} />
            <TouchableOpacity style={{padding:5, paddingVertical:10, borderRadius:3, marginHorizontal:30, elevation:10, backgroundColor:'green'}}>
                <Text style={{color:'white', fontWeight:'bold', textAlign:'center'}}>Add to Cart</Text>
            </TouchableOpacity>
            <RelatedProducts relatedProducts={route.params.related} navigation={navigation} />
        </View>
    </ScrollView>)
}
export default ProductDetails