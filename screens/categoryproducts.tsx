import { collection, getDocs, getFirestore, QuerySnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { View, Image, Text, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native"
import { app } from "../firebaseConfig"
import { NavigationProp } from "@react-navigation/native"
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
    const [productsData1, setProductsData1] = useState<ProductsData[] | undefined>()
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
            <FlatList
                ListEmptyComponent={() => (
                    <ActivityIndicator size={20} color={'green'} />
                )}
                nestedScrollEnabled={true}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1, }}
                data={productsData1}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => { navigation.navigate('pd', { item, related: productsData1 }) }} style={{ borderRadius: 8, margin: 8, width: width / 2 - 20, marginBottom: 10, backgroundColor: 'white', paddingBottom: 10 }}>
                            <Image alt="loading" source={{ uri: item.img_url[0] }} resizeMode='cover' style={{ borderRadius: 8, height: width / 2 - 10, width: width / 2 - 20, marginBottom: 10 }} />
                            <View style={{ height: 50 }}>
                                <Text style={{ color: 'black', marginHorizontal: 10 }}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}><Text style={{ textDecorationStyle: 'solid', fontWeight: 'bold', textDecorationLine: 'line-through', marginRight: 10 }}>${item.price}</Text><Text>${item.price / 2}</Text></View>
                            </View>
                            <TouchableOpacity style={{ elevation: 10, marginHorizontal: 10, backgroundColor: 'green', padding: 5, paddingHorizontal: 12, borderRadius: 5, marginTop: 10 }} onPress={() => { navigation.navigate('cart') }}>
                                <Text style={{textAlign:'center', color: 'white' }}>Add to Cart</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )
                }
                }
            />
        </View>
    )
}

export default  ProductDataComp