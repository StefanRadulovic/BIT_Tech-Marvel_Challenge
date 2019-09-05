import React, { Fragment } from 'react'


const DisplayHeroes = ({ bookmarkedHeroes = [], heroes = [], IDs, onClick, showDialog, isList }) => {

    let displayClass = 'hero-card';

    if (isList) {
        displayClass = 'hero-list'
    }

    if (heroes.length === 0) {
        if (bookmarkedHeroes.length === 0) {
            return <div></div>

        } else {
            return (
                <Fragment>
                    {bookmarkedHeroes.map((hero, i) => {
                        return (<div className={displayClass} key={i}>
                            <img src={hero.img} alt='Hero' />
                            <p onClick={showDialog} id={hero.id}>{hero.name}</p>
                            <span><i id={hero.id} className="material-icons bookmark" onClick={onClick}>star</i></span>
                        </div>)

                    })}
                </Fragment>
            )

        }

    }

    if (IDs.length === 0) {

        return (
            <Fragment>
                {heroes.map((hero, i) => {
                    return (<div className={displayClass} key={i}>
                        <img src={hero.img} alt='Hero' />
                        <p onClick={showDialog} id={hero.id}>{hero.name}</p>
                        <span><i id={hero.id} className="material-icons" onClick={onClick}>star</i></span>
                    </div>)

                })}
            </Fragment>

        )
    } else {

        const ids = IDs

        return (
            <Fragment>
                {heroes.map((hero, i) => {
                    if (ids.includes(hero.id.toString())) {

                        return (<div className={displayClass} key={i}>
                            <img src={hero.img} alt='Hero' />
                            <p onClick={showDialog} id={hero.id}>{hero.name}</p>
                            <span><i id={hero.id} className="material-icons bookmark" onClick={onClick}>star</i></span>
                        </div>)
                    } else {
                        return (<div className={displayClass} key={i}>
                            <img src={hero.img} alt='Hero' />
                            <p onClick={showDialog} id={hero.id}>{hero.name}</p>
                            <span><i id={hero.id} className="material-icons" onClick={onClick}>star</i></span>
                        </div>)
                    }
                })}
            </Fragment>
        )
    }
}

export default DisplayHeroes