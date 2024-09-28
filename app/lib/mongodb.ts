import { MongoClient } from 'mongodb';

   const uri = process.env.MONGODB_URI; // Get this from your MongoDB Atlas or local setup

   let client;

   export async function connectToDatabase() {
     if (!client) {
       client = new MongoClient(uri);
       await client.connect();
     }
     return client.db();
   }