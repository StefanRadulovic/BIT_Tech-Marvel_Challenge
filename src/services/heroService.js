import { ts, hash, url, publicKey } from '../shared/utils'
import Hero from '../model/Hero'


class HeroesService {

    getHeroByName(name) {

        return fetch(`${url}/v1/public/characters?nameStartsWith=${name}&limit=20&apikey=${publicKey}`, {
            'ts': ts,
            'hash': hash
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(response.statusText)
                let noHero = []
                return Promise.resolve(noHero)
            }
        })
            .then(hero => {
                if (hero.data.results.length !== 0) {
                    const heroes = hero.data.results.map(hero => new Hero(hero.id, hero.name, hero.thumbnail.path, hero.thumbnail.extension, hero.modified, hero.comics.available, hero.series.available, hero.events.available, hero.description))
                    localStorage.setItem('arrayOfHeroes', JSON.stringify(heroes));
                    return heroes
                } else {
                    let noHero = []
                    return Promise.resolve(noHero)
                }
            })
            .catch((error) => console.log(error))
    }
}
const service = new HeroesService();
export default service