import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.APPWRITE_URL) // Your API Endpoint
      .setProject(conf.APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }
  async createAcc({ email, password, name }) {
    try {
      const userAcc = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAcc) {
        // calling login
        return this.loginAcc({ email, password });
      } else {
        return userAcc;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginAcc({ email, password }) {
    try {
      const userLogin = await this.account.createEmailSession(email, password);
      return userLogin;
    } catch (error) {
      throw error;
    }
  }

  async getCurrUser(){
    try {
    return  await this.account.get();
    //can use if(accFound){
      //  return accFound
      //  else 
       // return null; 
    } 
    catch (error) {
        throw error;
    }
    return null; //default operation
  }
async logout(){
    try {
        await this.account.deleteSessions()
        //can use delete session with session id etc
    } catch (error) {
        console.log ("::Logout::Appwrite",error);
        
    }
}

}
const authService = new AuthService();
export default AuthService;
