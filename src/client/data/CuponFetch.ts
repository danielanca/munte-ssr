import { doc, getFirestore, getDoc, DocumentData } from "firebase/firestore";
import app from "./../firebase";

const db = getFirestore(app);

export const getCuponData = async (): Promise<Array<DocumentData>> => {
  const documentRef = doc(db, "cupondiscount", "activeCupon");
  const docSnap = await getDoc(documentRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const dataArray = Object.values(data);
    return dataArray;
  } else {
    console.log("No Cupon Data here");
    return [];
  }
};
