import {Dimensions, TouchableOpacity,Image,View,Text, FlatList, ScrollView } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
const ProductDetails =({route})=>{
    const details = route.params.item
    const {height, width} = Dimensions.get('window')
    const otherImageData = details.img_url.map((item, index)=>({key:index, img_url:item}))


    return (details.length==0? <Text style={{opacity:0}}>Nothing</Text>: 
    <ScrollView style={[{paddingTop:20, backgroundColor:'white',position:'absolute',height, }]}>
        <View>
            <View style={{marginVertical:10,marginHorizontal:10, flexDirection:'row', alignItems:'center'}}>
                <View style={{flex:2/4 }}>
                    <Text style={{fontSize:18, fontWeight:'bold',}}>{details.name}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly', flex:2/4}}>
                    <Text style={{fontSize:18, textDecorationStyle:'solid', textDecorationLine:'line-through'}}>$ {details.price}</Text>
                    {/* fifty percent discount on first order */}
                    <Text style={{fontSize:18, textDecorationStyle:'solid', fontWeight:'bold'}}>$ {details.price/2}</Text>
                </View>
            </View>
            <View style={{alignItems:'center'}}>
                <Image source={{uri:details.img_url[0]}} style={{width:300, height:250}} />
            </View>
            <View style={{paddingTop:10, marginTop:10,marginBottom:10, borderTopWidth:2, borderColor:'#00000033'}}>
                <Text style={{paddingHorizontal:10, fontSize:15, lineHeight:20,}}>{details.description}</Text>
                <Text style={{paddingHorizontal:10, }} ><Text style={{fontWeight:'bold'}}>Stock Quantity:</Text> {details.stock_quantity}</Text>
            </View>

            <View>
                <Text style={{fontSize:18, fontWeight:'bold'}}>You will get all</Text>
                <FlatList
                    horizontal={true}
                    data={otherImageData}
                    renderItem={({item})=>{
                        <View><Image source={item.img_url} />
                        <Text>MaterialIcons</Text><Text>MaterialIcons</Text><Text>MaterialIcons</Text></View>
                    }}
                 />
            </View>
        </View>
        {/* </View> */}
    </ScrollView>)
}
export default ProductDetails