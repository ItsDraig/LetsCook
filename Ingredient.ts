export class Ingredient
{
    name: string;
    quantity: string;
    vegetarian: boolean;
    vegan: boolean;
    glutenfree: boolean;

    constructor(name?: string, quantity?: string, vegetarian?: boolean, vegan?: boolean, glutenfree?: boolean)
    {
        this.name = name ?? 'Unnamed Ingredient';
        this.quantity = quantity ?? '0 grams';
        this.vegetarian = vegetarian ?? false;
        this.vegan = vegan ?? false;
        this.glutenfree = glutenfree ?? false;
    }
}