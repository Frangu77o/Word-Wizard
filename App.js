import { useState, useEffect } from 'react';
import NavBar  from "./components/NavBar"
import TopMenu from './components/TopMenu/TopMenu';
import Board from './components/board/Board';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {
  const [page, setPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [allCard, setAllCard] = useState([]);
  const [renderCard, setRenderCard] = useState([]);
  const [native, setNative] = useState('Italian 🇮🇹');
  const [learning, setLearning] = useState('English 🇬🇧');
  const [isInitialUpdatesCompleted, setIsInitialUpdatesCompleted] = useState(false); //questa variabile evita che partano dei loop di aggiornamenti di state inutili dovuti ad useEffect

  useEffect(() => {
    fetchData();
    setIsInitialUpdatesCompleted(true);
  }, []);

  useEffect(()=>{
    async function updateData(){
      if(isInitialUpdatesCompleted){
        AsyncStorage.setItem('native', native.toString()).then(() => {
         console.log('leanguage native salvato correttamente in AsyncStorage');
        }).catch((error) => {
          console.error('Errore nel salvataggio di leanguage native', error);
        });
        AsyncStorage.setItem('learning', learning.toString()).then(() => {
          console.log('leanguage learning salvato correttamente in AsyncStorage');
        }).catch((error) => {
          console.error('Errore nel salvataggio di leanguage learning', error);
        });
        
        await AsyncStorage.getItem(`${native}${learning}`).then((value) => {
          if (value){
            setAllCard(JSON.parse(value))
          }else{
            setAllCard([]);
          }
          console.log('Array recuperato da AsyncStorage:', JSON.parse(value));
        }).catch((err) => {
          console.error('Errore nel recupero dei dati:', err);
        });
      }
    }
    updateData()
  }, [native, learning])

  useEffect(() => {
    setRenderCard(Array.from(allCard).sort((a, b) => b.key - a.key));
  }, [allCard]);

  async function fetchData() {
    try {
      const today = new Date().getDate();
      // Prende i dati dal database
      const [nativeValue, learningValue, progressValue, lastUpdateDailyGoal] = await Promise.all([
        AsyncStorage.getItem('native'),
        AsyncStorage.getItem('learning'),
        AsyncStorage.getItem('progress'),
        AsyncStorage.getItem('dayDailyGoal'),
      ]);
  
      // Imposta i valori 
      if (nativeValue) setNative(nativeValue);
      if (learningValue) setLearning(learningValue);
      if (lastUpdateDailyGoal){
        if(parseInt(lastUpdateDailyGoal) != today){
          setProgress(0);
          AsyncStorage.setItem(`progress`, "0")
          .then(() => {
            console.log('progress salvato correttamente in AsyncStorage');
          })
          .catch((error) => {
            console.error('Errore nel salvataggio di progress', error);
          })
          AsyncStorage.setItem('dayDailyGoal', today.toString());
        }else if (progressValue){
          setProgress(parseInt(progressValue));
        }
      }else{
        AsyncStorage.setItem('dayDailyGoal', today.toString());
      }
  
      // Prende le card salvate con quel native e quel learning dal database
      const cardsValue = await AsyncStorage.getItem(`${nativeValue}${learningValue}`);
      if (cardsValue) {
        setAllCard(JSON.parse(cardsValue));
        console.log('Array recuperato da AsyncStorage:', JSON.parse(cardsValue));
      }
  
    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error);
    }
  }
  
  return (
    <>
      <TopMenu page={page} progress={progress} allCard={allCard} setRenderCard={setRenderCard}/>
      <Board   page={page} progress={progress} setProgress={setProgress} allCard={allCard} setAllCard={setAllCard} renderCard={renderCard} native={native} setNative={setNative} learning={learning} setLearning={setLearning}/>
      <NavBar  setPage={setPage}/>
    </>
  )
}