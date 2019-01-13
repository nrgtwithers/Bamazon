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
    // console.log("connected as id " + connection.threadId);
    startBamazon();
});


// Display the products in stock with table capability shown in terminal
// Actions available for Customer to choose and item w/ ID
function startBamazon() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(``)
        console.log(`....................Welcome Valued Customer to BAMAZON!...................`)
        console.log(``)
        console.log(`------------Feel free to check out what we have to purchase.--------------`)
        console.log(``)
        console.log('__________________________________________________________________________')
        // This is to utilize the columnify dependency and to add display products
        var columns = columnify(res, {
            columnSplitter: ' | '
        })

        console.log(columns)

        console.log(``);
        inquirer
            .prompt([
                {
                    // Ask Customer how many would they like to purchase
                    type: "input",
                    message: "Please enter the ID of the product you would like to purchase.",
                    name: "id",
                    // Make sure products to purchase is only an integer / positive number
                    validate: function (value) {
                        if (isNaN(value) === false && parseInt(value) <= res.length && parseInt(value) > 0) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    type: "input",
                    message: "How many would you like to purchase?",
                    name: "qty",
                    // Make sure products to purchase is only an integer / positive number
                    validate: function (value) {
                        if (isNaN(value) === false && parseInt(value) >= 1) {
                            return true;
                        }
                        return false;
                    }
                }
            ]).then(function (answers) {
                connection.query("SELECT stock_quantity, price FROM products WHERE ?", { id: answers.id }, function (err, results) {
                    // Complete transaction if theres enough in stock
                    if (answers.qty <= results[0].stock_quantity) {
                        connection.query(
                            // Updating Stock quantities in database
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: results[0].stock_quantity - answers.qty
                                },
                                {
                                    id: answers.id
                                }
                            ],
                            function (error) {
                                if (error) throw err;
                                //   console.log(results)
                                // Variable to find the total price.
                                var totalPrice = answers.qty * results[0].price
                                console.log(``)
                                console.log(`You have decided to purchase ${answers.qty} units of item number ${answers.id}`)
                                console.log(``)
                                console.log(`Your total is ${totalPrice}.`)
                                // console.log(`Thank you for you purchase.`)
                                confirmPurchase();
                            }
                        );
                    } else {
                        // If not enough let Customer know not enough product in stock.
                        console.log(`Sorry, at this time we do not have enough products in stock to fulfill your purchase.`)
                    }
                    connection.end();
                })
              
            });

    });
}


function confirmPurchase() {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmation",
        message: "Are you sure you would like to purchase this item(s)?",
        default: true

    }]).then(function(choice) {
        // console.log(choice.confirmation)
        if (choice.confirmation == true) {
            console.log(``);
            console.log(`Transaction has been completed. Thank you for your purchase!`);
            console.log(``);
        } else {
            console.log(``);
            console.log(`Aw, maybe next time.`)
            console.log(``);
        }
    });
}
