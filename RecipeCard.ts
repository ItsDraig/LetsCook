class RecipeCard
{
    name: string;
    thumbnail: string;
    preptime: string;
    cooktime: string;
    totaltime: string;
    servings: string;
    images: string[];
    ingredients: string[];
    instructions: string[];

    constructor(name: string, thumbnail: string, preptime: string, cooktime: string, totaltime: string, 
        servings: string, images: string[], ingredients: string[], instructions: string[])
    {
        this.name = name ?? 'Recipe Name';
        this.thumbnail = thumbnail ?? 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
        this.preptime = preptime ?? '? mins';
        this.cooktime = cooktime ?? '? mins';
        this.totaltime = totaltime ?? '? mins';
        this.servings = servings ?? '1 serving';
        this.images = images ?? [];
        this.ingredients = ingredients ?? [];
        this.instructions = instructions ?? [];
    }
}