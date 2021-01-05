"use strict";

const { RouteResource } = require("@adonisjs/framework/src/Route/Manager");
const UserController = require("../app/Controllers/Http/UserController");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", "UserController.home");

Route.get("/viewPosts", "UserController.viewPosts").middleware("auth");

Route.post("/addPost", "UserController.addPost").middleware("auth");

Route.put("/editPost/:id", "UserController.editPost").middleware("auth");

Route.post("/register", "UserController.register");

Route.post("/login", "UserController.login");

// Route.get("/about", "UserController.about");

// Route.get("/contact", "UserController.contact");
