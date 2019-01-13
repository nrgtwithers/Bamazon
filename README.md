# Bamazon

Bamazon is Amazon-like storefront app. This app provides the capability for customers to be able to purchase a specific item by their ID number and specify the quantity they would like to purchase. 

## How to utilize Bamazon

1. First, you must npm install -save prior to utilizing the app. (This will install the NPM packages MySQL, NPM Columnify, & NPM Inquirer)

1. Second, make sure you run the database in your MySQL and the code in `bamazonCustomer.js` is changed to your localhost and port. 

1. Then you should be able to pull up the example below, after typing this in your terminal `node bamazonCustomer.js`(*Make sure you're in the folder that you git clone this respository to*).

1. The app will welcome you to Bamazon and display the current items it has in stock. 

1. Customer will be prompted to choose which item would they like to purchase by ID number.

1. Customer will also be prompted to choose the amount of units to purchase. 

1. If the app finds that we have enough product in stock. It will discuss your total amount you would like to purchase and the total price.

1. It will then, ask for you to confirm your purchase. If yes, the transaction will be completed. If no, it will say "Aww, maybe next time."

![screenshot](https://github.com/nrgtwithers/Bamazon/blob/master/bamazonCustomer.png?raw=true)

### Tasks

-[x] Complete Manager & Supervisor Capability. 

-[x] Record live demo & updated README.md.

### Technologies used
* NodeJS
* MySQL
* NPM inquirer
* NPM columnify
* NPM mysql
