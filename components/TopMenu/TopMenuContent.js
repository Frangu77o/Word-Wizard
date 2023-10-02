import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function TopMenuContent( { page, progress, allCard, setRenderCard } ){
    
    const barColor = `rgb(${255 - progress * 2.55}, ${progress * 2.55}, 0)`;
    const barStyle = {
        backgroundColor: barColor,
        width: `${progress}%`,
        height: 10,
    };

    function serch(text){
        filterCard = allCard.filter((card)=>
            card.native.toLowerCase().includes(text.toLowerCase())
            ||
            card.learning.toLowerCase().includes(text.toLowerCase())
        );
        setRenderCard(filterCard);
    }
    
    switch (page) {
        case 0: return(
            <View style={styles.dailyGoalContainer}>
                <Text style={styles.label}>Daily Goal</Text>
                <View style={styles.space} />
                <View style={styles.progressBar}>
                    <View style={[styles.progressBarScore, barStyle]} />
                </View>
            </View>
        )
            
        case 1: return(
            <TextInput
                placeholder="Search..."
                onChangeText={(text) => serch(text)}
                style={styles.serchBar}
            />
        )
        case 2: return(
            <Text style={styles.text}>settings</Text>
        )
    
        default:break;
    }
}

const styles = StyleSheet.create({
    dailyGoalContainer:{
        width: 75,
        alignItems: "center"
    },
    label:{
        fontSize: 14,
        color: "white"
    },
    space: {
        height: 5
    },
    progressBar: {
        width: 70,
        backgroundColor: 'white', // Colore di sfondo bianco
        borderRadius: 5,
        overflow: 'hidden', // Per nascondere il colore fuori dalla barra
    },
    progressBarScore: {
        height: 10,
        transitionProperty: 'width',
        transitionDuration: '0.3s',
    },
    serchBar:{
        width: "90%",
        margin: 12,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        color: 'black'
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        color: "white"
    }
});