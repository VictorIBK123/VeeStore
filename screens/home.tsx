import { ActivityIndicator, Dimensions,FlatList,Image, ImageBackground,  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { useEffect, useRef, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { categories } from "../data/categories_data";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { app } from "../firebaseConfig";
import CarouselComp from "../components/HomeScreen/carousel";
import SideMenu from "../components/HomeScreen/sidemenu";
import CategoriesComp from "../components/HomeScreen/categories";
import TrendingComp from "../components/HomeScreen/trendingproducts";
import SearchModeComp from "../components/HomeScreen/searchmode";
import Header from "../components/HomeScreen/screenheader";
import { data } from "../data/carouseldata";
import ElectronicsComp from "../components/HomeScreen/electronicproducts";

export default function Home({navigation, route}){
    var i = 0
    const [search, setSearch] = useState(false)
    const {height, width} = Dimensions.get('window')
    const sideMenuTranslate = useSharedValue((-width/1.5)-10)
    const [headHeight, setHeadHeight] = useState(null)
    const [trending, setTrending]= useState([])
    const [electronics, setElectronics] = useState([])
    const detailBottom = useSharedValue(-(height-10))
    const header = useRef()
    useEffect(()=>{
        async function getData(){
            const db = getFirestore(app)
            const querySnapshot = await getDocs(collection(db, "trending_products"));
            const querySnapshot1 = await getDocs(collection(db, "electronics"));
            var trendingData= []
            var electronicsData =[]
            querySnapshot.forEach((doc)=>{
                trendingData.push({key: `${doc.id}`, name:doc.data().name,description:doc.data().description, stock_quantity:doc.data().stock_quantity, price:doc.data().price, img_url:(doc.data().img_url)})
            })
            querySnapshot1.forEach((doc)=>{
                electronicsData.push({key: `${doc.id}`, name:doc.data().name,description:doc.data().description, stock_quantity:doc.data().stock_quantity, price:doc.data().price, img_url:(doc.data().img_url)})
            })
            setElectronics(electronicsData)
            setTrending(trendingData)
        }
        try{
            getData()
        }
        catch(error){
            console.log('the error')
        }

    },[])
    const measureLayout =(event: { nativeEvent: { layout: { x: number; y: number; width: number; height: number }; }; })=>{
        const {x, y, width, height} = event.nativeEvent.layout
        setHeadHeight(height)
    }
    const showSide =()=>{
        sideMenuTranslate.value==0?sideMenuTranslate.value= withTiming((-width/1.5)-10, {duration:300}):sideMenuTranslate.value= withTiming(0, {duration:300})
    }
    // for side menu
    const animatedSideStyle = useAnimatedStyle(()=>({transform:[{translateX:sideMenuTranslate.value}]}))
    const emptyData =[]
    

    return (
        <View style={{flex:1}}>
                {/* just the screen heading */}
                {!search && <Header measureLayout={measureLayout} showSide={showSide} sideMenuTranslate={sideMenuTranslate} setSearch={setSearch} /> }
        <FlatList
        data={[]}
        renderItem={()=>(<></>)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={()=>(
            <View style={{marginTop:5, flex:1, backgroundColor:'#eeeeff'}}>
            <ExpoStatusBar backgroundColor="black" style="light" />
            {!search && <View>
                <CarouselComp data={data}  />
                <CategoriesComp navigation={navigation} route={route} categories={categories} />
                <TrendingComp navigation={navigation} trending={trending} />
                <ElectronicsComp navigation={navigation} electronics={electronics} />
            </View>
            }
            {search && <SearchModeComp setSearch={setSearch} width={width}/>}
        </View>
        )}
        />
        <SideMenu headHeight={headHeight} animatedSideStyle={animatedSideStyle} />
        </View>
    )
}

