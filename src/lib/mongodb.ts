import { Db, MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

interface MongoConnection {
  client: MongoClient;
  db: Db;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoConnection: MongoConnection | undefined;
}

let cachedConnection: MongoConnection | null = null;

export async function connectToDatabase(): Promise<MongoConnection> {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (global._mongoConnection) {
    cachedConnection = global._mongoConnection;
    return cachedConnection;
  }

  try {
    const client = new MongoClient(MONGODB_URI as string);
    await client.connect();

    const db = client.db();

    const connection = {
      client,
      db,
    };

    global._mongoConnection = connection;
    cachedConnection = connection;

    return connection;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}
