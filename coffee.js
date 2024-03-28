

const hotCoffeeUrl = 'https://api.sampleapis.com/coffee/hot'; // Assuming hot coffee endpoint
const icedCoffeeUrl = 'https://api.sampleapis.com/coffee/iced'; // Assuming iced coffee endpoint
let searchData ;

function handleError(error) {
  console.error('Error fetching coffee data:', error);
 
}

// Function to fetch coffee data based on type (hot or iced)
async function getCoffeeData(coffeeType) {
  let url;
  if (coffeeType === 'hot') {
    url = hotCoffeeUrl;
  } else if (coffeeType === 'iced') {
    url = icedCoffeeUrl;
  } else {
    // Handle invalid coffee type (optional)
    console.error('Invalid coffee type:', coffeeType);
    return []; // Return empty array to prevent issues
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
    return [];
  }
}


// Function to display hot coffee information with pagination controls
function displayCoffee(data) {
  const coffeeList = document.querySelector('.coffee-list');
  coffeeList.innerHTML = ""; // Clear existing content

  
  const itemsPerPage = 4; // Adjust as desired (number of coffees per page)
  let currentPage = 1; // Track current page

  // Create a single pagination container outside the function
  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('pagination');
  coffeeList.parentElement.appendChild(paginationContainer);

  // Function to display a specific page of coffee entries
  function displayCurrentPage(pageNumber) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    const pageData = data.slice(startIndex, endIndex);

    coffeeList.innerHTML = ""; // Clear previous content

    pageData.forEach(coffee => {
      const coffeeItem = document.createElement('div');
      coffeeItem.classList.add('coffee-item');

      coffeeItem.innerHTML = `
                              <h3> ${coffee.title}</h3>
                              <p>Ingredient: ${coffee.ingredients.join(', ')} <img src=${coffee.image} height="100px" width="100px"/></p>
                              <p id="description">${coffee.description}</p>`;
                              

      coffeeList.appendChild(coffeeItem);
    });

    paginationContainer.innerHTML = ""; // Clear previous pagination buttons

    
    if (pageNumber > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => displayCurrentPage(pageNumber - 1));
        paginationContainer.appendChild(prevButton);
    } 

    const pageDisplay = document.createElement('span');
    pageDisplay.textContent = `Page ${pageNumber} of ${Math.ceil(data.length / itemsPerPage)}`;
    paginationContainer.appendChild(pageDisplay);

    if (pageNumber < Math.ceil(data.length / itemsPerPage)) {
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Next';
      nextButton.addEventListener('click', () => displayCurrentPage(pageNumber + 1)); // Use pageNumber + 1 for "Next"
      paginationContainer.appendChild(nextButton);
    } else {
      // Disable "Next" button on the last page (optional)
      nextButton.disabled = true; // Assuming a nextButton variable exists within the if block
    }
  }

  // Call the function to display the first page (page 1)
  displayCurrentPage(currentPage);
}

// Get initial hot coffee data and display it on the page
async function main() {
    
    const coffeeType = getCoffeeTypeFromPage(); // Function to determine coffee type (explained below)
    const coffeeData = await getCoffeeData(coffeeType);
    displayCoffee(coffeeData);
    
}



main();
// Function to determine coffee type from the page 
 function getCoffeeTypeFromPage() {
    const url = window.location.href; // Get current page URL
    if (url.includes('hot-coffee') )  {
      return 'hot';
    } else if (url.includes('iced-coffee')) {
      return 'iced';
    }  
      else if (url.includes('search-coffee')){
        searchCoffeetype('hot') ;
    
      }
      else {
      // Handle unexpected page (optional)
      console.error('Could not determine coffee type from URL');
      return null;
    }
}

async function searchCoffeetype(selectedval) {
  const url = window.location.href; // Get current page URL
  if (url.includes('search-coffee')) {
    // Event listener for search input
    const radios = document.querySelectorAll('input');
    
        try {
          searchData= await getCoffeeData(selectedval);
          displaySearchdata(searchData);
        } catch (error) {
          console.error("Error fetching coffee data:", error);
          
        }
    
  } 
  else {
    // Handle unexpected page (optional)
    console.error('Could not determine coffee type from URL');
    return null;
  }
}


function displaySearchdata(data){
    
  // const p = document.getElementById('test');
  // p.innerHTML = "test"; // 

    const ingredientList = document.querySelector('.ingredient-list');
    ingredientList.innerHTML = ""; // Clear existing content
  
    const allIngredients = new Set(); // Use a Set to store unique ingredients
  
    data.forEach(coffee => {
              coffee.ingredients.forEach(ingredient => allIngredients.add(ingredient));
             

     });
   
      allIngredients.forEach(ingredient => {
      
      const listItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = ingredient; // Set unique ID for each checkbox
      listItem.innerText = ingredient;
      listItem.appendChild(checkbox);
      ingredientList.appendChild(listItem);
    
    });
    
  
     
}   
function search_list()
{
   // const p = document.getElementById('test');
  // p.innerHTML = "test"; // 
  //document.getElementById('coffee-results').innerHTML=searchData.length ;

  const selectedIngredients=[];
  const ingredientList = document.querySelector('.ingredient-list'); 
  const checkboxes = ingredientList.querySelectorAll('input[type="checkbox"]:checked');

  checkboxes.forEach(checkbox => selectedIngredients.push(checkbox.id));
  filteredCoffeeData = [];
  
  //document.getElementById('coffee-results').innerHTML=selectedIngredients.length ;
  
     searchData.forEach(coffee => {
 
         let hasAtLeastOneIngredient = false;
         selectedIngredients.forEach(ingredient => {
           if (coffee.ingredients.includes(ingredient)) {
             hasAtLeastOneIngredient = true;
             return; // Exit the loop if at least one ingredient is found
           }
          });
       
        
         if (hasAtLeastOneIngredient) {
           filteredCoffeeData.push(coffee);
         }
       }
  );
  //document.getElementById('coffee-results').innerHTML=filteredCoffeeData.length ;
  displayCoffeeResults(filteredCoffeeData); // Call function to display results
   

}  


// Function to display filtered coffee results
function displayCoffeeResults(coffeeData) {
  const coffeeResultsList = document.querySelector('.coffee-list');
  coffeeResultsList.innerHTML = ""; // Clear existing results
 // coffeeResultsList.innerHTML = coffeeData.length;

  if (coffeeData.length === 0) {
    coffeeResultsList.innerHTML = "<p>No coffee found matching your criteria.</p>";
  } else {
    coffeeData.forEach(coffee => {
      const listItem = document.createElement('li');
      listItem.innerText = `${coffee.title} (${coffee.ingredients}) `;
      coffeeResultsList.appendChild(listItem);
    });
  }

  document.getElementById('coffee-results').style.display = 'block'; // Show results section
}
   

