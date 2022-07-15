import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import PulseHeart from './PulseHeart';
import DailyText from './DailyText';



function MainLogo(props) {
    const styles = StyleSheet.create({
        container: {
            width: 300,
            height: 125,
            justifyContent:"center",
            alignItems: "center",

        },
        loveY:{
            width: 120,
            height: 125,
            position: "absolute",
            left: 50,

        },
        letterU:{
            width: 30,
            height: 30,
            position:"absolute",
            left: 198,
            top: 10
        },
        heartO:{
            position:"absolute",
            top: 13,
            left: 168,
        },
        daily: {
            position:"absolute",
            top: "65%"
        }
    })

    return (
        <View style={styles.container}>
            <Image style={styles.loveY} source={require("../../images/LoveY.png")}/>
            <Image style={styles.letterU} source={require("../../images/RotatedU.png")}/>
            <View style={styles.heartO}>
                <PulseHeart size={35} isRotated={true}/>
            </View>
            
            <View style={styles.daily}>
                <DailyText theMessage="DAILY"/>
            </View>
            
        </View>
    );
}

export default MainLogo;