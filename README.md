# CoffeeLover

This project, built for Code The Dream's advanced course,
is a website to help coffee fans find their ideal brew.
Here is the description on developing and implementaion:
1- Planning

I did these steps for planning this projects:

1- After investigating all the APIs I selected the coffe lover API, which has a knot with my favorite food!
2- I checked the API endpoints in postman to see the dta structure and the amout of data to have a good insight for designing my pages.
3- I decided to implement this project with HTML/CSS/JavaScript.
4- Apparantly based on the project requirements I needed to use two endpoints and I decided to have a index page with two different button for hot and iced coffe.
5- I decided to add a little bit complixity to this project by adding search page. For Search page, I decided to work on ingredients based on coffee type. initially User can select which type of coffe he wants: hot or iced?
Then all the available ingredients in the dedicated API will show. User selects his favorits ingredients and TA-DA! here is the list of coffee with the favorits ingredients.

2- Implementation:

    1- Indexpage:http://127.0.0.1:3000/index.html
    There is 3 buttons for Hot,iced and search which theier colr changes by mouse going over event.

    2- Hot Coffee:http://127.0.0.1:3000/hot-coffee.html
    Here is a list of all hot coffe. for implementaion as the structure of these two page hot and ice are almost the same I decide to merge all javascript code in one coffee.js file. In the main madule the getcoffeetype fuction detects which pages is seleted by user then the co-related data will be fetched and shows in the page.

    I designed a grid foe showing the result and a flecx in each grid cell to manage the image and description.

    I also implemented pagination for browsing  and showing all data neat and organized.

    3- Iced-Coffee : http://127.0.0.1:3000/iced-coffee.html
    Here is a list of all Iced coffe with related information and image.

    4-Find your favorit coffe:http://127.0.0.1:3000/index.html
    In this page user can select which kind of coffee he will and based on selected coffe tye a list will be shown. This list is involving all the ingredient in hotcoffee API.The data is grouped by ingredients deletails.
    by selecting favorite items in chekbox and clicking search button the coffe result will be shown.This list is including all the coffees which contains those selected ingredients.
