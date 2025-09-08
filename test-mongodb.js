#!/usr/bin/env node

// MongoDB Connection Test Script
// This script tests the MongoDB connection and basic operations

const { MongoClient } = require('mongodb');

async function testMongoDB() {
  console.log('🔍 Testing MongoDB Connection...\n');

  // Check if MONGODB_URI environment variable is set
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is not set');
    console.log('💡 Please create a .env.local file with MONGODB_URI=your_mongodb_connection_string');
    process.exit(1);
  }

  console.log('✅ MONGODB_URI environment variable found');
  console.log(`🔗 Connection string: ${MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}\n`);

  let client;

  try {
    // Test 1: Create MongoDB client
    console.log('📋 Test 1: Creating MongoDB client...');
    client = new MongoClient(MONGODB_URI);
    console.log('✅ MongoDB client created successfully\n');

    // Test 2: Connect to MongoDB
    console.log('📋 Test 2: Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB successfully\n');

    // Test 3: Ping the database
    console.log('📋 Test 3: Pinging database...');
    const db = client.db();
    const pingResult = await db.admin().ping();
    console.log('✅ Database ping successful:', pingResult, '\n');

    // Test 4: Get database info
    console.log('📋 Test 4: Getting database information...');
    const dbName = db.databaseName;
    console.log(`✅ Connected to database: ${dbName}\n`);

    // Test 5: List collections
    console.log('📋 Test 5: Listing collections...');
    const collections = await db.listCollections().toArray();
    console.log(`✅ Found ${collections.length} collections:`);
    collections.forEach(collection => {
      console.log(`   - ${collection.name}`);
    });
    console.log('');

    // Test 6: Test users collection (if exists)
    console.log('📋 Test 6: Testing users collection...');
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    console.log(`✅ Users collection contains ${userCount} documents\n`);

    // Test 7: Test read/write permissions
    console.log('📋 Test 7: Testing read/write permissions...');
    const testCollection = db.collection('test_connection');
    
    // Insert a test document
    const testDoc = { 
      test: true, 
      timestamp: new Date(),
      message: 'MongoDB connection test'
    };
    
    const insertResult = await testCollection.insertOne(testDoc);
    console.log('✅ Test document inserted with ID:', insertResult.insertedId);

    // Read the test document
    const foundDoc = await testCollection.findOne({ _id: insertResult.insertedId });
    console.log('✅ Test document retrieved:', foundDoc?.message);

    // Clean up test document
    await testCollection.deleteOne({ _id: insertResult.insertedId });
    console.log('✅ Test document cleaned up\n');

    console.log('🎉 All MongoDB tests passed successfully!');
    console.log('✅ Your MongoDB connection is working correctly.');

  } catch (error) {
    console.error('❌ MongoDB connection test failed:');
    console.error('Error details:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.log('💡 This usually means the MongoDB URI hostname is incorrect or unreachable.');
    } else if (error.code === 8000) {
      console.log('💡 Authentication failed. Please check your username and password.');
    } else if (error.code === 13) {
      console.log('💡 Authorization failed. Please check your database permissions.');
    }
    
    process.exit(1);
  } finally {
    // Always close the connection
    if (client) {
      await client.close();
      console.log('\n🔌 MongoDB connection closed.');
    }
  }
}

// Run the test
if (require.main === module) {
  testMongoDB().catch(error => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  });
}

module.exports = { testMongoDB };
