import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import ProductDisplayComp from '../productdisplaycomp';

interface RelatedProductsProps {
    relatedProducts: Array<{ key: string,
        name: string,
        description: string,
        stock_quantity: number,
        price: number,
        img_url: string}>;
    navigation: any;
}
const {height, width} = Dimensions.get('window')
const RelatedProducts: React.FC<RelatedProductsProps> = ({ relatedProducts, navigation }) => {
    return (
        <View style={{flex:1,}}>
            <View>
                <Text style={{fontWeight:'bold', marginLeft:10, fontSize:20, marginVertical:10}}>Related Products</Text>
            </View>
            <ProductDisplayComp productsData1={relatedProducts} navigation={navigation} max={relatedProducts.length} />
        </View>
        
    );
}

export default RelatedProducts;