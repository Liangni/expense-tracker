# Expense Tracker
A project built with **Node.js**, **Express.js**, and **MongoDB** for tracking personal expenses, which allows **LOGIN with 3rd-party(Facebook) account**.

To experience the application deployed on **HEROKU**, please visit https://secure-forest-54600.herokuapp.com/

![image](/public/images/home-pic.PNG)

## Features
*  **REGISTER:** sign up an account with name, email, password
*  **LOGIN:** sign in to review your own expenses
*  **LOGIN with 3rd-party account:** quick login with Facebook account
*  **LOGOUT:** sign out the account by clicking the logout button
*  **CREATE:** record your expense (with item name, date, category, amount) at the create page 
*  **READ:** review all the expenses at the home page
*  **UPDATE:** click the edit button to modify expense's data
*  **DELETE:** click the delete button to delete the expense
*  **FILTER:** filter the expenses by category

## Installation and Execution
1.  Clone the files to your computer
```
git clone https://github.com/Liangni/expense-tracker.git
```
2. Init: install the npm packages
```
cd expense-tracker
```
```
npm install
```
3. Insert seeder (**[Must be in the following order])
```
npm run category-seed
```
```
npm run record-seed
```
4. Run the project
```
npm run dev
```
- While the terminal returns `Express is listening on localhost:3000`, please visit http://localhost:3000 on your browser.


## Dummy user data
#### After inserting the seeder, you may use the following dummy data to log in the web application.
| Email              | Password |
| -------------------| ---------|
| root@example.com   | 12345678 |



## Prerequisites
*  [Visual Studio Code](https://code.visualstudio.com/) - development environment
*  [Node.js](https://nodejs.org/en/) & [npm](https://www.npmjs.com/) - JavaScript runtime environment
*  [Express.js](https://expressjs.com/) - web application framework
*  [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - template engine
*  [MongoDB](https://www.mongodb.com/) - document-oriented database
*  [Mongoose](https://mongoosejs.com/) - MongoDB object document modeling tool(ODM)
*  [body-parser](https://www.npmjs.com/package/body-parser) - middleware
*  [method-override](https://www.npmjs.com/package/method-override) - middleware
*  [express-session](https://www.npmjs.com/package/express-session) - middleware
*  [passport](http://www.passportjs.org/) - authentication middleware for Node.js
*  [bcrypt.js](https://www.npmjs.com/package/bcryptjs) - middleware
*  [Facebook for Developer](https://developers.facebook.com/) - get APP_ID & APP_SECRET for passport-facebook
