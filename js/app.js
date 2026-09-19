// =========================
// PANTRY - LOCAL STORAGE
// =========================

let pantryItems = JSON.parse(localStorage.getItem("pantryItems")) || [];

if (pantryItems.length === 3) {

    pantryItems.push(
        {
            name: "Apples",
            category: "fruits"
        },
        {
            name: "Milk",
            category: "dairy"
        },
        {
            name: "Rice",
            category: "staples"
        },
        {
            name: "Carrots",
            category: "vegetables"
        },
        {
            name: "Eggs",
            category: "dairy"
        },
        {
            name: "Tomatoes",
            category: "vegetables"
        }
    );

    localStorage.setItem(
        "pantryItems",
        JSON.stringify(pantryItems)
    );
}

let shoppingItems = JSON.parse(localStorage.getItem("shoppingItems")) || [];

if (shoppingItems.length === 0) {

    shoppingItems = [
        {
            name: "Milk",
            category: "Dairy",
            completed: false
        },
        {
            name: "Bread",
            category: "Staples",
            completed: false
        },
        {
            name: "Tomatoes",
            category: "Vegetables",
            completed: false
        }
    ];

    localStorage.setItem(
        "shoppingItems",
        JSON.stringify(shoppingItems)
    );
}
// =========================
// PANTRY - ADD ITEM MODAL
// =========================

// Pantry category emojis
function getPantryEmoji(category) {

    if (category === "fruits") {
        return "🍎🍌🍓";
    }

    if (category === "vegetables") {
        return "🥕🥦🌽";
    }

    if (category === "dairy") {
        return "🥛🧀🧈";
    }

    if (category === "staples") {
        return "🍚🍞🌾";
    }

    if (category === "snacks") {
        return "🍪🍿🍫";
    }

    if (category === "beverages") {
        return "🥤☕🧃";
    }

    return "📦";
}
let addItemButton = document.getElementById("addItemButton");
let addItemModal = document.getElementById("addItemModal");
let closeModal = document.getElementById("closeModal");
let cancelButton = document.getElementById("cancelButton");
let saveItemButton = document.getElementById("saveItemButton");


// Only run Pantry code if the Pantry elements exist

if (addItemButton && addItemModal) {

    // Open modal
    addItemButton.addEventListener("click", function () {

        addItemModal.style.display = "flex";

    });


    // Close modal
    if (closeModal) {

        closeModal.addEventListener("click", function () {

            addItemModal.style.display = "none";

        });

    }


    // Cancel button
    if (cancelButton) {

        cancelButton.addEventListener("click", function () {

            addItemModal.style.display = "none";

        });

    }


    // Add new pantry item
    if (saveItemButton) {

        saveItemButton.addEventListener("click", function () {

            let itemName =
                document.getElementById("itemName").value.trim();

            let itemCategory =
                document.getElementById("itemCategory").value;


            if (itemName === "") {

                alert("Please enter an item name.");

                return;

            }


            if (itemCategory === "") {

                alert("Please select a category.");

                return;

            }


            let pantryGrid =
                document.getElementById("pantryGrid");


            let newItem =
                document.createElement("div");


            newItem.className = "pantry-item";


            newItem.setAttribute(
                "data-category",
                itemCategory
            );


            newItem.innerHTML = `

                <div class="item-image">
                   ${getPantryEmoji(itemCategory)} 
                </div>

                <div class="item-details">

                    <span class="item-category">
                        ${itemCategory.toUpperCase()}
                    </span>

                    <h3>${itemName}</h3>

                    <p>Added to your pantry</p>

                </div>

                <span class="available">
                    ✓ Available
                </span>

                <button class="edit-pantry-item">
                   ✏️
                </button>

                <button class="delete-pantry-item">
                   🗑️
                </button>    
                
        

            `;


            pantryGrid.appendChild(newItem);
            // Save Pantry item
            pantryItems.push({
                name: itemName,
                category: itemCategory
            });

            localStorage.setItem(
                "pantryItems",
                 JSON.stringify(pantryItems)
            );
            // Make delete button work
            let deletePantryButton =
                newItem.querySelector(".delete-pantry-item");
            deletePantryButton.addEventListener("click", function () {
                newItem.remove();
            });
            // Make edit button work
            let editPantryButton =
                newItem.querySelector(".edit-pantry-item");

            editPantryButton.addEventListener("click", function () {

                currentPantryItem = newItem;

                editItemName.value =
                    newItem.querySelector("h3").textContent;

                editItemCategory.value =
                    newItem.dataset.category;

                editItemModal.style.display = "flex";
            });



            // Clear form
            document.getElementById("itemName").value = "";

            document.getElementById("itemCategory").value = "";


            // Close modal
            addItemModal.style.display = "none";

        });

    }

}


// =========================
// PANTRY - SEARCH
// =========================

let searchInput =
    document.getElementById("searchInput");


if (searchInput) {

    searchInput.addEventListener("input", function () {

        let searchText =
            searchInput.value.toLowerCase();


        let pantryItems =
            document.querySelectorAll(".pantry-item");


        pantryItems.forEach(function (item) {

            let itemName =
                item.querySelector("h3").textContent.toLowerCase();


            if (itemName.includes(searchText)) {

                item.style.display = "flex";

            } else {

                item.style.display = "none";

            }

        });

    });

}


// =========================
// PANTRY - CATEGORY FILTER
// =========================

let categoryButtons =
    document.querySelectorAll(".category");


if (categoryButtons.length > 0) {

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {


            // Remove active style
            categoryButtons.forEach(function (btn) {

                btn.classList.remove("active-category");

            });


            // Add active style
            button.classList.add("active-category");


            let selectedCategory =
                button.textContent.trim().toLowerCase();


            let pantryItems =
                document.querySelectorAll(".pantry-item");


            pantryItems.forEach(function (item) {

                let itemCategory =
                    item.dataset.category;


                if (

                    selectedCategory === "all items" ||

                    (
                        selectedCategory.includes("fruits") &&
                        (
                            itemCategory === "fruits" ||
                            itemCategory === "vegetables"
                        )
                    ) ||

                    (
                        selectedCategory.includes("dairy") &&
                        itemCategory === "dairy"
                    ) ||

                    (
                        selectedCategory.includes("staples") &&
                        itemCategory === "staples"
                    )

                ) {

                    item.style.display = "flex";

                } else {

                    item.style.display = "none";

                }

            });

        });

    });

}

// =========================
// PANTRY - LOAD SAVED ITEMS
// =========================

pantryItems.forEach(function (savedItem) {

    let pantryGrid =
        document.getElementById("pantryGrid");

    if (!pantryGrid) {
        return;
    }

    let newItem =
        document.createElement("div");

    newItem.className = "pantry-item";
    newItem.setAttribute(
        "data-old-name",
        savedItem.name
    );

    newItem.setAttribute(
        "data-category",
        savedItem.category
    );

    newItem.innerHTML = `

        <div class="item-image">
            ${getPantryEmoji(savedItem.category)}
        </div>

        <div class="item-details">

            <span class="item-category">
                ${savedItem.category.toUpperCase()}
            </span>

            <h3>${savedItem.name}</h3>

            <p>Added to your pantry</p>

        </div>

        <span class="available">
            ✓ Available
        </span>

        <button class="edit-pantry-item">
            ✏️
        </button>

        <button class="delete-pantry-item">
            🗑️
        </button>

    `;

    pantryGrid.appendChild(newItem);

});


// =========================
// SHOPPING LIST - CHECK ITEMS
// =========================

let checkButtons =
    document.querySelectorAll(".check-button");


if (checkButtons.length > 0) {

    checkButtons.forEach(function (button) {

        button.addEventListener("click", function () {


            let shoppingItem =
                button.closest(".shopping-item");


            shoppingItem.classList.toggle("completed");


            updateProgress();

        });

    });

}


// =========================
// SHOPPING LIST - PROGRESS
// =========================

function updateProgress() {

    let shoppingItems =
        document.querySelectorAll(".shopping-item");


    let completedItems =
        document.querySelectorAll(
            ".shopping-item.completed"
        );


    let total =
        shoppingItems.length;


    let completed =
        completedItems.length;


    let progressText =
        document.getElementById("progressText");


    let progressFill =
        document.getElementById("progressFill");


    // Make sure these elements exist
    if (!progressText || !progressFill) {

        return;

    }


    progressText.textContent =
        completed + " / " + total + " completed";


    if (total > 0) {

        let percentage =
            (completed / total) * 100;


        progressFill.style.width =
            percentage + "%";

    } else {

        progressFill.style.width = "0%";

    }

}


// Show initial progress

if (document.querySelectorAll(".shopping-item").length > 0) {

    updateProgress();

}
// =========================
// SHOPPING LIST - DELETE ITEMS
// =========================

let deleteButtons =
    document.querySelectorAll(".delete-shopping-item");

if (deleteButtons.length > 0) {

    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            let shoppingItem =
                button.closest(".shopping-item");

            shoppingItem.remove();

            updateProgress();

        });

    });

}
// =========================
// SHOPPING LIST - ADD ITEM
// =========================

let addShoppingItemButton =
    document.getElementById("addShoppingItemButton");

let shoppingModal =
    document.getElementById("shoppingModal");

let closeShoppingModal =
    document.getElementById("closeShoppingModal");

let cancelShoppingButton =
    document.getElementById("cancelShoppingButton");

let saveShoppingButton =
    document.getElementById("saveShoppingButton");


if (addShoppingItemButton && shoppingModal) {

    // Open popup
    addShoppingItemButton.addEventListener("click", function () {

        shoppingModal.style.display = "flex";

    });


    // Close popup
    if (closeShoppingModal) {

        closeShoppingModal.addEventListener("click", function () {

            shoppingModal.style.display = "none";

        });

    }


    // Cancel
    if (cancelShoppingButton) {

        cancelShoppingButton.addEventListener("click", function () {

            shoppingModal.style.display = "none";

        });

    }


    // Add item
    if (saveShoppingButton) {

        saveShoppingButton.addEventListener("click", function () {

            let itemName =
                document.getElementById("shoppingItemName").value.trim();

            let itemCategory =
                document.getElementById("shoppingItemCategory").value;


            if (itemName === "") {

                alert("Please enter an item name.");

                return;

            }


            if (itemCategory === "") {

                alert("Please select a category.");

                return;

            }


            let shoppingList =
                document.getElementById("shoppingList");


            let newItem =
                document.createElement("div");


            newItem.className = "shopping-item";


            // Choose emoji based on item name

let itemEmoji = "🛒";

let lowerItemName = itemName.toLowerCase();

if (lowerItemName.includes("milk")) {
    itemEmoji = "🥛";
}
else if (lowerItemName.includes("bread")) {
    itemEmoji = "🍞";
}
else if (lowerItemName.includes("rice")) {
    itemEmoji = "🍚";
}
else if (lowerItemName.includes("apple")) {
    itemEmoji = "🍎";
}
else if (lowerItemName.includes("banana")) {
    itemEmoji = "🍌";
}
else if (lowerItemName.includes("orange")) {
    itemEmoji = "🍊";
}
else if (lowerItemName.includes("tomato")) {
    itemEmoji = "🍅";
}
else if (lowerItemName.includes("carrot")) {
    itemEmoji = "🥕";
}
else if (lowerItemName.includes("onion")) {
    itemEmoji = "🧅";
}
else if (lowerItemName.includes("potato")) {
    itemEmoji = "🥔";
}
else if (lowerItemName.includes("egg")) {
    itemEmoji = "🥚";
}
else if (lowerItemName.includes("cheese")) {
    itemEmoji = "🧀";
}
else if (lowerItemName.includes("butter")) {
    itemEmoji = "🧈";
}
else if (lowerItemName.includes("chicken")) {
    itemEmoji = "🍗";
}


            newItem.innerHTML = `

                <button class="check-button">
                    ✓
                </button>

                <div class="shopping-item-icon">
                    ${itemEmoji}
                </div>

                <div class="shopping-item-details">

                    <h3>
                        ${itemName}
                    </h3>

                    <p>
                        ${itemCategory}
                    </p>

                </div>

                <button class="edit-shopping-item">
                     ✏️
                </button>
    
                
                <button class="delete-shopping-item">
                    🗑️
                </button>

            `;


            shoppingList.appendChild(newItem);
            shoppingItems.push({
                name: itemName,
                category: itemCategory,
                completed: false
            });

            localStorage.setItem(
                "shoppingItems",
                 JSON.stringify(shoppingItems)
            );


            // Close popup
            shoppingModal.style.display = "none";


            // Clear form
            document.getElementById("shoppingItemName").value = "";

            document.getElementById("shoppingItemCategory").value = "";


            // Make new check button work
            let newCheckButton =
                newItem.querySelector(".check-button");


            newCheckButton.addEventListener("click", function () {

                newItem.classList.toggle("completed");

                updateProgress();

            });


            // Make new delete button work
            let newDeleteButton =
                newItem.querySelector(".delete-shopping-item");


            newDeleteButton.addEventListener("click", function () {

                newItem.remove();

                shoppingItems = shoppingItems.filter(function (item) {

                     return item.name !== itemName;

                });

                localStorage.setItem(
                    "shoppingItems",
                    JSON.stringify(shoppingItems)
                );


                updateProgress();

            });
            // Make new edit button work
            let newEditButton =
                newItem.querySelector(".edit-shopping-item");

            newEditButton.addEventListener("click", function () {

                currentShoppingItem = newItem;

                editShoppingItemName.value =
                    newItem.querySelector("h3").textContent.trim();

                editShoppingItemCategory.value =
                    newItem.querySelector("p").textContent.trim();

                editShoppingModal.style.display = "flex";

            });


            // Update progress
            updateProgress();

        });

    }

}
// =========================
// PANTRY - EXISTING ITEM DELETE
// =========================

let existingPantryDeleteButtons =
    document.querySelectorAll(".delete-pantry-item");

existingPantryDeleteButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let pantryItem =
            button.closest(".pantry-item");
        let itemName =    
            pantryItem.querySelector("h3").textContent.trim();

        pantryItem.remove();

         pantryItems =
            pantryItems.filter(function (item) {
                
                return item.name !== itemName;

    });
    localStorage.setItem(
            "pantryItems",
            JSON.stringify(pantryItems)
        );

    });

});

// =========================
// PANTRY - EDIT ITEM MODAL
// =========================

let editItemModal =
    document.getElementById("editItemModal");

let closeEditModal =
    document.getElementById("closeEditModal");

let cancelEditButton =
    document.getElementById("cancelEditButton");

let saveEditButton =
    document.getElementById("saveEditButton");

let editItemName =
    document.getElementById("editItemName");

let editItemCategory =
    document.getElementById("editItemCategory");

let currentPantryItem = null;


// Open Edit popup
document.querySelectorAll(".edit-pantry-item").forEach(function (button) {

    button.addEventListener("click", function () {

        currentPantryItem =
            button.closest(".pantry-item");

        let currentName =
            currentPantryItem.querySelector("h3").textContent;

        let currentCategory =
            currentPantryItem.dataset.category;

        editItemName.value = currentName;

        editItemCategory.value = currentCategory;

        editItemModal.style.display = "flex";

    });

});


// Close Edit popup
if (closeEditModal) {

    closeEditModal.addEventListener("click", function () {

        editItemModal.style.display = "none";

    });

}


// Cancel Edit
if (cancelEditButton) {

    cancelEditButton.addEventListener("click", function () {

        editItemModal.style.display = "none";

    });

}


// Save edited item
if (saveEditButton) {

    saveEditButton.addEventListener("click", function () {

        let newName =
            editItemName.value.trim();

        let newCategory =
            editItemCategory.value;


        if (newName === "") {

            alert("Please enter an item name.");

            return;

        }


        if (newCategory === "") {

            alert("Please select a category.");

            return;

        }


        // Update the Pantry card
        currentPantryItem.querySelector("h3").textContent =
            newName;

        currentPantryItem.dataset.category =
            newCategory;

        currentPantryItem.querySelector(".item-category").textContent =
            newCategory.toUpperCase();

        currentPantryItem.querySelector(".item-image").textContent =
            getPantryEmoji(newCategory);


        // Update localStorage
        let oldName =
            currentPantryItem.getAttribute("data-old-name");

        pantryItems =
            pantryItems.map(function (item) {

                if (item.name === oldName) {

                    return {
                        name: newName,
                        category: newCategory
                    };

                }

                return item;

            });


        localStorage.setItem(
            "pantryItems",
            JSON.stringify(pantryItems)
        );


        // Store the new name for future edits
        currentPantryItem.setAttribute(
            "data-old-name",
            newName
        );


        editItemModal.style.display = "none";

    });
}
// =========================
// SHOPPING LIST - LOAD SAVED ITEMS
// =========================

let shoppingList =
    document.getElementById("shoppingList");

if (shoppingList) {

    shoppingItems.forEach(function (savedItem) {

        let newItem =
            document.createElement("div");

        newItem.className = "shopping-item";

        if (savedItem.completed) {
            newItem.classList.add("completed");
        }

        // Choose emoji
        let itemEmoji = "🛒";

        let lowerItemName =
            savedItem.name.toLowerCase();

        if (lowerItemName.includes("milk")) {
            itemEmoji = "🥛";
        }
        else if (lowerItemName.includes("bread")) {
            itemEmoji = "🍞";
        }
        else if (lowerItemName.includes("rice")) {
            itemEmoji = "🍚";
        }
        else if (lowerItemName.includes("apple")) {
            itemEmoji = "🍎";
        }
        else if (lowerItemName.includes("banana")) {
            itemEmoji = "🍌";
        }
        else if (lowerItemName.includes("orange")) {
            itemEmoji = "🍊";
        }
        else if (lowerItemName.includes("tomato")) {
            itemEmoji = "🍅";
        }
        else if (lowerItemName.includes("carrot")) {
            itemEmoji = "🥕";
        }
        else if (lowerItemName.includes("onion")) {
            itemEmoji = "🧅";
        }
        else if (lowerItemName.includes("potato")) {
            itemEmoji = "🥔";
        }
        else if (lowerItemName.includes("egg")) {
            itemEmoji = "🥚";
        }
        else if (lowerItemName.includes("cheese")) {
            itemEmoji = "🧀";
        }
        else if (lowerItemName.includes("butter")) {
            itemEmoji = "🧈";
        }
        else if (lowerItemName.includes("chicken")) {
            itemEmoji = "🍗";
        }

        newItem.innerHTML = `

            <button class="check-button">
                ✓
            </button>

            <div class="shopping-item-icon">
                ${itemEmoji}
            </div>

            <div class="shopping-item-details">

                <h3>
                    ${savedItem.name}
                </h3>

                <p>
                    ${savedItem.category}
                </p>

            </div>

            <button class="edit-shopping-item">
                ✏️
            </button>

            <button class="delete-shopping-item">
                🗑️
            </button>

        `;

        shoppingList.appendChild(newItem);

        // Make check button work
        let checkButton =
            newItem.querySelector(".check-button");

        checkButton.addEventListener("click", function () {

            newItem.classList.toggle("completed");

            savedItem.completed =
                newItem.classList.contains("completed");

            localStorage.setItem(
                "shoppingItems",
                JSON.stringify(shoppingItems)
            );
            
            updateProgress();

        });

        // Make delete button work 
        let deleteButton = 
            newItem.querySelector(".delete-shopping-item"); 
 
        deleteButton.addEventListener("click", function () { 
 
            newItem.remove(); 
            shoppingItems = shoppingItems.filter(function (item) { 
                return item.name !== savedItem.name; 
            }); 
 
            localStorage.setItem( 
                "shoppingItems", 
                JSON.stringify(shoppingItems) 
            ); 
               
            updateProgress(); 
 
        });


        // Make new edit button work
        let newEditButton =
            newItem.querySelector(".edit-shopping-item");

        newEditButton.addEventListener("click", function () {

            currentShoppingItem = newItem;

            editShoppingItemName.value =
                newItem.querySelector("h3").textContent.trim();

            editShoppingItemCategory.value =
                newItem.querySelector("p").textContent.trim();

            editShoppingModal.style.display = "flex";

        });
         
 
    }); 
 
    updateProgress(); 
 
}
        
// =========================
// SHOPPING LIST - EDIT ITEM
// =========================

let editShoppingModal =
    document.getElementById("editShoppingModal");

let closeEditShoppingModal =
    document.getElementById("closeEditShoppingModal");

let cancelEditShoppingButton =
    document.getElementById("cancelEditShoppingButton");

let saveEditShoppingButton =
    document.getElementById("saveEditShoppingButton");

let editShoppingItemName =
    document.getElementById("editShoppingItemName");

let editShoppingItemCategory =
    document.getElementById("editShoppingItemCategory");

let currentShoppingItem = null;


// Open Edit popup
document.querySelectorAll(".edit-shopping-item").forEach(function (button) {

    button.addEventListener("click", function () {

        currentShoppingItem =
            button.closest(".shopping-item");

        editShoppingItemName.value =
            currentShoppingItem.querySelector("h3").textContent.trim();

        editShoppingItemCategory.value =
            currentShoppingItem.querySelector("p").textContent.trim();

        editShoppingModal.style.display = "flex";

    });

});


// Close Edit popup
if (closeEditShoppingModal) {

    closeEditShoppingModal.addEventListener("click", function () {

        editShoppingModal.style.display = "none";

    });

}


// Cancel Edit
if (cancelEditShoppingButton) {

    cancelEditShoppingButton.addEventListener("click", function () {

        editShoppingModal.style.display = "none";

    });

}
// Save edited shopping item
if (saveEditShoppingButton) {

    saveEditShoppingButton.addEventListener("click", function () {

        let newName =
            editShoppingItemName.value.trim();

        let newCategory =
            editShoppingItemCategory.value;


        if (newName === "") {

            alert("Please enter an item name.");

            return;

        }


        if (newCategory === "") {

            alert("Please select a category.");

            return;

        }


        // Get old item name
        let oldName =
            currentShoppingItem.querySelector("h3").textContent.trim();


        // Update the Shopping List card
        currentShoppingItem.querySelector("h3").textContent =
            newName;

        currentShoppingItem.querySelector("p").textContent =
            newCategory;


        // Update LocalStorage
        shoppingItems =
            shoppingItems.map(function (item) {

                if (item.name === oldName) {

                    return {
                        name: newName,
                        category: newCategory,
                        completed: item.completed
                    };

                }

                return item;

            });


        localStorage.setItem(
            "shoppingItems",
            JSON.stringify(shoppingItems)
        );


        // Close popup
        editShoppingModal.style.display = "none";

    });

}
// =========================
// HOME PAGE - COUNTS
// =========================

window.addEventListener("DOMContentLoaded", function () {

    let pantryCount =
        document.getElementById("pantryCount");

    let shoppingCount =
        document.getElementById("shoppingCount");

    if (pantryCount) {

        let savedPantryItems =
            JSON.parse(localStorage.getItem("pantryItems")) || [];

        pantryCount.textContent =
            savedPantryItems.length;
    }

    if (shoppingCount) {

        let savedShoppingItems =
            JSON.parse(localStorage.getItem("shoppingItems")) || [];

        shoppingCount.textContent =
            savedShoppingItems.length;
    }

});
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("service-worker.js")
            .then(function () {
                console.log("Service Worker registered successfully");
            })
            .catch(function (error) {
                console.log("Service Worker registration failed:", error);
            });
    });
}