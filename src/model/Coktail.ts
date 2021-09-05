export interface ICocktail {
    name: string,
    image: any,
    ingredients: string[],
    liked: boolean
}

export class Coktail implements ICocktail {
    name;
    image;
    ingredients;
    liked;
    constructor(name: string,image: any,ingredients: string[],liked: boolean){
        this.name = name;
        this.image = image;
        this.ingredients = ingredients;
        this.liked = liked;
    }
}