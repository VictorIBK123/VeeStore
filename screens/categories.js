import { View, Text, FlatList,TouchableOpacity,Image, useWindowDimensions } from "react-native"
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar"
import { categories } from "../categories_data"
export default function Categories(){
    const {height, width} = useWindowDimensions()
    return (
            <View style={{flex:1, marginVertical:15}}>
                <ExpoStatusBar backgroundColor="black" style="light" />
                <FlatList 
                    style={{flex:1}}
                    contentContainerStyle={{alignItems:'center'}}
                    numColumns={2}
                    data={categories}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity style={{ borderRadius:8,margin:8, backgroundColor:'green'}}>
                                <Image source={item.path} resizeMode='cover' style={{backgroundColor:'white', borderRadius:8,height:(43/100)*width, width:(43/100)*width}} />
                                <Text style={{textAlign:'center', }}>{item.text}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    />
                </View>)
}