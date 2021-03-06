import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  getDocFromCache,
  addDoc,
  updateDoc,
} from "firebase/firestore";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
};

export const app = getApps().length === 0 ? initializeApp(config) : getApp();
export const db = getFirestore(app);

function parseDocument(document) {
  return { id: document.id, ...document.data() };
}

export async function getAll(name) {
  const snapshot = await getDocs(query(collection(db, name)));
  return snapshot.docs.map(parseDocument);
}

export async function getOne(name, id) {
  const snapshot = await getDocFromCache(doc(db, name, id));
  return parseDocument(snapshot);
}

export async function getOneFromCache(name, id) {
  const snapshot = await getDocFromCache(doc(db, name, id));
  return snapshot;
}

export function add(name, data) {
  return addDoc(collection(db, name), data);
}

export function editOne(name, data) {
  return updateDoc(doc(db, name, data.id), data);
}
