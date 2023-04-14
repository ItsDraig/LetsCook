export class RecipeCard
{
    name: string;
    thumbnail: string;
    preptime: number;
    cooktime: number;
    totaltime: number;
    servings: string;
    images: string[];
    ingredients: string[];
    instructions: string[];

    constructor(name?: string, thumbnail?: string, preptime?: number, cooktime?: number, totaltime?: number, 
        servings?: string, images?: string[], ingredients?: string[], instructions?: string[])
    {
        this.name = name ?? 'Recipe Name';
        this.thumbnail = thumbnail ?? 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
        if(this.thumbnail == '' || this.thumbnail == null)
        {
            this.thumbnail = 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
        }
        this.preptime = preptime ?? 10;
        this.cooktime = cooktime ?? 35;
        this.totaltime = totaltime ?? 45;
        this.servings = servings ?? '2 servings';
        this.images = images ?? ['https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'];
        this.ingredients = ingredients ?? ['FakeIngredient'];
        this.instructions = instructions ?? ['Gather ingredients', 'Mix ingredients', 'Eat food'];
    }
}