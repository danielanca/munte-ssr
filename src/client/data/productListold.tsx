import {
  collection,
  doc,
  getFirestore,
  getDoc,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot
} from "firebase/firestore";
import app from "../firebase";
const db = getFirestore(app);

// Types and Interfaces
export interface ProductType {
  ID: string;
  ULbeneficii: [];
  firstDescription: string;
  imageProduct: [];
  jsonContent: string;
  price: string;
  discountedPrice: string;
  realStock: string;
  realStockCheck: string;
  fakeStock: string;
  fakeStockCheck: string;
  reviews: {};
  shortDescription: string;
  title: string;
}

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface InvoiceModel {
  ID: string;
  client: {
    fullName: string;
    CUI: string;
    banca: string;
    adresa: string;
    email: string;
    telefon: string;
  };
  provider: {
    fullName: string;
    adresa: string;
    telefon: string;
  };
  items: InvoiceItem[];
}

export interface FlattenedInvoice {
  ID: string;
  clientName: string;
  clientCUI: string;
  clientBanca: string;
  clientAdresa: string;
  clientTelefon: string;
  clientEmail: string;
  providerName: string;
  providerAdresa: string;
  providerTelefon: string;
  items: InvoiceItem[];
}

// Product cache
let productList: ProductType[] = [];

// Firebase utils
export const getOrderByID = async (invoiceID: number) => {
  const productData = doc(db, "orders", invoiceID.toString());
  const snap = await getDoc(productData);
  return snap.exists() ? snap.data() : undefined;
};

export const getAllOrders = async () => {
  const snapShot = await getDocs(collection(db, "orders"));
  const dataProducts: DocumentData[] = [];
  snapShot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    dataProducts.push(doc.data());
  });
  return dataProducts;
};

export const getData = async () => {
  const snapShot = await getDocs(collection(db, "products"));
  let dataProducts: { [key: string]: ProductType } = {};

  snapShot.forEach((doc) => {
    Object.values(doc.data()).forEach((itemData: ProductType) => {
      dataProducts[itemData.ID] = {
        ...itemData
      };
    });
  });

  return dataProducts;
};

export const getProductWithID = async (productID: string) => {
  const productData = doc(db, "products", "activeProds");
  const snap = await getDoc(productData);
  let productsAreHere: { [key: string]: ProductType } = {};

  if (snap.exists()) {
    Object.values(snap.data()).forEach((item: ProductType) => {
      productsAreHere[item.ID] = { ...item };
    });
  }

  console.log("getProductWithID will return:", productsAreHere);
  return productsAreHere;
};

const getAllProductsFlat = async (): Promise<ProductType[]> => {
  const productData = doc(db, "products", "activeProds");
  const snap = await getDoc(productData);
  return snap.exists() ? Object.values(snap.data()) as ProductType[] : [];
};

export const getInvoiceByID = async (ID: string) => {
  const invoiceData = doc(db, "invoice", "activeInvoice");
  const snapInvoice = await getDoc(invoiceData);
  const invoicesAreHere: { [key: string]: FlattenedInvoice } = {};

  if (snapInvoice.exists()) {
    Object.values(snapInvoice.data()).forEach((invoice: InvoiceModel) => {
      invoicesAreHere[invoice.ID] = {
        ID: invoice.ID,
        clientName: invoice.client.fullName,
        clientCUI: invoice.client.CUI,
        clientBanca: invoice.client.banca,
        clientAdresa: invoice.client.adresa,
        clientTelefon: invoice.client.telefon,
        clientEmail: invoice.client.email,
        providerName: invoice.provider.fullName,
        providerAdresa: invoice.provider.adresa,
        providerTelefon: invoice.provider.telefon,
        items: invoice.items
      };
    });
  }

  console.log("getInvoiceByID will return:", invoicesAreHere);
  return invoicesAreHere;
};

export const getObjectByID = (id: string): Promise<DocumentData | null> => {
  const documentRef = doc(db, "orders", id);

  return new Promise((resolve, reject) => {
    getDoc(documentRef)
      .then((documentSnapshot) => {
        if (documentSnapshot.exists()) {
          const objectData = documentSnapshot.data();
          console.log("Object data is:", objectData);
          resolve(objectData);
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching object from Firebase:", error);
        reject(error);
      });
  });
};

// Load productList once at module load
getAllProductsFlat().then((data) => {
  productList = data;
  console.log("Product list loaded.");
});

export default productList;
