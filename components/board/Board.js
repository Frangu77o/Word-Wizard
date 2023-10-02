import SwiperCard from "./learn/SwiperCard";
import Vocabulary from "./vocabulary/Vocabulary";
import Settings from "./Settingss/Settings";


export default function Board({ page, progress, setProgress, allCard, setAllCard, renderCard, native, setNative, learning, setLearning }){
  switch (page) {
      case 0: return <SwiperCard allCard={allCard} setAllCard={setAllCard} progress={progress} setProgress={setProgress} native={native} learning={learning}/>
      case 1: return <Vocabulary allCard={allCard} setAllCard={setAllCard} renderCard={renderCard} native={native} learning={learning}/>
      case 2: return <Settings native={native} setNative={setNative} learning={learning} setLearning={setLearning}/>
      default: break;
  }
}