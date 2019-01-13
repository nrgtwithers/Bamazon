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
    displayProducts();
});


// Display the products in stock with table capability shown in terminal
// Actions available for Customer to choose and item w/ ID
function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(``)
        console.log(`....................Welcome Valued Customer to BAMAZON!...................`)
        console.log(``)
        console.log(`------------Feel free to check out what we have to purchase.--------------`)
        console.log(``)
        console.log('__________________________________________________________________________')
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
                //test
                // console.log(check)
                connection.query("SELECT stock_quantity, price FROM products WHERE ?", { id: answers.id }, function (err, results) {
                    // Complete transaction if theres enough in stock
                    if (answers.qty <= results[0].stock_quantity) {
                        // console.log(`Thank you for your purchase!`)
                        connection.query(
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
                                var totalPrice = results[0].stock_quantity * results[0].price
                                console.log(`Thank you for your purchase! Your total is ${totalPrice}.`)
                            }
                        );
                    } else {
                        // If not enough let Customer know not enough product in stock.

                        console.log(`Sorry, we do not have enough products in stock.`)
                    }
                    connection.end();
                })
              
            });

    });
}

