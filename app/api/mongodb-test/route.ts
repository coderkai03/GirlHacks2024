import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

export async function GET() {
  const client = new MongoClient(uri);
  
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    
    // Make a simple query to test the connection
    await client.db("admin").command({ ping: 1 });
    
    return NextResponse.json({ message: "Successfully connected to MongoDB!" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Failed to connect to MongoDB" }, { status: 500 });
  } finally {
    // Close the connection
    await client.close();
  }
}