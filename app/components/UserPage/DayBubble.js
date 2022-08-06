import {} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../common/styles';
import { Ionicons } from "@expo/vector-icons";

function DayBubble({dayNumber, current, completed}) {
    const styles = StyleSheet.create({
        container:{
            height: 23,
            width: 23,
            borderRadius: 40,
            borderColor: completed ? "white" : (current ? colors.secondary : colors.main),
            borderWidth: 2,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor: completed ? colors.secondary : (current ? colors.secondary : "transparent"),
            marginRight: 3,
        },
        numberText:{
            fontSize: 10,
            color: current ? "white" : colors.grey,
            fontWeight:"bold"
        },
    })

    const innerBubble = () => {
        if(completed){
            return <Ionicons name="checkmark" size={13} color={completed ? "white" : colors.main}/>
        }
        return <Text style={styles.numberText}>{dayNumber}</Text>
    }
    return (
        <View style={styles.container}>
            {innerBubble()}
        </View>
    );
}

export default DayBubble;