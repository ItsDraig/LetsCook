export class RecipeCard
{
    name: string;
    thumbnail: string;
    preptime: number;
    cooktime: number;
    totaltime: number;
    servings: number;
    images: string[];
    ingredients: string[];
    instructions: string[];

    constructor(name?: string, thumbnail?: string, preptime?: number, cooktime?: number, totaltime?: number, 
        servings?: number, images?: string[], ingredients?: string[], instructions?: string[])
    {
        this.name = name ?? 'Recipe Name';
        this.thumbnail = thumbnail ?? '';
        this.preptime = preptime ?? 10;
        this.cooktime = cooktime ?? 35;
        this.totaltime = totaltime ?? 45;
        this.servings = servings ?? 2;
        this.images = images ?? ['https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'];
        this.ingredients = ingredients ?? ['FakeIngredient'];
        this.instructions = instructions ?? ['Gather ingredients', 'Mix ingredients', 'Eat food'];
    }
}