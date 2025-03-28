import Animated from "react-native-reanimated"
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native"
import React from "react"
interface props{
    headHeight: number,
    animatedSideStyle: any,
}
const SideMenu: React.FC<props> =({headHeight, animatedSideStyle})=>{
    const {height, width} = Dimensions.get('window')
    return (
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
export default SideMenu