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
        this.name = name;
        this.thumbnail = thumbnail;
        this.preptime = preptime;
        this.cooktime = cooktime;
        this.totaltime = totaltime;
        this.servings = servings;
        this.images = images;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }
}