import { NavigationProp, Route } from "@react-navigation/native"
import React from "react"
import { View, Image, Text, FlatList, TouchableOpacity, Dimensions } from "react-native"
interface category{
    path: any,
    text: string,
    key: number
}
interface props{
    categories: category[],
    navigation: NavigationProp<any>,
    route: Route<string>
}
const CategoriesComp: React.FC<props> =({navigation,route, categories})=>{
    const {height, width} = Dimensions.get('window')
    return (
        <View>
            <View style={{marginTop:30}}><Text style={{fontSize:19}}>Choose from all our categories</Text></View>
            <FlatList 
                nestedScrollEnabled={true}
                style={{flex:1}}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                data={categories}
                renderItem={({item, index})=>{
                    return(
                        <TouchableOpacity onPress={()=>navigation.navigate('productsdata', { category: item.text})} style={{ borderRadius:8,margin:8}}>
                            <Image alt="loading" source={item.path} resizeMode='cover' style={{ borderRadius:8,height:width/2-10, width:width/2-20}} />
                            <Text style={{textAlign:'center', color:'black'}}>{item.text}</Text>
                        </TouchableOpacity>
                    )
                }}
                />
        </View>
    )
}

export default  CategoriesComp