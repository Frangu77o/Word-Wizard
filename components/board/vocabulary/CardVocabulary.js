import { useRef } from "react";
import { TouchableOpacity, TouchableWithoutFeedback, StyleSheet, View, Text, Image, Animated, PanResponder, } from 'react-native';
import ButtonState from '../../ButtonState';

export default function CardVocabulary({ card, allCard, setAllCard, storageData,  }){

    function languageToFlag(language){
        switch (language) {
            case 'Chinese 🇨🇳':          return '🇨🇳';
            case 'Spanish 🇪🇸':          return '🇪🇸';
            case 'English 🇬🇧':          return '🇬🇧';
            case 'Hindi 🇮🇳':            return '🇮🇳';
            case 'Arabic 🇸🇦':           return '🇸🇦';
            case 'Bengali 🇧🇩':          return '🇧🇩';
            case 'Portuguese 🇵🇹':       return '🇵🇹';
            case 'Russian 🇷🇺':          return '🇷🇺';
            case 'Japanese 🇯🇵':         return '🇯🇵';
            case 'Punjabi 🇮🇳':          return '🇮🇳';
            case 'German 🇩🇪':           return '🇩🇪';
            case 'French 🇫🇷':           return '🇫🇷';
            case 'Javanese 🇮🇩':         return '🇮🇩';
            case 'Wu Chinese 🇨🇳':       return '🇨🇳';
            case 'Indonesian/Malay 🇮🇩': return '🇮🇩';
            case 'Telugu 🇮🇳':           return '🇮🇳';
            case 'Vietnamese 🇻🇳':       return '🇻🇳';
            case 'Korean 🇰🇷':           return '🇰🇷';
            case 'Marathi 🇮🇳':          return '🇮🇳';
            case 'Italian 🇮🇹':          return '🇮🇹';
            case 'Other 🌏':            return '🌏';
            default:break;
        }
    }
    const pan = useRef(new Animated.ValueXY()).current;
    var swipedCard = false;
    const panResponder = useRef(
    PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            if (gestureState.dx < 0) {
                pan.setValue({ x: gestureState.dx, y: 0 });
            }
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dx < (-50) && !swipedCard || gestureState.dx < (0) && swipedCard) {
                Animated.spring(pan, {
                    toValue: { x: -100, y: 0 }, 
                    useNativeDriver: false, 
                }).start();
                swipedCard = true;
            }else{
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 }, 
                    useNativeDriver: false, 
                }).start();
                swipedCard = false;
            }
        },
    }),
    ).current;

    function delate(key){
        let copyAllCard = Array.from(allCard);
        let updateAllCard = copyAllCard.filter((card) => card.key !== key);
        setAllCard(updateAllCard);
        storageData(updateAllCard);
    }


    return(
        <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.buttonDelate} onPress={()=>delate(card.key)}>
                <View style={styles.square}>
                    <Image source={require("../../../assets/trash.png")} />
                </View>
            </TouchableOpacity>
            <Animated.View
                style={{
                    transform: [{translateX: pan.x}],
                    pointerEvents: "box-none",
                }}
                {...panResponder.panHandlers}>
                
                    <View style={styles.cardFront}>
                        <ButtonState rating={card.rating} frequency={card.frequency}/>
                        <View style={styles.cardDataRow}>
                            <View style={styles.cardDataContainer}>
                                <Text style={styles.textLenguage}>{ languageToFlag(card.nativeLanguage) }</Text>
                                <Text style={styles.textWord}>{ card.native }</Text>
                            </View>
                            <View  style={styles.cardDataContainer}>
                                <Text style={styles.textLenguage}>{ languageToFlag(card.learningLanguage) }</Text>
                                <Text style={styles.textWord}>{ card.learning }</Text>
                            </View>
                        </View>
                    </View>
                
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginTop: "5%",
    },
    cardFront: {
        backgroundColor: "#D9D9D9",
        width: "80%",
        display: "flex",
        borderRadius: 10,
        marginLeft: "10%",
        padding: "2%",
    },
    cardDataRow: {
        margin: "2%",
        flexDirection: "row"
    },
    cardDataContainer: {
        width: "50%",
    },
    textLenguage: {
        color: 'rgba(15, 14, 14, 0.5)',
        fontSize: 15,
        fontWeight: "bold",
    },
    textWord: {
        color: 'white',
        fontSize: 25,
        fontWeight: "bold",
    },
    buttonDelate: {
        position: "absolute",
        backgroundColor: "red",
        width: "75%",
        borderRadius: 10,
        marginLeft: "15%",
        marginRight: "10%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    square: {
        width: 100,
        justifyContent: "center", 
        alignItems: "center", 
    }
})



