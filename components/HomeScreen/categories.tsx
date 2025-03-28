import React from "react"
import { View, Image, Text, FlatList, TouchableOpacity } from "react-native"
interface category{
    path: any,
    text: string,
    key: number
}
interface props{
    categories: category[]
}
const CategoriesComp: React.FC<props> =({categories})=>{
    return (
        <View>
            <View style={{marginTop:30}}><Text style={{fontSize:19}}>Choose from all our categories</Text></View>
            <FlatList 
                nestedScrollEnabled={true}
                style={{flex:1}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={categories}
                renderItem={({item, index})=>{
                    return(
                        <TouchableOpacity style={{ borderRadius:8,margin:8}}>
                            <Image alt="loading" source={item.path} resizeMode='cover' style={{ borderRadius:8,height:200, width:180}} />
                            <Text style={{textAlign:'center', color:'black'}}>{item.text}</Text>
                        </TouchableOpacity>
                    )
                }}
                />
        </View>
    )
}

export default  CategoriesComp