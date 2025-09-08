import { connectToDatabase } from './src/lib/mongodb';

interface TestResult {
  success: boolean;
  message: string;
  error?: string;
}

async function testMongoDBConnection(): Promise<TestResult[]> {
  const results: TestResult[] = [];

  try {
    console.log('🔍 Testing MongoDB Connection using your app\'s connection function...\n');

    // Test 1: Connect to database
    console.log('📋 Test 1: Connecting to MongoDB...');
    const { client, db } = await connectToDatabase();
    results.push({ success: true, message: 'Connected to MongoDB successfully' });
    console.log('✅ Connected to MongoDB successfully\n');

    // Test 2: Ping the database
    console.log('📋 Test 2: Pinging database...');
    const pingResult = await db.admin().ping();
    results.push({ success: true, message: `Database ping successful: ${JSON.stringify(pingResult)}` });
    console.log('✅ Database ping successful:', pingResult, '\n');

    // Test 3: Get database info
    console.log('📋 Test 3: Getting database information...');
    const dbName = db.databaseName;
    results.push({ success: true, message: `Connected to database: ${dbName}` });
    console.log(`✅ Connected to database: ${dbName}\n`);

    // Test 4: List collections
    console.log('📋 Test 4: Listing collections...');
    const collections = await db.listCollections().toArray();
    results.push({ success: true, message: `Found ${collections.length} collections: ${collections.map(c => c.name).join(', ')}` });
    console.log(`✅ Found ${collections.length} collections:`);
    collections.forEach(collection => {
      console.log(`   - ${collection.name}`);
    });
    console.log('');

    // Test 5: Test users collection
    console.log('📋 Test 5: Testing users collection...');
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    results.push({ success: true, message: `Users collection contains ${userCount} documents` });
    console.log(`✅ Users collection contains ${userCount} documents\n`);

    // Test 6: Test read/write permissions
    console.log('📋 Test 6: Testing read/write permissions...');
    const testCollection = db.collection('connection_test');
    
    // Insert a test document
    const testDoc = { 
      test: true, 
      timestamp: new Date(),
      message: 'MongoDB connection test from YouApp'
    };
    
    const insertResult = await testCollection.insertOne(testDoc);
    console.log('✅ Test document inserted with ID:', insertResult.insertedId);

    // Read the test document
    const foundDoc = await testCollection.findOne({ _id: insertResult.insertedId });
    console.log('✅ Test document retrieved:', foundDoc?.message);

    // Clean up test document
    await testCollection.deleteOne({ _id: insertResult.insertedId });
    console.log('✅ Test document cleaned up');
    
    results.push({ success: true, message: 'Read/write permissions test passed' });

    console.log('\n🎉 All MongoDB tests passed successfully!');
    console.log('✅ Your MongoDB connection is working correctly.');

    return results;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    results.push({ success: false, message: 'MongoDB connection test failed', error: errorMessage });
    
    console.error('\n❌ MongoDB connection test failed:');
    console.error('Error details:', errorMessage);
    
    if (errorMessage.includes('ENOTFOUND')) {
      console.log('💡 This usually means the MongoDB URI hostname is incorrect or unreachable.');
    } else if (errorMessage.includes('authentication failed')) {
      console.log('💡 Authentication failed. Please check your username and password.');
    } else if (errorMessage.includes('MONGODB_URI')) {
      console.log('💡 Please create a .env.local file with your MongoDB connection string.');
      console.log('💡 You can use .env.local.example as a template.');
    }
    
    return results;
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testMongoDBConnection()
    .then((results) => {
      const failedTests = results.filter(r => !r.success);
      if (failedTests.length > 0) {
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('❌ Unexpected error:', error);
      process.exit(1);
    });
}

export { testMongoDBConnection };
