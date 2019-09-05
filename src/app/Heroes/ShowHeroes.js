import React, { Component } from 'react'
import service from '../../services/heroService'
import { debounce } from 'lodash'

import './showheroes.css'
import DisplayHeroes from './DisplayHeroes'
import SearchBar from '../../partials/Searchbar'
import Loader from '../../partials/Loader'
import Dialog from '../Dialog/Dialog'



class ShowHeroes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heroes: [],
            bookmarkedHeroesID: [],
            bookmarkedHeroes: [],
            isLoading: false,
            showDialog: false,
            dialogHero: {},
            noSearch: true

        };
        this.onSearchHandler = debounce(this.onSearchHandler, 2000);
        

    }
    componentDidMount() {
        
        const local = JSON.parse(localStorage.getItem('bookmarkedHeroes'));
        const localIDs = JSON.parse(localStorage.getItem('bookmarkedHeroesID'));
        if (local!==null) {
            
            this.setState({
                bookmarkedHeroes: local,
                bookmarkedHeroesID: localIDs
            })
        }
    }

    onSearchHandler = (name) => {
        if (name.length === 0) {
            
            this.setState({
                heroes: []
            })
        } else {

            this.searchRequest(name)
            
        }


    }
    searchRequest=(name)=>{

        this.setState({
            isLoading: true
        });


        service.getHeroByName(name).then(heroes => {

            this.setState({
                heroes,
                isLoading: false,
                search: name
            });

        })
            .catch(error => console.log(error));
    }

    showDialogHandler = (event) => {
        const id = event.target.id;
        const heroesID = JSON.parse(localStorage.getItem('bookmarkedHeroesID'));
        let hero = [];

        if (heroesID != null && heroesID.includes(id)) {
            const bookmarkedHeroes = JSON.parse(localStorage.getItem('bookmarkedHeroes'));
            hero = bookmarkedHeroes.filter(hero => hero.id == id);
        } else {
            const heroes = JSON.parse(localStorage.getItem('arrayOfHeroes'));
            hero = heroes.filter(hero => hero.id == id);

        }

        this.setState({
            dialogHero: hero,
            showDialog: true
        });
    }
    closeDialog = () => {
        this.setState({
            dialogHero: {},
            showDialog: false
        });
    }

    setLocalStorage = (bookmarkedHeroesID, bookmarkedHeroes) => {
        localStorage.setItem('bookmarkedHeroesID', JSON.stringify(bookmarkedHeroesID));
        localStorage.setItem('bookmarkedHeroes', JSON.stringify(bookmarkedHeroes));
    }

    bookmarkHandler = (event) => {
        const bookmarkedHeroId = event.target.id;
        let heroes = JSON.parse(localStorage.getItem('arrayOfHeroes'));
        let bookmarkedHeroes = JSON.parse(localStorage.getItem('bookmarkedHeroes'));
        const hero = heroes.filter(hero => hero.id == bookmarkedHeroId);
        let bookmarkedHeroesID = JSON.parse(localStorage.getItem('bookmarkedHeroesID'));

        if (bookmarkedHeroesID !== null) {
            if (bookmarkedHeroesID.includes(bookmarkedHeroId)) {
                this.unbukmark(bookmarkedHeroId);
            } else {
                bookmarkedHeroesID.push(bookmarkedHeroId);
                bookmarkedHeroes.push(hero[0]);
                this.setLocalStorage(bookmarkedHeroesID, bookmarkedHeroes);
                this.setState({
                    bookmarkedHeroesID,
                    bookmarkedHeroes
                });
            }
        } else {
            let bookmarkedHeroesID = [];
            let bookmarkedHeroes = [];
            bookmarkedHeroesID.push(bookmarkedHeroId);

            bookmarkedHeroes.push(hero[0]);
            this.setLocalStorage(bookmarkedHeroesID, bookmarkedHeroes);
            this.setState({
                bookmarkedHeroesID,
                bookmarkedHeroes
            });
        }

    }

    unbukmark = (heroId) => {
        let bookmarkedHeroesID = JSON.parse(localStorage.getItem('bookmarkedHeroesID'));
        let bookmarkedHeroes = JSON.parse(localStorage.getItem('bookmarkedHeroes'));

        let heroes = bookmarkedHeroes.filter(hero => hero.id != heroId);
        let IDs = bookmarkedHeroesID.filter(id => id != heroId);
        this.setLocalStorage(IDs, heroes);

        this.setState({
            bookmarkedHeroesID: IDs,
            bookmarkedHeroes: heroes
        });
    }

    render() {
        return (
            <div className='heroes-view' >
                <SearchBar onSearch={this.onSearchHandler} />
                {(this.state.isLoading) ? <Loader /> : <DisplayHeroes heroes={this.state.heroes} bookmarkedHeroes={this.state.bookmarkedHeroes} onClick={this.bookmarkHandler} IDs={this.state.bookmarkedHeroesID} showDialog={this.showDialogHandler} isList={this.props.isList} />}
                {(this.state.showDialog) ? <Dialog hero={this.state.dialogHero} closeDialog={this.closeDialog} /> : ''}
            </div>
        );
    }
}

export default ShowHeroes;