import { Text, StyleSheet, View } from 'react-native';

export default function ButtonState({rating, frequency}){
    var text = undefined;
    const color = ()=> {
        if(frequency <= 10){
            text = "new";
            return "purple";
        }
        if(rating <= 10){
            text = "forgot";
            return "red";
        }else if(rating < 20){
            text = "hard";
            return "#EAA948";
        }else{
            text = "learned";
            return "green";
        }
    }
    const buttonState = {
        backgroundColor: color(),
        borderRadius: 10,
        width: 80,
    };
    return(
        <View style={buttonState}>
            <Text style={styles.state}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    state: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 2,
    }
})