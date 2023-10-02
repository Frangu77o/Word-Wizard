import { useState, useEffect } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Card from './Card';
import Alert from '../../Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SwiperCard({ allCard, setAllCard, progress, setProgress, native, learning }){
    const [queue, setQueue] = useState([]);
    const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    var newPool    = allCard.filter(card => card.frequency <= 10);
    var forgotPool = allCard.filter(card => card.frequency > 10 && card.rating <= 10);
    var hardPool   = allCard.filter(card => card.frequency > 10 && card.rating > 10 && card.rating < 20 );
    var learnPool  = allCard.filter(card => card.frequency > 10 && card.rating >= 20 );


    //style card
    const { width, height } = windowDimensions;

    const stylePortrait = {
        position: 'absolute',
        top: '50%',
        marginTop: '-40%', 
        width: "80%",
        marginLeft: "10%",
        marginRight: '10%',
    }
    const styleLandscape = {
        position: 'absolute',
        top: '50%',
        marginTop: (-(height * 0.3)),
        width: (height - height * 0.4),
        height: "60%",
        marginLeft:  ((width - height * 0.6) / 2),
        marginRight: ((width - height * 0.6) / 2),
    }
    let squareStyles = width > ( 8 / 7 * height) ? styleLandscape : stylePortrait ;

    //logica dell'algoritmo
    useEffect(() => {
        const handleWindowDimensionsChange = () => {
            setWindowDimensions(Dimensions.get('window'));
        };
        Dimensions.addEventListener('change', handleWindowDimensionsChange);
    }, []);

    useEffect(()=>{
        if(allCard.length > 0){
            newPool    = allCard.filter(card => card.frequency <= 10);
            forgotPool = allCard.filter(card => card.frequency > 10 && card.rating <= 10);
            hardPool   = allCard.filter(card => card.frequency > 10 && card.rating > 10 && card.rating < 20 );
            learnPool  = allCard.filter(card => card.frequency > 10 && card.rating >= 20 );
            if(queue.length === 0){
                setQueue([randomCard(newPool), randomCard(hardPool), randomCard(newPool)])
            }
        }else{
            setQueue([]);
        }
    }, [allCard])

    function randomElementPool(pool) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        return pool[randomIndex];
    }
    function randomCard(pool){
        if(pool.length > 0)       return randomElementPool(pool);
        if(newPool.length > 0)    return randomElementPool(newPool);
        if(forgotPool.length > 0) return randomElementPool(forgotPool);
        if(hardPool.length > 0)   return randomElementPool(hardPool);
        if(learnPool.length > 0)  return randomElementPool(learnPool);
    }
    function newElementQueue(index){
        const indexPoolQueue = index % 10;
        switch (indexPoolQueue) {
            case 0: return randomCard(forgotPool);
            case 1: return randomCard(hardPool);
            case 2: return randomCard(learnPool);
            case 3: return randomCard(forgotPool);
            case 4: return randomCard(newPool);
            case 5: return randomCard(newPool);
            case 6: return randomCard(hardPool);
            case 7: return randomCard(forgotPool);
            case 8: return randomCard(hardPool);
            case 9: return randomCard(learnPool);
            default: break;
        }
    }

    function onSwiped(index){
        const addCard = newElementQueue(index);
        if(addCard){
            setProgress(progress + 1);
            AsyncStorage.setItem(`progress`, progress.toString())
            .then(() => {
                console.log('progress salvato correttamente in AsyncStorage');
            })
            .catch((error) => {
                console.error('Errore nel salvataggio di progress', error);
            })
            if(progress === 100) setIsAlertVisible(true);
            setQueue((prevQueue) => { return [...prevQueue, addCard] } );
        }
    }
    function onSwipedRight(index){
        updateDataOnSwipe(index, "right");
    }
    function onSwipedLeft(index){
        updateDataOnSwipe(index, "left");
    }

    function updateDataOnSwipe(index, direction){
        const card = allCard.filter(card => card.key == queue[index].key);
        if(direction === "right"){
            card[0].rating++;
        }else{
            card[0].rating--;
        }
        card[0].frequency++;
        var newAllCard = allCard.filter(card => card.key !== queue[index].key);
        newAllCard.push(card[0]);
        setAllCard(newAllCard);
        AsyncStorage.setItem(`${native}${learning}`, JSON.stringify(newAllCard))
        .then(() => {
            console.log('Array salvato correttamente in AsyncStorage', `${native}${learning}`);
        })
        .catch((error) => {
            console.error('Errore nel salvataggio dell\'array:', error);
        })
    }



    if(queue.length == 0){
        return(
            <View style={{backgroundColor: "black", flex: 1, justifyContent: "center"}}>
                <Text style={{color: "white", textAlign: "center"}}>ADD CARD</Text>
            </View>
        )
    }else{
        return(
            <>
            <Swiper
                cardStyle={squareStyles}
                backgroundColor={'black'}
                cardVerticalMargin={0}
                cardHorizontalMargin={0}
                cards={queue}
                renderCard={(text, index)=> <Card text={text} index={index}/>}
                onSwiped={(i)=>onSwiped(i)}
                onSwipedRight={(i)=>onSwipedRight(i)}
                onSwipedLeft={(i)=>onSwipedLeft(i)}
                stackSize={3}
                stackScale={10}
                stackSeparation={13}
                animateCardOpacity
                disableTopSwipe
                disableBottomSwipe
                overlayLabels={{
                    left:{
                        title: "forgot",
                        style:{
                            label:{
                                backgroundColor: "red",
                                fontSize: 24,
                                color: "white",
                                textAlign: "right"
                            }
                        }
                    },
                    right:{
                        title: "know",
                        style:{
                            label:{
                                backgroundColor: "green",
                                fontSize: 24,
                                color: "white",
                                textAlign: "left"
                            }
                        }
                    }
                }}
            />
            {isAlertVisible && <Alert title={"CONGRATULAZIONI"} subTitle={"hai arggiunto l'obbietivo di oggi torna domani"} setVisible={setIsAlertVisible}/>}
            </>
        )
    }
}