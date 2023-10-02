import { StyleSheet, View, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import TopMenuContent from './TopMenuContent';

export default function TopMenu({ page, progress, allCard, setRenderCard }){
    const notchHeight = Constants.statusBarHeight;
    return(    
        <View style={[styles.topMenu, {paddingTop: notchHeight}]}>
        <StatusBar barStyle="light-content" backgroundColor="black"/>
            <TopMenuContent page={page} progress={progress} allCard={allCard} setRenderCard={setRenderCard}/>
        </View>
    )
}

const styles = StyleSheet.create({
    topMenu: {
        zIndex: +1,
        width: "100%",
        height: "13%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        backgroundColor: "#0F0E0E",
    }
});