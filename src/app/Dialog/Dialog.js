import React from 'react'
import './dialog.css'


const Dialog = (props) => {
    
    const hero = props.hero[0]
    return (
        <div className='dialog'>
            <p className='hero-name'>{hero.name}</p>
            <div className='dialog-img'>
                <img src={hero.img} alt='Hero' />
            </div>
            <div className='dialog-details'>
                <p>Last Modified: {hero.modified}</p>
                <p>Available comics: {hero.comics}</p>
                <p>Available series: {hero.series}</p>
                <p>Available events: {hero.events}</p>
            </div>
            <p>{hero.description}</p>
            <i className="material-icons dialog-icon" onClick={props.closeDialog} >close</i>
        </div>
    )
}

export default Dialog