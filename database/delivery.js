import { getAuth } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const createDelivery = async (delivery) => {
  const firestore = getFirestore();
  const document = await addDoc(collection(firestore, "deliveries"), delivery);
  return document;
};

const updateDelivery = async (id, delivery) => {
  const firestore = getFirestore();
  const document = await setDoc(doc(firestore, "deliveries", id), delivery);
  return document;
};

const removeDelivery = async (id) => {
  const firestore = getFirestore();
  await deleteDoc(doc(firestore, "deliveries", id));
};
const getDeliveries = async (state = "all") => {
  const userId = getAuth().currentUser.uid;
  const firestore = getFirestore();
  let q = null;
  if (state == "all") {
    q = query(
      collection(firestore, "deliveries"),
      where("userId", "==", userId)
    );
  } else
    q = query(
      collection(firestore, "deliveries"),
      where("state", "==", state),
      where("userId", "==", userId)
    );
  const queryResult = await getDocs(q);
  const data = [];
  queryResult.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

const getDelivery = async (id) => {
  const firestore = getFirestore();
  const docRef = doc(firestore, "deliveries", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return undefined;
  }
};

export {
  createDelivery,
  getDeliveries,
  getDelivery,
  updateDelivery,
  removeDelivery,
};
