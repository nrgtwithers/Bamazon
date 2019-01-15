# Bamazon

Bamazon is Amazon-like storefront app. This app provides the capability for customers to be able to purchase a specific item by their ID number and specify the quantity they would like to purchase. 

## How to utilize Bamazon (Customer)

1. First, you must npm install -save prior to utilizing the app. (This will install the NPM packages MySQL, NPM Columnify, & NPM Inquirer)

1. Second, make sure you run the database in your MySQL and the code in `bamazonCustomer.js` is changed to your localhost and port. 

1. Then you should be able to pull up the example below, after typing this in your terminal `node bamazonCustomer.js`(*Make sure you're in the folder that you git clone this respository to*).

1. The app will welcome you to Bamazon and display the current items it has in stock. 

1. Customer will be prompted to choose which item would they like to purchase by ID number.

1. Customer will also be prompted to choose the amount of units to purchase. 

1. If the app finds we do not have enough in stock it will look like this example.
![nostock](https://github.com/nrgtwithers/Bamazon/blob/master/nostock.png?raw=true)

1. If the app finds that we have enough product in stock. It will discuss your total amount you would like to purchase and the total price.

1. It will then, ask for you to confirm your purchase. If yes, the transaction will be completed like the example below. 

![screenshot](https://github.com/nrgtwithers/Bamazon/blob/master/bamazonCustomer.png?raw=true)

1. If no, it will say "Aww, maybe next time." It will look like the example below.
![nopurch](https://github.com/nrgtwithers/Bamazon/blob/master/noconfirmation.png?raw=true)



## How to utilize Bamazon (Manager)

1. Repeat the Steps 1 thru 3 as above for Customer instructions, but utilize `bamazonManager.js`. 

1. Upon opening you will be given the following list of menu options to manage Bamazon inventory. 
![mainmenu](https://github.com/nrgtwithers/Bamazon/blob/master/mainmenumgr.png?raw=true)

1. When you choose the option `View Products for Sale`, the app will provide a list of all the products that Bamazon has. 
![view](https://github.com/nrgtwithers/Bamazon/blob/master/viewinventory.png?raw=true)

1. When you choose the option `View Low Inventory`, this will show you the products that have less than 10 in stock.
![lowinv](https://github.com/nrgtwithers/Bamazon/blob/master/lowinventory.png?raw=true)

1. When you choose the option `Add to Inventory`, this will allow you to add more units to the stock quantity of a specific item by it's ID number.
![addinv](https://github.com/nrgtwithers/Bamazon/blob/master/update.png?raw=true)

1. When you choose the option `Add New Product`, you will be able to add a new product to the Bamazon inventory. It will prompt the manager to provide the product name, stock quantity, department name, and price.
![addprod](https://github.com/nrgtwithers/Bamazon/blob/master/addnew.png?raw=true)

1. You'll notice that after every menu option you will be returned to the main menu. I wanted to add an exit option to close the query connection. 

![bye](https://github.com/nrgtwithers/Bamazon/blob/master/goodbye.png?raw=true)

### Technologies used
* NodeJS
* MySQL
* NPM inquirer
* NPM columnify
* NPM mysql
