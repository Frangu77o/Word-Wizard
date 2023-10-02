import { TouchableOpacity, StyleSheet, View, Text, Modal } from 'react-native';
import { useState } from 'react';
import ModalLanguages from './ModalLanguage';

export default function SettingsButton({ label, context, setContext }){
    const [isModalVisible, setModalVisible]   = useState(false);

    return(
        <>
            <View style={styles.buttonContainer}>
                <Text style={[styles.font, styles.label]}>{ label }</Text>
                <TouchableOpacity style={styles.button} onPress={()=>setModalVisible(!isModalVisible)}>
                    <Text style={styles.font}>{ context }</Text>
                </TouchableOpacity>
            </View>


            
            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modal}>
                    <ModalLanguages label={label} isModalVisible={isModalVisible} setModalVisible={setModalVisible} setSelectedOption={setContext}/>
                </View>
            </Modal>
      </>
    )
}


const styles = StyleSheet.create({
    buttonContainer: {
        marginLeft: "10%",
        marginRight: "10%"
    },
    button: {
      padding: "3%",
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
    label: {
        color: "white",
        padding: "2%",
    },
    modal: { 
        flex: 1,
        backgroundColor: "black",
        padding: "10%",
        paddingTop: "20%" 
    }
});