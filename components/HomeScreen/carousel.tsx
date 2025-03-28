import { View, Text, ImageBackground, Dimensions } from "react-native"
import Carousel, { Pagination } from "react-native-reanimated-carousel"
import { useSharedValue } from "react-native-reanimated"

interface CarouselProps{
    path: any,
    text: string,
    key:number
}
interface CarouselPropsArr{
    data: CarouselProps[],
}
const CarouselComp:React.FC<CarouselPropsArr>= ({data })=>{
    const {height, width} = Dimensions.get('window')
    const progress = useSharedValue(0)
    return(
    <View>
        <Carousel
            autoPlay={true}
            autoPlayInterval={5000}
            data={data}
            height={300}
            onProgressChange={progress}
            width={width}
            renderItem={({item, index})=>{
                return (
                    <View>
                        <ImageBackground source={item.path} style={{backgroundColor:'#1a1a1c',width:width, height:300}}>
                            <View style={{ flex:1, margin:20, borderRadius:10, justifyContent:'flex-end'}}>
                                <Text style={{color:'white', fontSize:18, width:width/1.5,paddingVertical:5, paddingHorizontal:8, borderRadius:8, fontWeight:'bold'}}>{item.text}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                )
            }}
            />
            <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={{ backgroundColor: "rgba(0, 0, 0, 0.2)", borderRadius: 50 }}
                containerStyle={{ gap: 10, marginTop: 10 }}
                activeDotStyle={{backgroundColor:'green'}}
            />
            </View>
)}
export default CarouselComp