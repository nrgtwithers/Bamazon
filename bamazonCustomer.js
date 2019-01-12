var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
    chooseAction();
  });
}

var chooseAction = function () {
    inquirer.prompt([{
        type: "number",
        message: "What item would you like to purchase",
        choices: [],
        name: "itemID"
    }]).then(function (response) {
        if (response.decision == "Bid on an item") {
            [
                inquirer.prompt([
                    {
                        "type": "select",
                        "message": "What would you like to bid on?",
                        "choices": [],
                        "name": "item"
                    },
                    {
                        "type": "number",
                        "message": "What're you willing to pay for it?",
                        "name": "currentBid"
                    }
                ])
            ]
        }
    }