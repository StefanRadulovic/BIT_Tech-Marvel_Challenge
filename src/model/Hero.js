class Hero {
    constructor(id, name, img, ext, modified, comics, series, events, description) {
        this.id = id;
        this.name = name;
        this.img = `${img}.${ext}`;
        const modSplit=modified.split('T')[0]
        const newModif=modSplit.split('-').reverse().join('-')
        this.modified = newModif;
        this.comics = comics;
        this.series = series;
        this.events = events;
        this.description = description
    }
}

export default Hero