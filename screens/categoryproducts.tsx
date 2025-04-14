import { collection, getDocs, getFirestore, QuerySnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { View, Image, Text, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native"
import { app } from "../firebaseConfig"
import { NavigationProp } from "@react-navigation/native"
import ProductDisplayComp from "../components/productdisplaycomp"
interface props{
    category: string,
    navigation: NavigationProp<any>
}
interface ProductsData{
    key: string,
    name: string,
    description: string,
    stock_quantity: number,
    price: number,
    img_url: string
}
const ProductDataComp: React.FC<props & { route: { params: { category: string } } }> = ({ navigation, route }) => {
    const [productsData1, setProductsData1] = useState<ProductsData[] | undefined>([])
    const { height, width } = Dimensions.get('window')
    const db = getFirestore(app)
    const productsData: ProductsData[] = []
    useEffect(() => { (async () => {
        const querySnapshot = await getDocs(collection(db, route.params.category.toLowerCase()));
        querySnapshot.forEach((doc) => {
            productsData.push({ key: `${doc.id}`, name: doc.data().name, description: doc.data().description, stock_quantity: doc.data().stock_quantity, price: doc.data().price, img_url: (doc.data().img_url) })
        })
        setProductsData1(productsData)
    })()
    }, [])

    return (
        <View style={{flex:1}}> 
            <ProductDisplayComp productsData1={productsData1} navigation={navigation} max={productsData1.length} />
        </View>
    )
}

export default  ProductDataComp