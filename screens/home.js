import { ActivityIndicator, Dimensions,FlatList,Image, ImageBackground,  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native"
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { categories } from "../categories_data";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { app } from "../firebaseConfig";
import Carousel, {Pagination} from "react-native-reanimated-carousel";

export default function Home({navigation}){
    // the below is set like that so that the product detail componnent wont cause error since it also renders together at first render and no product has been clicked
    const [details, setDetails] = useState([])
    const progress = useSharedValue(0)
    var i = 0
    const [search, setSearch] = useState(false)
    const {height, width} = Dimensions.get('window')
    const sideMenuTranslate = useSharedValue((-width/1.5)-10)
    const [headHeight, setHeadHeight] = useState(null)
    const [trending, setTrending]= useState([])
    const detailBottom = useSharedValue(-(height-10))
    const animatedDetailStyle = useAnimatedStyle(()=>({bottom:detailBottom.value}))
    const header = useRef()
    useEffect(()=>{
        async function getData(){
            const db = getFirestore(app)
            const querySnapshot = await getDocs(collection(db, "trending_products"));
            var trendingData= []
            querySnapshot.forEach((doc)=>{
                trendingData.push({key: `${doc.id}`, name:doc.data().name,description:doc.data().description, stock_quantity:doc.data().stock_quantity, price:doc.data().price, img_url:(doc.data().img_url)})
            })
            setTrending(trendingData)
        }
        getData()
    },[])
    const measureLayout =(event)=>{
        const {x, y, width, height} = event.nativeEvent.layout
        setHeadHeight(height)
    }
    const showSide =()=>{
        sideMenuTranslate.value==0?sideMenuTranslate.value= withTiming((-width/1.5)-10, {duration:300}):sideMenuTranslate.value= withTiming(0, {duration:300})
    }
    // for side menu
    const animatedSideStyle = useAnimatedStyle(()=>({transform:[{translateX:sideMenuTranslate.value}]}))
    const emptyData =[]
    const data = [
        {path:require('../assets/Images/announcement/img1.png'),text:'Shop your favourite products anytime, anywhere with just a tap', key:1}, 
        {path:require('../assets/Images/announcement/img2.png'), text:'Be among the first to shop on VeeStore and enjoy 50% OFF on your first order!', key:2}, 
        {path:require('../assets/Images/announcement/img3.png'), text:'Get top notch quality products' ,key:3},
        {path:require('../assets/Images/announcement/img4.png'), text:'Love shopping with us? Share the love! Invite your friends to VeeStore and earn $10 for every successful referral' ,key:4},
        {path:require('../assets/Images/announcement/img5.png'), text:'Enjoy FREE shipping on all orders for the next 7 days!' ,key:5},
        {path:require('../assets/Images/announcement/img6.png'), text:'Introducing VeeStore VIP! Get early access to sales, exclusive discounts, and free shipping on every order' ,key:6}

    ]

    return (
        <View style={{flex:1}}>
                {!search && <View onLayout={measureLayout} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width, height:60, paddingRight:20, paddingLeft:10, marginTop:20}}>
                    <TouchableOpacity onPress={showSide}>
                        <Feather name="menu" size={28} color="black"/>
                    </TouchableOpacity>
                    <Text style={{fontWeight:'bold', fontSize:18}}>VeeStore</Text>
                    <TouchableOpacity onPress={()=>{sideMenuTranslate.value=(-width/1.5)-10;  setSearch(true)}}>
                        <Ionicons name="search" size={28} color="black" />
                    </TouchableOpacity>
                </View>}
        <FlatList
        data={[]}
        renderItem={()=>(<></>)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={()=>(
            <View style={{marginTop:5, flex:1}}>
            <ExpoStatusBar backgroundColor="black" style="light" />
            {!search && <View>
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
                                <ImageBackground source={item.path} imageStyle={{}} style={{backgroundColor:'#1a1a1c',width:width, height:300}}>
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
                 <View>
                    <View style={{marginHorizontal:5, marginBottom:20,flexDirection:'row', alignItems:'center',marginTop:20, justifyContent:'space-between'}}>
                        <View ><Text style={{fontSize:19,  }}>Trending Products</Text></View>
                        <TouchableOpacity style={{backgroundColor:'green', padding:5, paddingHorizontal:12, borderRadius:5}}><Text>View all</Text></TouchableOpacity>
                    </View>
                    <FlatList 
                        ListEmptyComponent={()=>(
                            <ActivityIndicator size={20} color={'green'} />
                        )}
                        nestedScrollEnabled={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{flex:1,}}
                        data={trending}
                        renderItem={({item, index})=>{
                            if (index<3){
                            return(
                                <TouchableOpacity onPress={()=>{navigation.navigate('pd', {item})}} style={{ borderRadius:8,margin:8}}>
                                    <Image alt="loading" source={{uri: item.img_url[0]}} resizeMode='cover' style={{ borderRadius:8,height:200, width:180}} />
                                    <Text style={{textAlign:'center', color:'black'}}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        }}
                     />
                 </View>
            </View>
            }



            {search && 
                <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
                    <Text style={{marginRight:25, fontSize:20}}>Search</Text>
                    <TextInput style={{width:width/2, borderWidth:1, borderRadius:20, paddingHorizontal:20, height:30}} />
                    <TouchableOpacity onPress={()=>setSearch(false)}>
                        <MaterialIcons name="cancel" size={24} color="black" />
                    </TouchableOpacity>
                </View>}
        </View>
        )}
        />

        <Animated.ScrollView style={[{position:'absolute',padding:10, backgroundColor:'green', width:width/1.5,borderBottomRightRadius:5, marginTop:headHeight}, animatedSideStyle]}>
            <TouchableOpacity style={styles.sideMenuTextContainer}>
                <Text style={styles.sideMenuText}>{`>    Trending Products`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideMenuTextContainer}>
                <Text style={styles.sideMenuText}>{`>    New Products`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideMenuTextContainer}>
                <Text style={styles.sideMenuText}>{`>    Categories`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideMenuTextContainer}>
                <Text style={styles.sideMenuText}>{`>    Cart`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideMenuTextContainer}>
                <Text style={styles.sideMenuText}>{`>    Wishlist`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sideMenuTextContainer, {}]}>
                <Text style={styles.sideMenuText}>{`>    Orders`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sideMenuTextContainer, {borderBottomWidth:0}]}>
                <Text style={styles.sideMenuText}>{`>    Profile Information`}</Text>
            </TouchableOpacity>
        </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    sideMenuTextContainer:{
        justifyContent:'center',
        paddingVertical:20,
        borderBottomWidth:2,
        borderColor:'#ffffff55',
    },
    sideMenuText:{
        color:'white'
    }
})