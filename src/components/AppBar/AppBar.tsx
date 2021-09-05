import React,{useState} from 'react'
import './AppBar.sass'
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';

interface IAppBar{
filter: Function
likeFilter: Function
}

export default function AppBar(props:IAppBar) {

    const [like,setLike] = useState(false);

    const activateLikeFilter = () =>{
        props.likeFilter(!like)
        setLike(!like)
    }
    return (
        <div className="AppBar">
            <h1><span className="bar">Mon bar</span></h1>
            <div className="search">
            <input className="inp" onChange={(event)=> {props.filter(event.target.value)}} placeholder="Search ..."/>

            </div>
            <div className="favori">
            <span className="titreFavori">Favori</span>

            <Checkbox 
            onClick={activateLikeFilter}
            style={{marginRight:'200px'}}
            icon={<FavoriteBorder />} 
            checkedIcon={<Favorite />} 
            name="checkedH" 
            checked={like}

            />
            </div>
           
        </div>
    )
}
