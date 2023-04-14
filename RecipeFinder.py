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
            prep_time = convert_to_minutes(prep_time)
    except (TypeError, AttributeError):
            prep_time = ""
    
    cook_time = soup.find('div', class_ = 'loc cook-time project-meta__cook-time').find('span', class_ = 'meta-text__data').text
    cook_time = convert_to_minutes(cook_time)
    total_time = soup.find('div', class_ = 'loc total-time project-meta__total-time').find('span', class_ = 'meta-text__data').text
    total_time = convert_to_minutes(total_time)
    servings = soup.find('div', class_ = 'loc recipe-serving project-meta__recipe-serving').find('span', class_ = 'meta-text__data').text.replace('\n',' ')
    
    
    ingredient_list = ""

    raw_ingredients = soup.find_all('li', class_ = 'structured-ingredients__list-item')
    for ingredient in raw_ingredients:
        spans = ingredient.find_all('span')
        ingredient_entry = ""
        for span in spans:
            if span.text not in ingredient_entry:
                ingredient_entry += span.text + " "
        ingredient_list += ingredient_entry + ","
    ingredient_list = ingredient_list[:-1]

    instruction_list = ""
    image_urls_list = ""

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
        
        image_urls_entry = " "
        if (instruction_images != ""):
            for instruction_image in instruction_images:
                image = instruction_image.find('img', class_ = 'universal-image__image')
                image_url = image['data-src']
                image_urls_entry += image_url + ","
            image_urls_entry = image_urls_entry[:-1]

        instruction_entry = ""
        true_instruction_text = instruction_text.replace(",", ";")
        true_instruction_name = instruction_name.replace(",", ";")
        instruction_entry += true_instruction_name + ","
        instruction_entry += true_instruction_text
        instruction_list += instruction_entry + ","

        image_urls_list += image_urls_entry + ","
        
    instruction_list = instruction_list[1:-1]
    image_urls_list = image_urls_list[:-1]

    recipe_dict = { 'name' : recipe_name,
                'thumbnail' : thumbnail_url,
                'cooktime' : cook_time, 
                'preptime' : prep_time,
                'totaltime' : total_time,
                'servings' : servings,
                'ingredients' : ingredient_list,  
                'instructions' : instruction_list,
                'images' : image_urls_list
                #'rating' : rating,
                }

    recipes_data.append(recipe_dict)   

def write_to_csv(dictionary): # should be a list of dictionaries
    csv_file = "recipes.csv"
    field_names = ['name', 'thumbnail', 'cooktime', 'preptime', 'totaltime', 'servings', 'ingredients', 'instructions', 'images']
    try:
        with open(csv_file, 'w', newline='', encoding="utf-8") as csvfile:
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

def convert_to_minutes(time_string):
    parts = time_string.split()
    minutes = 0
    for i in range(len(parts)):
        if parts[i] == "hrs":
            minutes += int(parts[i-1]) * 60
        elif parts[i] == "mins":
            minutes += int(parts[i-1])
    return minutes

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