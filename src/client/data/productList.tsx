// src/client/data/productList.tsx
import {
  collection,
  doc,
  getFirestore,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import app from "./../firebase";
const db = getFirestore(app);

/** ---------- Domain types ---------- */
export interface Product {
  ID: string;
  ULbeneficii: string[];
  firstDescription: string;
  imageProduct: string[];
  jsonContent: string;
  price: string;
  discountedPrice: string;
  realStock: string;
  realStockCheck: string;
  fakeStock: string;
  fakeStockCheck: string;
  reviews: Record<string, unknown>;
  shortDescription: string;
  title: string;
  productTotalReviews?: number;
}
export type ProductMap = Record<string, Product>;

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
  items: Array<{ product: string; price: number; quantity: number }>;
}

/** ---------- Module-scoped cache (optional) ---------- */
let productList: Product[] = [];

/** ---------- Existing API (unchanged) ---------- */
export const getOrderByID = async (invoiceID: number): Promise<DocumentData | null> => {
  const ref = doc(db, "orders", invoiceID.toString());
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as DocumentData) : null;
};

export const getAllOrders = async (): Promise<DocumentData[]> => {
  const snapShot = await getDocs(collection(db, "orders"));
  const dataProducts: DocumentData[] = [];
  snapShot.forEach((d: QueryDocumentSnapshot<DocumentData>) => dataProducts.push(d.data()));
  return dataProducts;
};

/**
 * Create a product.
 * By default it adds/updates inside the single map doc: products/activeProds.
 * Pass mode: "doc" to store each product as its own document at products/{ID}.
 */
export const addProduct = async (
  product: Product,
  mode: "map" | "doc" = "map",
  opts?: { mapDoc?: string } // override the map doc name if needed
): Promise<{ ok: boolean; id?: string; fieldKey?: string; reason?: string }> => {
  if (!product || !product.ID) {
    return { ok: false, reason: "Product.ID is required" };
  }

  if (mode === "doc") {
    // one document per product: products/{ID}
    const ref = doc(db, "products", product.ID);
    await setDoc(ref, product, { merge: false });
    return { ok: true, id: product.ID };
  }

  // default: keep everything in a single map doc (e.g., activeProds)
  const mapDoc = opts?.mapDoc ?? "activeProds";
  const ref = doc(db, "products", mapDoc);
  const snap = await getDoc(ref);
  const fieldKey = product.ID; // you can customize the key if you want

  if (snap.exists()) {
    await updateDoc(ref, { [fieldKey]: product });
  } else {
    await setDoc(ref, { [fieldKey]: product });
  }

  return { ok: true, fieldKey };
};

/**
 * Delete an order by ID.
 * Primary model: one doc per order → orders/{orderID}
 * Fallback model (optional): a single map doc → orders/activeOrders (or custom via opts.mapDoc)
 */
export const deleteOrderByID = async (
  orderID: string | number,
  opts?: { mapDoc?: string }
): Promise<{ ok: boolean; reason?: string }> => {
  const id = String(orderID);

  // Try the per-document model first
  const perDocRef = doc(db, "orders", id);
  const perDocSnap = await getDoc(perDocRef);
  if (perDocSnap.exists()) {
    await deleteDoc(perDocRef);
    return { ok: true };
  }

  // Fallback: map document (e.g., orders/activeOrders)
  const mapDoc = opts?.mapDoc ?? "activeOrders";
  const mapRef = doc(db, "orders", mapDoc);
  const mapSnap = await getDoc(mapRef);
  if (!mapSnap.exists()) return { ok: false, reason: "Order not found" };

  const data = mapSnap.data() as Record<string, any>;
  const entry = Object.entries(data).find(
    ([key, val]) => key === id || val?.ID === id || val?.invoiceID === id
  );
  if (!entry) return { ok: false, reason: "Order not found in map doc" };

  const [fieldKey] = entry;
  await updateDoc(mapRef, { [fieldKey]: deleteField() });
  return { ok: true };
};


export const getData = async (): Promise<ProductMap> => {
  const snapShot = await getDocs(collection(db, "products"));
  let dataProducts: ProductMap = {};
  snapShot.forEach((docSnap) => {
    const values = Object.values(docSnap.data()) as Product[];
    values.forEach((itemData) => {
      dataProducts[itemData.ID] = { ...itemData };
    });
  });
  return dataProducts;
};

export const getProductWithID = async (productID: string): Promise<ProductMap | null> => {
  const ref = doc(db, "products", "activeProds");
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const productsAreHere: ProductMap = {};
  (Object.values(snap.data()) as Product[]).forEach((item) => {
    productsAreHere[item.ID] = { ...item };
  });
  return productsAreHere;
};

const getallPr = async (): Promise<Product[]> => {
  const ref = doc(db, "products", "activeProds");
  const snap = await getDoc(ref);
  return snap.exists() ? (Object.values(snap.data()) as Product[]) : [];
};

export const getInvoiceByID = async (
  ID: string
): Promise<Record<string, unknown> | null> => {
  const invoiceData = doc(db, "invoice", "activeInvoice");
  const snapInvoice = await getDoc(invoiceData);
  if (!snapInvoice.exists()) return null;

  const invoicesAreHere: Record<string, unknown> = {};
  (Object.values(snapInvoice.data()) as InvoiceModel[]).forEach((invoice) => {
    (invoicesAreHere as any)[invoice.ID] = {
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
      items: invoice.items,
    };
  });

  return invoicesAreHere;
};

export const getObjectByID = (id: string): Promise<DocumentData | null> => {
  const documentRef = doc(db, "orders", id);
  return getDoc(documentRef)
    .then((documentSnapshot) =>
      documentSnapshot.exists() ? (documentSnapshot.data() as DocumentData) : null
    );
};

/** ---------- NEW: match your imports in Products.tsx ---------- */

/**
 * Delete a product by its logical Product.ID.
 * Works in two common layouts:
 * 1) Each product is its own doc: products/{ID}   (delete entire doc)
 * 2) All products are fields inside one doc: products/activeProds
 *    (delete the field whose value has .ID === productID)
 */
export const deleteProductByID = async (
  productID: string
): Promise<{ ok: boolean; reason?: string }> => {
  // Try doc-per-product first
  const perDocRef = doc(db, "products", productID);
  const perDocSnap = await getDoc(perDocRef);
  if (perDocSnap.exists()) {
    await deleteDoc(perDocRef);
    return { ok: true };
  }

  // Fallback: inside a single map doc (activeProds)
  const mapRef = doc(db, "products", "activeProds");
  const mapSnap = await getDoc(mapRef);
  if (!mapSnap.exists()) return { ok: false, reason: "No products map found" };

  const data = mapSnap.data() as Record<string, Product>;
  const entry = Object.entries(data).find(([, val]) => val?.ID === productID);
  if (!entry) return { ok: false, reason: "Product not found in activeProds" };

  const [fieldKey] = entry;
  await updateDoc(mapRef, { [fieldKey]: deleteField() });
  return { ok: true };
};

/**
 * Update a product by ID.
 * - mode "doc": updates the document at products/{productID}
 * - mode "map": updates the field inside products/{mapDoc} whose value has .ID === productID
 */
export const updateProduct = async (
  productID: string,
  updates: Partial<Product>,
  mode: "map" | "doc" = "map",
  opts?: { mapDoc?: string; fieldKey?: string }
): Promise<{ ok: boolean; reason?: string }> => {
  if (!productID) return { ok: false, reason: "productID is required" };
  if (!updates || Object.keys(updates).length === 0) {
    return { ok: false, reason: "no updates provided" };
  }

  if (mode === "doc") {
    const ref = doc(db, "products", productID);
    const snap = await getDoc(ref);
    if (!snap.exists()) return { ok: false, reason: "product doc not found" };

    // ✅ Patch the doc using merge (avoids updateDoc typing issues)
    await setDoc(ref, updates, { merge: true });
    return { ok: true };
  }

  // mode === "map"
  const mapDoc = opts?.mapDoc ?? "activeProds";
  const ref = doc(db, "products", mapDoc);
  const snap = await getDoc(ref);
  if (!snap.exists()) return { ok: false, reason: `map doc "${mapDoc}" not found` };

  const data = snap.data() as Record<string, Product>;
  let fieldKey = opts?.fieldKey;
  if (!fieldKey) {
    const found = Object.entries(data).find(([, val]) => val?.ID === productID);
    if (!found) return { ok: false, reason: "product not found in map doc" };
    fieldKey = found[0];
  }

  const current = data[fieldKey];
  const next: Product = { ...current, ...updates };

  // ✅ Patch the map doc field using merge
  await setDoc(ref, { [fieldKey]: next }, { merge: true });
  return { ok: true };
};



/**
 * Copy all products from one doc to another (default: activeProds → activeProdsBackup).
 * If merge=true, it will merge into the target doc; otherwise it overwrites.
 */
export const copyAllData = async (
  from: string = "activeProds",
  to: string = "activeProdsBackup",
  merge: boolean = true
): Promise<{ ok: boolean; reason?: string }> => {
  const fromRef = doc(db, "products", from);
  const toRef = doc(db, "products", to);

  const snap = await getDoc(fromRef);
  if (!snap.exists()) return { ok: false, reason: `Source doc "${from}" not found` };

  await setDoc(toRef, snap.data(), { merge });
  return { ok: true };
};

/** ---------- Warm the cache (optional) ---------- */
getallPr().then((data) => {
  productList = data;
  // console.log("Done");
});

export default productList;
