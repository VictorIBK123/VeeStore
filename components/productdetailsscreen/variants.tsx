import React from "react"
import { View, Text, FlatList, Image, Dimensions } from "react-native"
interface OtherImageData{
    key: number,
    img_url: string
}
interface Props{
    otherImageData: OtherImageData[]
}
const VariantComp: React.FC<Props> =({otherImageData})=>{
    const {height, width} = Dimensions.get('screen')
    return (
        <View style={{ marginBottom:10, borderTopWidth:2, borderColor:'#00000033'}}>
            <Text style={{fontSize:18,marginLeft:10, fontWeight:'bold', marginBottom:20, marginTop: 30}}>You will get all</Text>
            <FlatList
                horizontal={true}
                data={otherImageData}
                renderItem={({item, index})=>{
                    return (
                        <View style={{flex:1/3, width:width/3, alignItems:'center'}}><Image source={{uri:item.img_url}} style={{width:width/3 -20, height:110, borderRadius:5}} />
                        <Text>Variant <Text>{index+1}</Text></Text></View>
                    )
                }}
                />
        </View>
    )
}
export default VariantComp