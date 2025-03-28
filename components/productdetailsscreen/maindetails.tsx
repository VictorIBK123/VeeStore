
import { View, Text, Image, Dimensions  } from "react-native"
const MainDetailsComp =({details})=>{
    const {height, width} = Dimensions.get('screen')
    return (
        <View>
            <View style={{marginVertical:10,marginHorizontal:10, flexDirection:'row', alignItems:'center'}}>
                <View style={{width:width/1.5}}>
                    <Text style={{fontSize:18, fontWeight:'bold',}}>{details.name}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly', width:width-width/1.5,}}>
                    <Text style={{fontSize:18, textDecorationStyle:'solid', textDecorationLine:'line-through'}}>$ {details.price}</Text>
                    {/* fifty percent discount on first order */}
                    <Text style={{fontSize:18, textDecorationStyle:'solid', fontWeight:'bold'}}>$ {details.price/2}</Text>
                </View>
            </View>
            <View style={{alignItems:'center', }}>
                <Image source={{uri:details.img_url[0]}} style={{width:300, height:250}} />
            </View>
            <View style={{paddingTop:10, marginBottom:10, borderTopWidth:2, borderColor:'#00000033'}}>
                <Text style={{paddingHorizontal:10, fontSize:15, lineHeight:20,}}>{details.description}</Text>
                <Text style={{paddingHorizontal:10, }} ><Text style={{fontWeight:'bold'}}>Stock Quantity:</Text> {details.stock_quantity}</Text>
            </View>
        </View>
    )
}

export default MainDetailsComp