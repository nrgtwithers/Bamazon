// Dependencies (npm packages)
var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require("columnify");
// Variable to connect to sql
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password & mysql database
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    // to Show in termin if it works.
    console.log("connected as id " + connection.threadId);
    managerPrompt();
});


function managerPrompt() {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
        name: "managerChoice"
    }]).then(function (action) {
        switch (action.managerChoice) {
            case "View Products for Sale":
                viewStock();
                break;
            case "View Low Inventory":
                lowStock();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "Exit": 
                exit();
                break;
        };
    })
}

function exit(){
    console.log(`Goodbye.`)
    connection.end();
}

function viewStock() {
    console.log("Showing current inventory...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // This is to utilize the columnify dependency and to add display products
        var columns = columnify(res, {
            columnSplitter: ' | '
        })

        console.log(columns)

        console.log(``);
    })
    // connection.end();
}

function lowStock() {
    console.log("Checking on low inventory items...\n");
    // Showing products that are less than 10
    connection.query("SELECT * FROM products WHERE stock_quantity < 10", function (err, res) {
        if (err) throw err;
        // This is to utilize the columnify dependency and to add display products
        console.log(``);
        var columns = columnify(res, {
            columnSplitter: ' | '
        })

        console.log(columns)
        console.log('')
        //Calling on your manager's main menu
        managerPrompt();
    });
}

function addInventory() {

    inquirer.prompt([{

        type: "input",
        name: "inputId",
        message: "Please enter the ID number of the item you would like to add inventory to.",
    },
    {
        type: "input",
        name: "inputNumber",
        message: "How many units of this item would you like to have in the in-store stock quantity?",

    }
    ]).then(function (managerAdd) {
        connection.query("SELECT stock_quantity FROM products WHERE ?", { id: managerAdd.id }, function (results) {
            console.log(results)
            connection.query("UPDATE products SET ? WHERE ?", [{

                stock_quantity: managerAdd.inputNumber + results.stock_quantity
            }, {
                id: managerAdd.inputId
            }], function (err) {
                if (err) throw err;
                console.log("Inventory Updated!")
                //   console.log(managerAdd.inputNumber);
                //   console.log(managerAdd.inputId)
                console.log('')
            });
        })
    });
}

// function addInventory() {
//     inquirer.prompt([{

//         type: "input",
//         name: "chooseID",
//         message: "Please enter the ID number of the item you would like to add inventory to.",
//         validate: function (value) {
//             if (isNaN(value) === false && parseInt(value) >= 1) {
//                 return true;
//             }
//             return false;
//         }
//     },
//     {
//         type: "input",
//         name: "addUnits",
//         message: "How many units of this item would you like to have in the in-store stock quantity?",
//         validate: function (value) {
//             if (isNaN(value) === false && parseInt(value) >= 1) {
//                 return true;
//             }
//             return false;
//         }
//     }
//     ]).then(function (update) {
//         console.log("Updating Inventory...\n");
//         console.log(update.addUnits)
//         console.log(update.chooseID)
//         // connection.query("SELECT stock_quantity FROM products WHERE ?", { id: update.chooseID }, function (err, res) {
//             connection.query(
//                 // Updating Stock quantities in database
//                 "UPDATE products SET ? WHERE ?",
//                 [{
//                     stock_quantity: update.addUnits
//                 }, {
//                     item_id: update.chooseID
//                 }], function (err){
//                     if (err) throw err;
//                     console.log(`Item ${update.chooseID} stock quantity has been updated by ${update.addUnits}.`)
//                 })
//             // });
//     });
// }   

// This function it to ask the necessary questions to add to inventory. 
function addProduct() {
    inquirer.prompt([{

        type: "input",
        name: "productName",
        message: "Please enter the name of the new product."
    },
    {
        type: "input",
        name: "addUnits",
        message: "How many units of this item do you have?",
        validate: function (value) {
            if (isNaN(value) === false && parseInt(value) >= 1) {
                return true;
            }
            return false;
        }
    },
    {
        type: "input",
        name: "departmentName",
        message: "What department is this product in?"
    },
    {
        type: "input",
        name: "addPrice",
        message: "What is the price of this new item",
        validate: function (value) {
            if (isNaN(value) === false && parseInt(value) >= 1) {
                return true;
            }
            return false;
        }
    }
    ]).then(function (action) {
        var newProduct = {
            product_name: action.productName,
            department_name: action.departmentName,
            price: action.addPrice,
            stock_quantity: action.addUnits
        }
        connection.query("INSERT INTO products SET ?", newProduct, function (err) {
            if (err) throw err;
            console.log(action.productName + " has been succesfully added to your inventory! \n");
            //Calling on your manager's main menu
            managerPrompt();
        });
    });

}


