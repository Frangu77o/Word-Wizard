import { useState } from 'react';
import { TouchableOpacity, StyleSheet, SafeAreaView, Text, View, Modal, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardVocabulary from './CardVocabulary';
import Alert from '../../Alert';

export default function Vocabulary({ allCard, setAllCard, renderCard, native, learning }) {

  const [isModalVisible, setModalVisible] = useState(false);
  const [nativeWord, setNativeWord]       = useState("");
  const [learningWord, setLearningWord]   = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  function storageData(data){
    AsyncStorage.setItem(`${native}${learning}`, JSON.stringify(data))
    .then(() => {
      console.log('Array salvato correttamente in AsyncStorage', `${native}${learning}`);
    })
    .catch((error) => {
      console.error('Errore nel salvataggio dell\'array:', error);
    });
  }

  function addCard(){
    if(nativeWord && learningWord){
      let copyAllCard = Array.from(allCard);
      var newKey = 0;
      if(copyAllCard.length !== 0){
        const maxKey = Math.max(...copyAllCard.map((element) => element.key));
        newKey = maxKey + 1;
      }
      copyAllCard.push({
        "native": nativeWord,
        "learning": learningWord,
        "nativeLanguage": native,
        "learningLanguage": learning,
        "frequency": 0,
        "rating": 10,
        "key": newKey,
      });
      setAllCard(copyAllCard);
      storageData(copyAllCard);
      setModalVisible(!isModalVisible);
      setNativeWord("");
      setLearningWord("");
    }else{
      setIsAlertVisible(true);
    }
  }

  
  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.addCard} onPress={()=>setModalVisible(!isModalVisible)}>
          <Text style={styles.font}>Add New Card</Text>
        </TouchableOpacity>

        <FlatList
          style={styles.flatList}
          data={renderCard}
          renderItem={({ item }) => ( 
            <CardVocabulary card={item} allCard={allCard} setAllCard={setAllCard} storageData={storageData} />
          )}
          keyExtractor={(item) => item.key}
        />
      </SafeAreaView>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modal}>
          <TextInput 
            style={styles.input}
            placeholder="Native Word"
            onChangeText={setNativeWord}
            value={nativeWord}
            placeholderTextColor="rgba(128, 128, 128, 0.5)"
          />
          <TextInput 
            style={styles.input}
            placeholder="Learning Word"
            onChangeText={setLearningWord}
            value={learningWord}
            placeholderTextColor="rgba(128, 128, 128, 0.5)"
          />
          <TouchableOpacity style={[styles.button, styles.endButton]} onPress={addCard}>
            <Text style={styles.font}>ADD CARD</Text>
          </TouchableOpacity>
        </View>
        {isAlertVisible && <Alert title={"ATTENZIONE"} subTitle={"aggiungi dei valori validi"} setVisible={setIsAlertVisible}/>}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'black',
  },
  addCard: {
    padding: "3%",
    backgroundColor: "white",
    width: "80%",
    borderRadius: 10,
    marginLeft: "10%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20%",
    marginBottom: "5%"
  },
  font: {
    fontSize: 17,
    fontWeight: "bold"
  },
  flatList:{
    marginBottom: "20%",
  },
  modal: { 
    flex: 1,
    backgroundColor: "black",
    padding: "10%",
    paddingTop: "20%" 
  },
  input: {
    color: "white",
    backgroundColor: "#0F0E0E",
    padding: "5%",
    marginTop: "5%",
    borderRadius: 10,
  },
  button: {
    padding: "3%",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%"
  },
  endButton: {
    position: "absolute",
    bottom: 50,
    left: "10%",
  },
});


