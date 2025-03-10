import { FlatList,Image, ImageBackground,  ScrollView, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native"
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { categories } from "../categories_data";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
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
    const emptyData =[]
    const data = [
        {path:require('../assets/Images/announcement/img1.png'),text:'Shop your favourite products anytime, anywhere with just a tap', key:1}, 
        {path:require('../assets/Images/announcement/img2.png'), text:'Be among the first to shop on VeeStore and enjoy 50% OFF on your first order!', key:2}, 
        {path:require('../assets/Images/announcement/img3.png'), text:'Get top notch quality products' ,key:3},
        {path:require('../assets/Images/announcement/img4.jpg'), text:'Love shopping with us? Share the love! Invite your friends to VeeStore and earn $10 for every successful referral' ,key:4},
        {path:require('../assets/Images/announcement/img5.webp'), text:'Enjoy FREE shipping on all orders for the next 7 days!' ,key:5},
        {path:require('../assets/Images/announcement/img6.webp'), text:'Introducing VeeStore VIP! Get early access to sales, exclusive discounts, and free shipping on every order' ,key:6}

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
        <View style={{flex:1}}>
        <View onLayout={measureLayout} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width, height:80, paddingRight:20, paddingLeft:10, marginTop:10}}>
                    <TouchableOpacity onPress={showSide}>
                        <Feather name="menu" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={{fontWeight:'bold', fontSize:18}}>VeeStore</Text>
                    <TouchableOpacity onPress={()=>{sideMenuTranslate.value=(-width/2)-10;  setSearch(true)}}>
                        <Ionicons name="search" size={28} color="black" />
                    </TouchableOpacity>
                </View>
        <FlatList
        ListEmptyComponent={()=>(
            <View style={{marginTop:10, flex:1, marginHorizontal:10}}>
            <ExpoStatusBar backgroundColor="black" style="light" />
            {!search && <View>
                
                <FlatList
                    ref ={flatlistRef}
                    style={{width}}
                    horizontal={true}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={({item, index})=>{
                        return (
                            <View>
                                <ImageBackground source={item.path} imageStyle={{resizeMode:'cover'}} style={{width, height:250,}}>
                                    <TouchableOpacity onPress={()=>{show('previous', index)}} style={{position:'absolute',top:300/2 -15, left:30 }}>
                                    <AntDesign name="leftcircle" size={30} color="green" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>show('next', index)} style={{position:'absolute',top:300/2 -15, right:30 }}>
                                        <AntDesign name="rightcircle" size={30} color="green" />
                                    </TouchableOpacity>
                                </ImageBackground>
                                <View style={{ flex:1, margin:20, borderRadius:10}}>
                                    <Text style={{color:'green', width:width/1.5,paddingVertical:5, paddingHorizontal:8, borderRadius:8, fontWeight:'bold'}}>{item.text}</Text>
                                </View>
                            </View>
                        )
                    }}
                 />
                 <View>
                    <View><Text style={{fontSize:19}}>Choose from all our categories</Text></View>
                    <FlatList 
                        ListFooterComponent={()=>{
                            return(
                            <TouchableOpacity onPress={()=>navigation.navigate('categories')} style={{alignItems:'flex-end', width,  }}>
                                <Text style={{alignItems:'flex-end',margin:10, padding:5, backgroundColor:'green', borderRadius:5, paddingHorizontal:8}}>View All</Text>
                            </TouchableOpacity>
                            )
                        }}
                        nestedScrollEnabled={true}
                        style={{flex:1,alignItems:'center'}}
                        numColumns={2}
                        data={categories}
                        renderItem={({item, index})=>{
                            if (index<4){
                            return(
                                <TouchableOpacity style={{ borderRadius:8,margin:8, backgroundColor:'green'}}>
                                    <Image source={item.path} resizeMode='cover' style={{backgroundColor:'white', borderRadius:8,height:(43/100)*width, width:(43/100)*width}} />
                                    <Text style={{textAlign:'center', color:'white'}}>{item.text}</Text>
                                </TouchableOpacity>
                            )}
                        }}
                     />
                 </View>
                 <View>
                    <View><Text style={{fontSize:19}}>Trending Products</Text></View>
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
        )}
        />
        </View>
    )
}