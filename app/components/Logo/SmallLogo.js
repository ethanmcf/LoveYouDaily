import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PulseHeart from './PulseHeart';

function SmallLogo(props) {
    const styles = StyleSheet.create({
        container:{
            width: 75,
            height: 75,
            justifyContent:"center",
            alignItems: "center",
            transform: [{scale: 0.6}],
            opacity: 0.7,

        },
        letterL: {
            position:"absolute",
            width: 28,
            height: 40,
            left: 10,
            top: 10,
        },
        letterU:{
            position:"absolute",
            width: 17,
            height: 17,
            right: 23,
            bottom: 9,
        },
        heart:{
            bottom: 23,
            right: 23,
            position:"absolute"
        }
    })
    return (
        <View style={styles.container}>
            <Image style={styles.letterL} source={require("../../images/SecondaryL.png")}/>
            <View style={styles.heart}>
                <PulseHeart size={22}/>
            </View>
            
            <Image style={styles.letterU} source={require("../../images/U.png")}/>
        </View>
    );
}

export default SmallLogo;