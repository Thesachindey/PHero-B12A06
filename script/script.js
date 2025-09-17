// --------------------------------------------- load animation --------

const manageSpinner = () => {
    const allPlantsCardCont = document.querySelector('.card-cont');
    if (allPlantsCardCont.children.length === 0) {
        document.getElementById("spinner").classList.remove("hidden");
    } else {
        document.getElementById("spinner").classList.add("hidden");
    }
};

// ----------------------------- add to cart-----
const loadCartHistoryPlant = (id) => {

    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(categoriesPlants => {
            addCart(categoriesPlants.plants);
        });

}

// total price of cart item 
const totalAmt = document.getElementById("calculation");
let cartTotal = 0;
totalAmt.innerHTML = `0`;
const updateTotalDisplay = () => {
    totalAmt.textContent = String(cartTotal);
};
// --------------------------------------

const cardHistoryCont = document.querySelector('.card-history');
const addCart = (plant) => {
    // console.log(plant)
    const historyItem = document.createElement('div');
    historyItem.innerHTML = `
             <div
              class="cart-item-card p-2 bg bg-green-100 rounded-sm flex items-center justify-between mb-2 ">
                            <div class="card-info ">
                                <h3 class="text-[.65rem] font-bold mb-[.20rem]">${plant.name}</h3>
                                <p id="${plant.price}" class="text-[.8rem] text-gray-400">৳${plant.price} x 1</p>
                            </div>
                            <p onclick='removeCart(this)' data-price="${plant.price}" class="x text-[1rem] text-gray-400 cursor-pointer">x</p>
            </div>
            `
    cardHistoryCont.append(historyItem);
// add total amount of cart item 
    cartTotal += Number(plant.price);
    updateTotalDisplay();
}

// remove feature in cart
function removeCart(element) {
    const price = Number(element.getAttribute("data-price"));
    //by click X reduce  price
    cartTotal -= price;
    if (cartTotal < 0) cartTotal = 0;
    updateTotalDisplay();

    //by click X remove the whole card
    const card = element.closest(".cart-item-card");
    if (card) { card.remove() };
}




// Functionalities-1 : Category Loading Load Tree Categories dynamically on the left side.

// function for load Categories
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    fetch(url)//promise of response
        .then(res => res.json()) //promise of json data
        .then(categoriesData => displayCategories(categoriesData.categories)) //here we get the categories data
}

// Display Categories 
const displayCategories = (categoriesName) => {
    // 1.get the container and clear the container
    const categoriesCont = document.querySelector('.categories-list');
    categoriesCont.innerHTML = ``;

    // 2. loop through the categoriesName list
    for (const categories of categoriesName) {
        // 3. create a div for each lesson
        const categoriesLi = document.createElement('ul');
        categoriesLi.innerHTML = `  
            <li id="categories-${categories.id}" onClick="loadCategoriesPlants(${categories.id})" class="categoriesClick hover:bg-[#15803D] hover:text-white rounded-sm p-2 cursor-pointer">${categories.category_name}</li>
        `
        // 4. append the div to the categoriesLi
        categoriesCont.appendChild(categoriesLi);
    }

}
loadCategories();

// ----------------------------------------------------------

// Functionalities-2 : Category Click → Tree Data On clicking a category: load trees of that category.


// load all plants info 
const loadAllPlants = () => {
    manageSpinner();
    const url = `https://openapi.programming-hero.com/api/plants`;
    fetch(url)//promise of response
        .then(res => res.json()) //promise of json data
        .then(allPlantsData => displayAllPlants(allPlantsData.plants)) //here we get the categories data

}

// Display ALL Plants info
const displayAllPlants = (allPlantsInfo) => {
    // 1.get the plants card-cont container and clear the container
    const allPlantsCardCont = document.querySelector('.card-cont');
    allPlantsCardCont.innerHTML = ``;

    // 2. loop through the allPlantsInfo 
    for (const plant of allPlantsInfo) {


        // "id": 1,
        // "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
        // "name": "Mango Tree",
        // "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
        // "category": "Fruit Tree",
        // "price": 500

        // 3. create a div for each card
        const card = document.createElement('div');
        card.innerHTML = `  
             <div class="card bg-white p-4 min-w-44 max-w-150 flex flex-col justify-center items-center max-h-[22rem] shadow-lg ">
                        <figure>
                            <img src="${plant.image}"
                                alt="Shoes" class="rounded-xl" />
                        </figure>

                        <div class="card-info flex flex-col items-start">
                            <h2 onclick="loadPlantsInfo(${plant.id})" class="cursor-pointer  font-bold items-start text-sm my-2">${plant.name}</h2>
                            <p class="text-xs text-gray-500">
                            ${plant.description}
                            </p>
                        </div>

                        <div class="badge-money flex justify-between w-full mt-3">
                            <span class=" bg-[#DCFCE7]  rounded-full ">
                                <p class="text-sm px-3 py-1 font-medium text-[#15803D]">${plant.category}</p>
                            </span>
                            <span class="money text-sm">৳${plant.price}</span>
                            </div>
                            <div class="mt-3 w-full">
                            <button onclick="loadCartHistoryPlant(${plant.id})" class=" cursor-pointer hover:bg-[#1da950]  btn btn-primary btn-block bg-[#15803D] rounded-full shadow-none text-xs">Add
                                To Cart</button>
                        </div>
                    </div>

        `
        // 4. append the card in to the  allPlantsCardCont
        allPlantsCardCont.appendChild(card);

        // console.log(plant);
    }
    manageSpinner();
}
loadAllPlants();

// -------------------------------------------------------------

// load categories wise Plants 
const loadCategoriesPlants = (id) => {
    manageSpinner();
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(categoriesPlants => {
            removeActiveClass();
            const clickCategories = document.getElementById(`categories-${id}`);
            clickCategories.classList.add("active");
            displayCategoriesPlants(categoriesPlants.plants);
        });

}
// add active for allPlants categories
const allPlantsActive = () => {
    const allPlants = document.getElementById("allCategories");
    allPlants.classList.add('active');
}

// --------------------------for active remove ----------------
const removeActiveClass = () => {
    const categoriesClick = document.querySelectorAll('.categoriesClick');
    categoriesClick.forEach(categories => categories.classList.remove('active'));

    // remove active class for allPlants categories
    const allPlants = document.getElementById("allCategories");
    allPlants.classList.remove('active');
}


// display categories wise Plants 
const displayCategoriesPlants = (plants) => {
    const allPlantsCardCont = document.querySelector('.card-cont');
    allPlantsCardCont.innerHTML = ``;

    for (const plant of plants) {

        const card = document.createElement('div');
        card.innerHTML = `  
             <div class="card bg-white p-4 min-w-44 max-w-150 flex flex-col justify-center items-center max-h-[22rem] shadow-lg ">
                        <figure>
                            <img src="${plant.image}"
                                alt="Shoes" class="rounded-xl" />
                        </figure>

                        <div class="card-info flex flex-col items-start">
                            <h2 onclick="loadPlantsInfo(${plant.id})" class="cursor-pointer font-bold items-start text-sm my-2">${plant.name}</h2>
                            <p class="text-xs text-gray-500">
                            ${plant.description}
                            </p>
                        </div>

                        <div class="badge-money flex justify-between w-full mt-3">
                            <span class=" bg-[#DCFCE7]  rounded-full ">
                                <p class="text-sm px-3 py-1 font-medium text-[#15803D]">${plant.category}</p>
                            </span>
                            <span class="money text-sm">৳${plant.price}</span>
                            </div>
                            <div class="mt-3 w-full">
                            <button onclick="loadCartHistoryPlant(${plant.id})" class=" cursor-pointer hover:bg-[#1da950]  btn btn-primary btn-block bg-[#15803D] rounded-full shadow-none text-xs">Add
                                To Cart</button>
                        </div>
                    </div>

        `
        allPlantsCardCont.appendChild(card);

    }
    manageSpinner();

}
// ----------------------------------------------------------
// load all plant info for modal 
const loadPlantsInfo = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;

    const response = await fetch(url);
    const data = await response.json();
    displayAllPlantsInfo(data.plants);
}


// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500

// display All Plants info for modal 

const displayAllPlantsInfo = (PlantsInfo) => {
    // console.log(PlantsInfo);
    my_modal_5.showModal();
    const box = document.querySelector('.modal-box');
    box.innerHTML = `
    <div id="modal" class="flex flex-col items-start justify-center p-5 bg-gray-50 rounded-xl gap-3">

     <div class="">
                    <h1 class="font-bold">${PlantsInfo.name}</h1>
                </div>
               <div class="img w-full flex items-center justify-center">
                   <img class="h-[60%] w-[60%] rounded-xl shadow-lg" src="${PlantsInfo.image}" alt="">

               </div>
            
                <div class="text-xs">
                    <span class="text-sm font-bold">Category:</span> ${PlantsInfo.category}
                </div>
                <div class="text-xs">
                    <span class="text-sm font-bold">Price:</span> ৳${PlantsInfo.price}
                </div>
                <div class="text-xs">
                    <span class="text-sm font-bold">Description: </span>${PlantsInfo.description}
                </div>
                <div class="modal-action">
                    <form method="dialog" class="">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class=" btn btn-primary btn-block bg-[#15803D] rounded-lg shadow-none text-xs px-20">Close</button>
                    </form>
                </div>
            
            </div>
           
    </div>
            
    `



}



