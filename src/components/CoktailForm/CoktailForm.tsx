import React, { useContext, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './CoktailForm.sass'
import { ICocktail } from '../../model/Coktail'
import mer from '../../assets/coktails/mer.png'
import { CoktailContext } from '../../App';



interface ICocktailForm {
    coktail: ICocktail | undefined;
    closeModal: Function
}


export default function CoktailForm(props: ICocktailForm) {
    const [coktails, setCoktails] = useContext<[ICocktail[], Function]>(CoktailContext)
    const [ingredients, setIngredients] = useState<string[]>(props.coktail !== undefined ? props.coktail.ingredients : [])

    const changeIngredient = (ingredient: string, index: number) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = ingredient;
        setIngredients(newIngredients);
    }

    const validateCoktail = () =>{
        const newCoktail = [...coktails]
        let coktailIndex = 0;
        const  coktailToChange = coktails.find((coktail,index) => {
            coktailIndex = index;
            return props.coktail ? (coktail.name === props.coktail.name) : false
        })
        if(coktailToChange !== undefined){
            coktailToChange.ingredients = ingredients;
            newCoktail[coktailIndex] = coktailToChange;
        setCoktails(newCoktail);

        }
props.closeModal(undefined)
    }
    return (
        <div className="coktailForm">
            <div className="title">{props.coktail !== undefined ? props.coktail.name : ''}</div>
            <div className="coktailFormImage">
                <img className="coktailImage" src={props.coktail !== undefined ? props.coktail.image : ''} alt={props.coktail !== undefined ? props.coktail.name : ''} />
                <img className="mer" src={mer} alt={props.coktail !== undefined ? props.coktail.name : ''} />
            </div>
            <div className="textField">
                {props.coktail !== undefined ? props.coktail.ingredients.map((ingredient: string, index: number) => {

                    return (
                        <TextField
                            style={{ marginTop: '15px' }}
                            id={ingredient}
                            key={ingredient}
                            label="Outlined"
                            variant="outlined"
                            value={ingredients[index]}
                            onChange={(e) => changeIngredient(e.target.value, index)}
                        />
                    )
                })
                    : null}
            </div>

            <div className="formButton">
                <Button onClick={() => props.closeModal(undefined)} variant="contained">Annuler</Button>
                <Button onClick={() => validateCoktail() } variant="contained" color="primary">
                    Valider
                </Button>
            </div>
        </div>
    );
}
