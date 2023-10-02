import { StyleSheet, View, SafeAreaView } from 'react-native';
import SettingsButton from './SettingsButton';

export default function Settings({ native, setNative, learning, setLearning }){
    return(
        <SafeAreaView style={styles.screen}>
            <View style={styles.settingsContainer}>
                <SettingsButton label={"native lenguage"}   context={native}   setContext={setNative} type={"language"}/>
                <SettingsButton label={"learning lenguage"} context={learning} setContext={setLearning} type={"language"}/>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    screen: {
      flex: 1,
      height: "100%",
      backgroundColor: 'black',
    },
    settingsContainer: {
        marginTop: "20%",
    }
});