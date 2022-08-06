import {useState, useRef} from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors } from '../../common/styles';
function VoiceVisualization(props) {
    const styles = StyleSheet.create({
        container: {
            width: "80%",
            height: 200,
            position:"absolute",
            justifyContent:"space-between",

            borderRadius: 10,
            borderColor: colors.main,
            borderWidth: 2,

        }
    })
    return (
        <View style={styles.container}>

        </View>
    );
}

export default VoiceVisualization;