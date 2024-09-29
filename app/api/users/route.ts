import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

export async function POST(request: NextRequest) {
  console.log('POST request received');

  const uri = process.env.MONGODB_URI || "";
  console.log('MongoDB URI:', uri);

  try {
    const userData = await request.json();
    console.log('Received user data:', userData);


    delete userData['_id'];

    const client = new MongoClient(uri);

    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db("girlhacks");
    const collection = db.collection("users");

    console.log('Updating user data...');
    const result = await collection.updateOne(
      { sub: userData.sub },
      { $set: userData },
      { upsert: true }
    );
    console.log('Update result:', result);

    await client.close();
    console.log('MongoDB connection closed');

    return NextResponse.json({ 
      message: 'User updated successfully', 
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      upsertedCount: result.upsertedCount
    });
  } catch (error) {
    console.error('Error in POST request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Keep the GET method for fetching users
export async function GET(request: NextRequest) {
  console.log('GET request received');

  const uri = process.env.MONGODB_URI || "";
  console.log('MongoDB URI:', uri);

  const client = new MongoClient(uri);

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db("girlhacks");
    const collection = db.collection("users");

    console.log('Fetching users...');
    const { searchParams } = new URL(request.url);
    const sub = searchParams.get('sub');

    console.log('Fetching users...');
    let users;
    if (sub) {
      // If 'sub' is provided, search for a specific user
      users = await collection.find({ sub: sub }).limit(1).toArray();
    } else {
      // If no 'sub' is provided, fetch all users (limited to 10)
      users = await collection.find({}).limit(10).toArray();
    }
    console.log('Fetched users:', users);

    await client.close();
    console.log('MongoDB connection closed');

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}