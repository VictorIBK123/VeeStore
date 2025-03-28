import {Dimensions, TouchableOpacity,Image,View,Text, FlatList, ScrollView } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useMemo } from 'react';
import MainDetailsComp from '../components/productdetailsscreen/maindetails';
import VariantComp from '../components/productdetailsscreen/variants';
const ProductDetails =({route})=>{
    const details = route.params.item
    const {height, width} = Dimensions.get('screen')
    const otherImageData = useMemo(()=>details.img_url.map((item: string, index:number)=>({key:index, img_url:item})),[details]) 


    return (details.length==0? <Text style={{opacity:0}}>Nothing</Text>: 
    <ScrollView showsVerticalScrollIndicator={false} style={[{paddingTop:20, backgroundColor:'white',position:'absolute', height, flex:1 }]}>
        <View style={{height:1000}}>
            <MainDetailsComp details={details} />
            <VariantComp otherImageData={otherImageData} />
            <View style={{flexDirection:'row', marginLeft:10}}>
                <TouchableOpacity style={{padding:5, borderWidth:1, borderRadius:3, marginRight:10, elevation:10, backgroundColor:'green'}}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:5, borderWidth:1, borderRadius:3, elevation:10, backgroundColor:'green'}}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Add to Wishlist</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>)
}
export default ProductDetails