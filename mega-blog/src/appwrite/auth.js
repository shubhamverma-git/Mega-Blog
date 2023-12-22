import conf from "../conf/conf"; // step 1: import conf to get all database id
import { Client, Account, ID } from "appwrite";

// better approach to write quality code

export class AuthService {
  // step 2: creating and export class

  // creating two new properties

  client = new Client(); // step 4: creating client
  account;

  // step 5: creating constructor
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // step 6: creating method to call appwrite services and put them into a wrapper

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // step 8: call another method to login the user immediate after creating account
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // step 7: creating another method

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // step 9: creating method to see whether the user is logged in or not
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }

    return null; // this will help if the error is in if/else statement
  }

  // step 10: creating logout method s
  async logout() {
    await this.account.deleteSessions();
    try {
    } catch (error) {
      console.log("Appwrite service  :: logout :: error", error);
    }
  }
}

const authService = new AuthService(); // step 3:  creating object authService

export default AuthService;
