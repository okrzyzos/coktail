import React,{useState,useEffect} from 'react'
import CoktailCard from './components/CoktailCard/CoktailCard';
import {coktailList} from './model/CoktailList'
import './App.sass';
import './App.css'
import AppBar from './components/AppBar/AppBar';
import {ICocktail} from './model/Coktail'
import Modal from 'react-modal'
import CoktailForm from './components/CoktailForm/CoktailForm';

export const CoktailContext = React.createContext<[ICocktail[], Function]>([coktailList,()=> {}])
function App() {

  const [coktails,setCoktails] = useState<ICocktail[]>(coktailList)
  const [coktailDisplayed,setCoktailDisplayed] = useState<ICocktail[]>(coktailList)
  const [openCoktail, setOpenCoktail] = useState<ICocktail | undefined>(undefined);


  useEffect(() => {
    const newCoktailDisplayed : ICocktail[] = [];
coktailDisplayed.forEach((coktail)=>{
  const oneCoktail = coktails.find((c)=>c.name === coktail.name)
  if(oneCoktail !== undefined){
    newCoktailDisplayed.push(oneCoktail)
  }
})
setCoktailDisplayed(newCoktailDisplayed)

  },[coktails,coktailDisplayed]);

const handleSearch = (criteria: string) : void =>{
console.log(criteria)
if(criteria === ''){
  setCoktails(coktailList)
} else {
  setCoktails(coktailList.filter(coktail => coktail.name
    .toLowerCase()
    .startsWith(criteria.toLowerCase())
    ))
} 
}

const likeFilter = (like: boolean) => {
  if(like){
    setCoktailDisplayed(coktails.filter((coktail) => coktail.liked === true))
  } else {
    setCoktailDisplayed(coktails)
  }
}

  return (
    <CoktailContext.Provider value={[coktails,setCoktails]}>

<div className="container-card">
<AppBar filter={handleSearch} likeFilter={likeFilter}/>
    {coktailDisplayed.map((coktail)=>(
      <CoktailCard
     coktail={coktail}
openModal={setOpenCoktail}
      />
    ))}
    <Modal 
    className="modal"
    isOpen={openCoktail !== undefined}
     onRequestClose={()=>setOpenCoktail(undefined)}>
    <CoktailForm coktail={openCoktail} closeModal={setOpenCoktail}/>

    </Modal>
    </div>

    </CoktailContext.Provider>
  
    
  );
  
}

export default App;
