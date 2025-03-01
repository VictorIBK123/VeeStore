import { FlatList,Image, ImageBackground,  ScrollView, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native"
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
export default function Home({navigation}){
    var i = 0
    const [search, setSearch] = useState(false)
    const {height, width} = useWindowDimensions()
    const sideMenuTranslate = useSharedValue((-width/2)-10)
    const [headHeight, setHeadHeight] = useState(null)
    const header = useRef()
    const measureLayout =(event)=>{
        const {x, y, width, height} = event.nativeEvent.layout
        setHeadHeight(height)
    }
    const showSide =()=>{
        sideMenuTranslate.value==0?sideMenuTranslate.value= withTiming((-width/2)-10, {duration:300}):sideMenuTranslate.value= withTiming(0, {duration:300})
    }
    const animatedSideStyle = useAnimatedStyle(()=>({transform:[{translateX:sideMenuTranslate.value}]}))
    const data = [
        {path:require('../assets/Images/announcement/img1.png'),text:'Shop your favourite products anytime, anywhere with just a tap', key:1}, 
        {path:require('../assets/Images/announcement/img2.png'), text:'Be among the first to shop on VeeStore and enjoy 50% OFF on your first order!', key:2}, 
        {path:require('../assets/Images/announcement/img3.png'), text:'Get top notch quality products' ,key:3},
        {path:require('../assets/Images/announcement/img4.jpg'), text:'Love shopping with us? Share the love! Invite your friends to VeeStore and earn $10 for every successful referral' ,key:4},
        {path:require('../assets/Images/announcement/img5.webp'), text:'Enjoy FREE shipping on all orders for the next 7 days!' ,key:5},
        {path:require('../assets/Images/announcement/img6.webp'), text:'Introducing VeeStore VIP! Get early access to sales, exclusive discounts, and free shipping on every order' ,key:6}

    ]
    const categories =[
        {path:require('../assets/Images/categories/elect.png'), text:'Electronics',  key:1},
        {path:require('../assets/Images/categories/sport.jpeg'),text:'Sports',  key:2},
        {path:require('../assets/Images/categories/health.jpg'), text:'Health and Beauty',  key:3},
        {path:require('../assets/Images/categories/fashion.jpeg'),text:'Fashion',  key:4},
        {path:require('../assets/Images/categories/digp.jpeg'),text:'Digital Products',  key:5},
        {path:require('../assets/Images/categories/food.webp'),text:'Food and beverages',  key:6},
    ]
    const flatlistRef= useRef()
    useEffect(()=>{
        setInterval(()=>{show('next', i)}, 10000)
    },[])
    const show =(action, index)=>{
        if (flatlistRef.current){
            if (action=='next' ){
                if (index!=data.length-1){
                    i = index+1
                    flatlistRef.current.scrollToIndex({ index:index+1, animated: true })
                }
                else{
                    i=0
                    flatlistRef.current.scrollToIndex({ index:0, animated: false });
                }
            }
            else if (action=='previous'){
                if (index!=0){
                    i= index-1
                    flatlistRef.current.scrollToIndex({ index:index-1, animated: true })
                }
                else{
                    i= data.length-1
                    flatlistRef.current.scrollToIndex({ index:data.length-1, animated: false });
                }
            }
        }
        
    }
    return (
        <ScrollView>
        <View style={{backgroundColor:'white',marginTop:30, flex:1, marginHorizontal:10}}>
            {!search && <View>
                <View onLayout={measureLayout} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <TouchableOpacity onPress={showSide}>
                        <Feather name="menu" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={{fontWeight:'bold', fontSize:18}}>VeeStore</Text>
                    <TouchableOpacity onPress={()=>{sideMenuTranslate.value=(-width/2)-10;  setSearch(true)}}>
                        <Ionicons name="search" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    ref ={flatlistRef}
                    style={{width}}
                    horizontal={true}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={({item, index})=>{
                        return (
                            <ImageBackground source={item.path} imageStyle={{resizeMode:'contain'}} style={{width, height:300,}}>
                                <TouchableOpacity onPress={()=>{show('previous', index)}} style={{position:'absolute',top:300/2 -15, left:30 }}>
                                <AntDesign name="leftcircle" size={30} color="green" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>show('next', index)} style={{position:'absolute',top:300/2 -15, right:30 }}>
                                    <AntDesign name="rightcircle" size={30} color="green" />
                                </TouchableOpacity>
                                <View style={{justifyContent:'flex-end',alignItems:'center', flex:1, marginBottom:300/10,}}>
                                    <Text style={{backgroundColor:'green',color:'white', width:width/1.5,paddingVertical:5, paddingHorizontal:8, borderRadius:8}}>{item.text}</Text>
                                </View>
                            </ImageBackground>
                        )
                    }}
                 />
                 <View>
                    <View><Text style={{fontSize:19}}>Choose from all our categories</Text></View>
                    <FlatList 
                        contentContainerStyle={{ alignItems:'center'}}
                        numColumns={2}
                        data={categories}
                        renderItem={({item})=>{
                            return(
                                <TouchableOpacity style={{ borderRadius:8,margin:8, backgroundColor:'green'}}>
                                    <Image source={item.path} resizeMode='stretch' style={{backgroundColor:'white', borderRadius:8,height:150, width:150}} />
                                    <Text style={{textAlign:'center', }}>{item.text}</Text>
                                </TouchableOpacity>
                            )
                        }}
                     />
                 </View>
                
            </View>
            }
            {search && 
                <View style={{flexDirection:'row', alignItems:'center',}}>
                    <Text style={{marginRight:25, fontSize:20}}>Search</Text>
                    <TextInput style={{width:width/2, borderWidth:1, borderRadius:20, paddingHorizontal:20, height:30}} />
                    <TouchableOpacity onPress={()=>setSearch(false)}>
                        <MaterialIcons name="cancel" size={24} color="black" />
                    </TouchableOpacity>
                </View>}
            <Animated.View style={[{position:'absolute', backgroundColor:'green', width:width/2,height, marginTop:headHeight}, animatedSideStyle]}>

            </Animated.View>
        </View>
        </ScrollView>
    )
}