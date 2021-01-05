"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Post = use("App/Models/Post");
const User = use("App/Models/User");
const Hash = use("Hash");
class UserController {
  home({ request, response }) {
    return "Welcome to Adonis";
  }

  //Register User
  async register({ request, response }) {
    let user = new User();
    const data = request.only(["username", "email", "password"]);
    console.log(data);
    let emailExist = await User.query().where("email", data.email).first(1);
    let usernameExist = await User.query()
      .where("username", data.username)
      .first();
    if (emailExist === null && usernameExist === null) {
      user.username = data.username;
      user.email = data.email;
      user.password = data.password;
      await user.save();
      response.json({
        user,
        message: "User Registered",
      });
    } else {
      response.json({
        message: "User already Exist",
      });
    }
  }
  // Login User
  async login({ request, response, auth }) {
    try {
      const { email, password } = request.all();
      const user = await User.query().where("email", email).first(1);
      const verify_password = await Hash.verify(password, user.password);
      if (verify_password) {
        const token = await auth.attempt(email, password);
        console.log(token);
        return token;
      } else {
        return "Failed";
      }
    } catch (error) {
      return error.toString();
    }
  }
  async viewPosts() {
    const posts = await Post.all();
    return posts;
  }

  async addPost({ request, response, auth }) {
    const post = new Post();
    try {
      const user = await auth.getUser();

      const { title, body } = request.all();
      console.log(title);
      post.user_id = user.id;
      post.title = title;
      post.body = body;
      await post.save();

      return post;
    } catch (error) {
      response.send("You are not logged in");
    }
  }
  async editPost({ request, response, params, auth }) {
    try {
      const user = await auth.getUser();
      const { title, body } = request.all();
      const { id } = params;
      console.log(id);
      console.log(user.id);
      const post = await Post.find(id);
      console.log(post);
      post.title = title;
      post.body = body;
      await post.save();
      return post;
    } catch (error) {
      response.send("You are not logged in");
    }
  }
}
module.exports = UserController;
