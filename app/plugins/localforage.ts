// plugins/localforage.ts
import localforage from 'localforage'

localforage.config({
  name: 'apolloSystem',
  storeName: 'pinia',
  driver: localforage.INDEXEDDB, // force IndexedDB
})

export default localforage
