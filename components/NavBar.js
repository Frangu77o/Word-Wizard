import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';


export default function NavBar( {setPage} ){
    const learnImage    = require('../assets/learn.png');
    const archiveImage  = require('../assets/archive.png');
    const settingsImage = require('../assets/settings.png');
    const optionMenu    = [learnImage, archiveImage, settingsImage]
    return(
        <>
        <View style={styles.navBar}>
            {optionMenu.map((path, index)=>{
                return(
                    <TouchableOpacity key={index} onPress={()=>setPage(index)}>
                        <Image source={path} />
                    </TouchableOpacity>
                )
            })}
        </View>
        </>
    )
}


const styles = StyleSheet.create({
    navBar: {
        width: "100%",
        height: "13%",
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        bottom: 0,
        backgroundColor: "#0F0E0E",
    },
});