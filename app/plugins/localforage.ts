// plugins/localforage.ts
import localforage from 'localforage'

// local forage to store pinia state and persist it across sessions with IndexedDB
// This is useful for offline support and faster access to state data
// It is configured to use IndexedDB as the storage driver and sets the name and storeName for the database.
localforage.config({
  name: 'apolloSystem',
  storeName: 'pinia',
  driver: localforage.INDEXEDDB, 
})

export default localforage
