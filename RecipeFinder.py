from bs4 import BeautifulSoup
import requests
import csv # might replace csv functionality with writing directly to database

recipes_data = []

# Get all relevant recipe information from a given link
def get_recipe(link):
    html_text = requests.get(link).text
    soup = BeautifulSoup(html_text, 'lxml')

    recipe_name = soup.find('h2', class_ = 'comp recipe-block__header text-block').text.replace('\n','')
    thumbnail = soup.find('img', class_ = 'primary-image')
    thumbnail_url = thumbnail['src']
    try:
            prep_time = soup.find('div', class_ = 'loc prep-time project-meta__prep-time').find('span', class_ = 'meta-text__data').text
    except (TypeError, AttributeError):
            prep_time = ""
    
    cook_time = soup.find('div', class_ = 'loc cook-time project-meta__cook-time').find('span', class_ = 'meta-text__data').text
    total_time = soup.find('div', class_ = 'loc total-time project-meta__total-time').find('span', class_ = 'meta-text__data').text
    servings = soup.find('div', class_ = 'loc recipe-serving project-meta__recipe-serving').find('span', class_ = 'meta-text__data').text.replace('\n',' ')
    
    ingredient_list = []

    raw_ingredients = soup.find_all('li', class_ = 'structured-ingredients__list-item')
    for ingredient in raw_ingredients:
        spans = ingredient.find_all('span')
        ingredient_entry = []
        for span in spans:
            ingredient_entry.append(span.text)
        ingredient_list.append(ingredient_entry)

    instruction_list = []
    image_urls_list = []

    raw_instructions = soup.find_all('li', class_ = 'comp mntl-sc-block-group--LI mntl-sc-block mntl-sc-block-startgroup') 
    for instruction in raw_instructions:
        instruction_name = instruction.find('span').text.replace('\n',' ').replace('\xa0',' ')
        
        try:
            instruction_text = instruction.find('p').text.replace('\n',' ').replace('\xa0',' ')
        except (TypeError, AttributeError):
            instruction_text = ""

        try:
            instruction_images = instruction.find_all('figure')
        except (TypeError, AttributeError):
            instruction_images = ""
            image_url = "no-image"
        
        if (instruction_images != ""):
            image_urls_entry = []
            for instruction_image in instruction_images:
                image = instruction_image.find('img', class_ = 'universal-image__image')
                image_url = image['data-src']
                image_urls_entry.append(image_url)

        instruction_entry = []
        instruction_entry.append(instruction_name)
        instruction_entry.append(instruction_text)
        image_urls_list.append(image_urls_entry)
        instruction_list.append(instruction_entry)


    recipe_dict = { 'recipe_name' : recipe_name,
                'thumbnail_url' : thumbnail_url,
                'cook_time' : cook_time, 
                'prep_time' : prep_time,
                'total_time' : total_time,
                'servings' : servings,
                'ingredients' : ingredient_list,  
                'instructions' : instruction_list,
                'image_urls' : image_urls_list
                #'rating' : rating,
                }

    recipes_data.append(recipe_dict)   

def write_to_csv(dictionary): # should be a list of dictionaries
    csv_file = "recipes.csv"
    field_names = ['recipe_name', 'thumbnail_url', 'cook_time', 'prep_time', 'total_time', 'servings', 'ingredients', 'instructions', 'image_urls']
    try:
        with open(csv_file, 'w', encoding="utf-8") as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=field_names)
            writer.writeheader()      
            writer.writerows(dictionary)     
    except IOError:
        print("I/O error")

def get_urls(parent_url):
    reqs = requests.get(parent_url)
    soup = BeautifulSoup(reqs.text, 'html.parser')
    
    urls = []
    for link in soup.find_all('a'):
        link_str = (link.get('href'))
        if link_str is not None:
            if 'https' in link_str:
                urls.append(link.get('href'))

    subs = '-recipe-'
    res = [i for i in urls if subs in i]
    res = res[ : -1]

    return(res)

def main():
    parent_url = 'https://www.simplyrecipes.com/vegan-chicken-nuggets-recipe-7091022'
    recipe_urls = get_urls(parent_url)

    for recipe in recipe_urls:
        try:
            get_recipe(recipe)
        except (ValueError, TypeError, AttributeError):
            print("Invalid recipe format for recipe: " + recipe)


    print(recipes_data)
    write_to_csv(recipes_data)

if __name__ == "__main__":
    main()