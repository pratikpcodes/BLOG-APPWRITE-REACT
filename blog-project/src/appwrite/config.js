import conf from "../config/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.APPWRITE_URL) // Your API Endpoint
      .setProject(conf.APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug,

        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service ::Create Post::error", error);
    }
  }
  //slug is more needed to identify doc
  //better way to code
  //can use in object itself
  async updatePost(
    slug,
    { title, slug, content, featuredImage, status, userId }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service ::UpdatePost::error", error);
    }
  }
  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug
      );
      ///return false/true
    } catch (error) {
      console.log("APPWRITE DELETE POST::error", error);
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log("APPWRITE:::getPOST::error", erro);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        queries
        // 100,//pagination
        // 0,
      );
    } catch (error) {
      console.log("APPWRITE:::getPOSTS::error", error);
    }
  }

  // file upload
  // not only name give file blob
  async upLoadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.APPWRITE_BUCKET_ID,
        ID.unique(),
        file

        //file id is returned
      );
    } catch (error) {
      console.log("APPWRITE SERVICE::UPLOADFILE::ERROR", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.APPWRITE_BUCKET_ID, fileId);
      return true;
    } catch (error) {
      console.log("APPWRITE::delete uploaded file::error", error);
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.APPWRITE_BUCKET_ID, fileId);
  }
}
const service = new Service();

export default service;
