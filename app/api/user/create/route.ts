// pages/api/users/create.js

import {connectToDatabase} from "@/app/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    const db = await connectToDatabase();
    const users = db.collection('users');

    const result = await users.insertOne({ name, email });

    res.status(201).json({ message: 'User created', id: result.insertedId });
  }
}