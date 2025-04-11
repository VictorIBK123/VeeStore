
import { View, Text, Image, Dimensions  } from "react-native"
const MainDetailsComp =({details})=>{
    const {height, width} = Dimensions.get('screen')
    return (
        <View>
            <View style={{alignItems:'center', marginBottom:10}}>
                <Image source={{uri:details.img_url[0]}} style={{width:300, height:250}} />
            </View>
            <View style={{backgroundColor:'#f5f5ff', borderRadius:10,}}>
            <View style={{paddingVertical:10,marginHorizontal:10,  padding:10}}>
                <View style={{}}>
                    <Text style={{fontSize:18, fontWeight:'bold',}}>{details.name}</Text>
                </View>
                <View style={{flexDirection:'row', paddingRight:10, alignItems:'center', width:width-width/1.5,}}>
                    <Text style={{fontSize:18, textDecorationStyle:'solid', textDecorationLine:'line-through', marginRight:10}}>$ {details.price}</Text>
                    {/* fifty percent discount on first order */}
                    <Text style={{fontSize:18, textDecorationStyle:'solid', fontWeight:'bold'}}>$ {details.price/2}</Text>
                </View>
            </View>
            <View style={{paddingTop:10, marginBottom:10, borderRadius:10,backgroundColor:'white', marginHorizontal:10, borderColor:'#00000033'}}>
                <Text style={{paddingHorizontal:10,fontWeight:'bold', fontSize:20, marginBottom:10}}>Description</Text>
                <Text style={{paddingHorizontal:10, fontSize:15, lineHeight:20,}}>{details.description}</Text>
                <Text style={{paddingHorizontal:10, }} ><Text style={{fontWeight:'bold'}}>Stock Quantity:</Text > {details.stock_quantity}</Text>
            </View>
            </View>
        </View>
    )
}

export default MainDetailsComp