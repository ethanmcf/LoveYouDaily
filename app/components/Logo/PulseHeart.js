import {useRef, useEffect} from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { colors } from '../../common/styles';

function PulseHeart({size, isRotated}) {
    const pulseValue = useRef(new Animated.Value(1)).current;
    const styles = StyleSheet.create({
        pulse:{
            transform: [{scale: pulseValue}, {rotate: (isRotated ? '-8deg': '0deg')}]
        },
       
    })
    
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseValue, {
                    toValue: 1.2,
                    duration: 1200,
                    delay: 500,
                    useNativeDriver: true
                }),
                Animated.timing(pulseValue, {
                    toValue: 1,
                    duration: 1800,
                    useNativeDriver: true,
                })
            ])  
        ).start()
    });
    
    return (
        <Animated.View style={styles.pulse}>
            <Ionicons name="heart" size={size} color={colors.secondary}/>
        </Animated.View>
    );
}


export default PulseHeart;