import { Text, StyleSheet, View, Image } from 'react-native';
import FlipCard from 'react-native-flip-card';
import ButtonState from '../../ButtonState';


export default function Card({ text, index }){
    const invert = index % 3 == 0 ? true : false;
    return(
        <View style={styles.cardContainer}>
            <FlipCard>
                {/*--front-card--*/}
                <View style={styles.card}>
                    <View style={styles.navCard}>
                        <ButtonState rating={text.rating} frequency={text.frequency}/>
                        <Image source={require("../../../assets/logo.png")}/>
                    </View>
                    <Text style={styles.cardWord}>{invert === true ? text.learning : text.native}</Text>
                </View>
                {/*--back-card--*/}
                <View style={styles.card}>
                    <View style={styles.navCard}>
                        <ButtonState rating={text.rating} frequency={text.frequency}/>
                        <Image source={require("../../../assets/logo.png")}/>
                    </View>
                    <Text style={styles.cardWord}>{invert === true ? text.native : text.learning}</Text>
                </View>
            </FlipCard>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: "100%",
        aspectRatio: 1,
    },
    card: {
        backgroundColor: "#D9D9D9",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        aspectRatio: 1,
    },
    navCard: {
        position: 'absolute',
        top: 0,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    cardWord: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: "bold"
    }
})