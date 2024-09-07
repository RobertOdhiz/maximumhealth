const admin = require('firebase-admin');
const serviceAccount = require('../Providers/Firebase'); // Path to your Firebase credentials JSON

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

class dbClient {
  constructor() {
    this.db = admin.firestore();
  }

  // Method to check if the connection is alive
  async isAlive() {
    try {
      await this.db.listCollections(); // Attempt to list collections to check connection
      console.log('DB connection successful');
      return true;
    } catch (error) {
      console.error('Error connecting to DB:', error);
      return false;
    }
  }

  // Function to get data
  async get(collection, documentId) {
    if (!documentId) {
      console.log("No document ID provided");
      return null;
    }

    try {
      const docRef = this.db.collection(collection).doc(documentId);
      const doc = await docRef.get();
      if (!doc.exists) {
        console.log('No such document!');
        return null;
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  }

  // Function to set (update or create) data
  async set(collection, documentId, data) {
    try {
      await this.db.collection(collection).doc(documentId).set(data);
      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error writing document:', error);
      throw error;
    }
  }

  // Function to delete data
  async delete(collection, documentId) {
    try {
      await this.db.collection(collection).doc(documentId).delete();
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }

  // Function to post (create) data
  async post(collection, data) {
    try {
      const docRef = await this.db.collection(collection).add(data);
      console.log('Document successfully added with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  }

  // Function to get all documents with optional filtering by userId
  async getAll(collection, userId = null) {
    try {
      let query = this.db.collection(collection);
      
      // Apply filtering if userId is provided
      if (userId) {
        query = query.where('userId', '==', userId);
      }

      const snapshot = await query.get();
      const data = [];

      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
      });

      return data;
    } catch (error) {
      console.error(`Error getting all documents in ${collection}:`, error);
      throw error;
    }
  }
}

module.exports = new dbClient();
