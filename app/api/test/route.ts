import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

export async function GET() {
  const uri = process.env.MONGODB_URI || "";
  console.log(uri)

  const client = new MongoClient(uri);

  const db = client.db("sample_mflix");

    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();
    
    return NextResponse.json(movies);
}