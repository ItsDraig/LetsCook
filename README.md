# Let's Cook! - The Cooking Companion App

## OVERVIEW
Some of the main issues regarding food into today's climate can be summarized as follows:
- People are often too busy to look for recipes, resulting in uninspired, repetitive, and boring food
- Sometimes people find themselves with too little time to make something they’d actually enjoy 
- Lots of ingredients end up getting wasted as utilizing them can be very bothersome
- Websites are heavily saturated with tons of recipes that it’s sometimes overwhelming to choose

As a result of such, many people will turn to alternatives. Takeout and delivery is a big one, and although the food will be good and you can generally get exactly what you’re feeling in the given moment, the price that you pay for these is often too great to justify using them often. Meal delivery services that send you pre-portioned ingredients (Chefs Plate, Goodfood, Hello Fresh, etc…) provide a unique opportunity to learn new recipes and reduce food waste, but are always more expensive than buying the ingredients outright and use an exorbitant amount of plastic packaging and transport methods that are bad for the environment. Meal prepping can reduce food waste, and is great for calorie tracking, but can be repetitive and boring. 

Let’s Cook! will seek to mitigate or completely remove some of these issues from the average kitchen, while also maintaining the majority of the key benefits of each option. Let’s Cook! seeks to revolutionize how the average person shops, cooks, and enjoys their food.

## GOALS
At the beginning of the project, we set a list of goals we wanted Let’s Cook! to help users achieve:
- **Reduce food waste** by tracking expiration dates and giving you recipes to use up nearly finished/expired ingredients. 
- **Save money** by giving you a large selection of (potentially budget friendly) recipes to choose from, using up all your ingredients, and making cooking at home fun and easy.
- **Inspire people to cook more** as the app makes every part of the cooking process, whether it be shopping, finding the recipe, and even cooking as streamlined as possible.
- **Make grocery shopping easier** by making their inventory accessible from anywhere. 
- **Encourage healthier eating** by allowing users to track caloric intakes and inspire them with (potentially) thousands of delicious and healthy recipes.
- **Help people with dietary restrictions** as the app should have recipe tags and a powerful search algorithm that will help people with food allergies or other dietary restrictions. 
- **Let people share their delicious recipes** by allowing custom recipes to be uploaded, and rated by other users.
By the end of our project term, we believe that we have successfully implemented these goals into our project.

## CORE FEATURES
When the user first downloads the app they will be instructed to create an account or login. The account adds a number of benefits, the first is getting an email address and contact information from the user which can be utilized a number of ways (stops bots from mass making accounts, allows users to be banned for submitting inappropriate recipes, etc.). Another benefit is that if they were to download the app on another device, all their information would be carried over. Unfortunately we were not able to fully complete this feature; account creation and authentication backend is set up but not fully integrated into the frontend of the app. This would not take long to finish once we continue the project.

The next step would be to create a **Smart Pantry**. This is where information of all the users' ingredients will be kept, including their expiration dates and how much they have in stock. There are a few ways for the users to enter their ingredients; Manual Entry lets the users manually enter in all the details about their ingredients, which will include an autofill feature for more common ingredients, but will also let them enter completely custom ingredients for more niche ones. The second method would be **Receipt Scanning**, which allows the user to scan their grocery receipts and will instantly update their kitchen inventory. Unknown items will need to be manually entered but can be added to a database so that future users won’t have to. Although the smart pantry is complete, receipt scanning is unfortunately still in progress.

The recipes section will utilize machine learning in order to develop an understanding of the users **Tastes** (it will do this by utilizing a quick survey when they first create an account about what foods they like, and also update it as they prepare and rate recipes), and will recommend recipes to the user based on their Taste and their current inventory. The recipes would also be sorted into how many of its required ingredients the user has, along with a visual indicator for easy browsing.
Machine learning for learning a user’s tastes is still underway, but recipe/ingredient matching as well as visual indication is completely set up.	

There are a number of additional features that could be implemented that did not fit within the current scope of only a few months. These could include shared fridges between users, an in-depth dietary tracker, dynamic expiration dates and food storage tips, and potentially even AI generated recipes based on the user’s current ingredients.


## REQUIREMENTS
To accomplish the previous goals and features, we outlined the following requirements:
- **Front End Design** - Without a good user interface and proper user experience, the app would fall short regardless of how good the rest of the features are as this is just the reality of modern applications. The UI/UX should aim to complement the main features of the app, and those features should be accessible from anywhere.
- **Recipe API** - An API to grab a large number of well-made recipes from the internet.
- **Databases** - To store a large number of recipes, display them to all users, allow users to upload their own recipes, store ingredients, etc…
- **Artificial Intelligence** - Which would recommend users new recipes they might enjoy.
- **Receipt Scanning** - To make adding new ingredients after grocery shopping incredibly easier.
Although the latter two features are still in active development, we believe these requirements helped us narrow down the scope and focus on the development of Let’s Cook! over the course of the project.

## TECHNOLOGIES
To implement the above features and requirements, we utilized various technologies:
- **React Native** - Despite neither of us having experience in using React Native, we decided to utilize it as our app framework for its ability to make developing cross-platform applications relatively easy.
- **Firebase and SQLite** - Firebase allowed us to have a persistent cloud database for our application which we used to store all of our recipes and user data. SQLite allowed us to store pantry ingredients and other data in the user’s local device.
- **Python** - We used Python to build a web scraper to obtain data for our custom recipe API, as well as for implementing AI/ML into our application.
- **Expo** - Expo allowed us to quickly and easily test our application on iOS, Android, and Web.

## TESTING
Outside of the React app (which definitely accounted for most of the errors encountered throughout our work on this project) we had to make sure that all the additional components were working as intended.

Constant readjustments to the **Web Scraper** had to be made, as the information it was retrieving had to be both relevant and properly formatted before being written into the Firebase Database. For example, as the web scraped data is first written into a csv file, all instances of commas were causing entry inconsistencies, and had to be replaced with another character (in our case a semicolon was used) which then were turned back into commas on the React side.

We also had to make sure that our app could correctly read from and write to the database in order to get recipes, while also allowing users to upload their own. We also had to ensure that pantry items were being correctly stored onto the user’s device, along with favorite and custom recipes. The quantities of the pantry items also had to be successfully converted to a standardized measurement unit when applicable in order to match with ingredients in recipes effectively and must cover a lot of edge cases. 

For the app itself, we had to regularly test on both web and mobile after every change, as every single line of code had to work for both platforms. Multiple custom components had to be made because of this as we wanted to ensure that the app functioned consistently across all devices. For example, the React Native component for horizontal scroll bars both look good and function completely fine on mobile, but suffer in both functionality and appearance on Web. Therefore custom components that matched the mobile functionality were created for the Web version of the app.

## PROBLEMS ENCOUNTERED
We encountered problems in nearly every facet of this project. The web scraper took us many attempts to get right, and although Expo made testing builds on iOS incredibly easy, bug fixing was a major pain as Expos error messages were sometimes very limited in detail, making finding the root of the problem occasionally feel like looking for a needle in a haystack. 

Having to make sure each change would work across all devices dramatically slowed down the development process, as sometimes hours of work would need to be omitted to keep things consistent and compatible between platforms.

And lastly, having to learn React Native proved itself to be much more difficult than we first anticipated, as it’s very different from anything we’ve worked with before.

Although the above problems cause a good chunk of development time to be slower than anticipated, keeping a positive mindset and continuously working towards our goal helped us push through and create an app that we’re happy with.

## LEARNING OUTCOMES
We’ve learned quite a deal from our time developing this app, one of the most prominent ones being integrating components from outside of the main app. For this project we had to build a Web scraper that could retrieve entire recipes from cooking websites, while avoiding unnecessary information. As well as setting up both a local and server-side database. 

Proper React Native structure is another skill that we both developed over the course of building this application. React is a powerful framework that provides developers with a lot of flexibility, but this flexibility can also lead to disorganized and hard-to-maintain code. We came to realize that Proper React structure involves breaking the app into smaller, more manageable components, and establishing best practices for naming, organization, and file structure.

The user interface and user experience are critical components of any app, and over the course of this semester we better learned how to design interfaces that are intuitive, user-friendly, and visually appealing. This requires an understanding of design principles, including color theory, typography, and layout, as well as an ability to test the application and adjust the design accordingly.


## NEXT STEPS
The development of our application faced various challenges and unforeseen setbacks, which resulted in some of the planned features being left unimplemented. Despite this, we remain committed to improving the app and plan to incorporate these features in the near future.

One of the features we were unable to implement was the ability to scan grocery receipts or take photos of fridge contents to update the user's pantry inventory. The functionality can be added to our React Native app through an API or  a third-party OCR (optical character recognition) service to extract the relevant information from the receipt image, such as the list of items and their prices. This data would then be used to update the user's pantry inventory automatically. Integration with a reliable and accurate OCR service is key to ensuring the success of this feature.

To provide users with a more secure and convenient experience, we plan to integrate user authentication and account services into the app. This will enable users to create an account and login, as well as access their data across multiple devices. Multi-factor authentication (MFA) will also be implemented to enhance account security. We will explore different MFA methods, such as SMS-based verification, biometric authentication, or one-time password (OTP) tokens.

Leveraging AI is a key aspect of our long-term vision for the app. We aim to develop an AI model that can analyze a user's food and flavor preferences based on their past interactions with the app and other relevant data points (such as their dietary restrictions). This model can then be used to generate personalized recipe recommendations that are tailored to each user's unique tastes. Developing and training such a model requires access to large amounts of high-quality data, which we will continue to collect and curate over time.

Various account features, such as the ability to follow friends and other cooks, and the option to leave reviews on recipes, will also be added in the future. These features will enhance user engagement and social interaction within the app, fostering a sense of community and collaboration around cooking and food.
