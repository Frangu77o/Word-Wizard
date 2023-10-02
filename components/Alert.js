import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';


export default function Alert({ title, subTitle, setVisible }){
    return(
        <View style={styles.alert}>
            <Text style={styles.title}>{ title }</Text>
            <Text style={styles.subTitle}>{ subTitle }</Text>
            <TouchableOpacity style={styles.button} onPress={()=>setVisible(false)}>
                <Text style={styles.font}>CLOSE</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    alert: {
        position: "absolute",
        height: "30%",
        top: "35%",
        width: "80%",
        backgroundColor: "white",
        marginLeft: "10%",
        marginRight: "10%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
    },
    title: {
        textAlign: "center",
        padding: "2%",
        fontSize: 25,
        fontWeight: "bold",
        color: "black"
    },
    subTitle: {
        textAlign: "center",
        padding: "5%",
        color: "black"
    },
    button: {
        padding: "2%",
        width: "80%",
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%"
    },
    font: {
        fontSize: 17,
        fontWeight: "bold"
    },
})