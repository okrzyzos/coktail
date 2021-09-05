import React,{useContext} from 'react'
import './CoktailCard.sass';
import { ICocktail } from '../../model/Coktail'
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Checkbox from '@material-ui/core/Checkbox';
import { CoktailContext } from '../../App';



interface ICocktailCard {
    coktail: ICocktail;
    openModal: Function;
}

function CoktailCard(props: ICocktailCard): JSX.Element {
    const [coktails, setCoktails] = useContext<[ICocktail[], Function]>(CoktailContext)


    return (
        <div className="coktailCard-container" style={{position:'relative'}}>
                <Checkbox 
                onClick={()=>{
                    const coktailToChangeIndex = coktails.findIndex((coktail)=>{
                        return coktail.name === props.coktail.name
                    })
                    const coktailsUpdated = [...coktails];
                    coktailsUpdated[coktailToChangeIndex] = {
                        ...props.coktail,
                        liked: !props.coktail.liked
                    }
                    setCoktails(coktailsUpdated)
                }}
                style={{position:'absolute',right:'10px'}}
                icon={<FavoriteBorder />} 
                checkedIcon={<Favorite />}
                 name="checkedH" 
                 checked={props.coktail.liked}
                 />

            <div className='coktailCard' onClick={() => props.openModal(props.coktail)}>
                <img className='coktailImage' src={props.coktail.image} alt={props.coktail.name} />
                <h1 className='coktailName'>{props.coktail.name}</h1>
                <div className='separator'></div>
                <ol className='ingredientList'>
                    {props.coktail.ingredients.map((ingredient) => {
                        return <li key={ingredient}>{ingredient}</li>
                    })}
                </ol>

            </div>
        </div>
    )
}
export default CoktailCard
