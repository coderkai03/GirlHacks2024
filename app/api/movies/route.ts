import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

export async function GET() {
    console.log("get", uri)
//   const client = new MongoClient(uri);
  
//   try {
//     await client.connect();
//     const db = client.db("sample_mflix");
//     const movies = await db
//       .collection("movies")
//       .find({})
//       .sort({ metacritic: -1 })
//       .limit(10)
//       .toArray();
    
//     return NextResponse.json(movies);
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json({ error: 'An error occurred while fetching movies' }, { status: 500 });
//   } finally {
//     await client.close();
//   }
NextResponse.json("good");
}