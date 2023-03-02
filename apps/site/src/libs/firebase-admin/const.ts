import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import type { App, AppOptions } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import type { Auth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import type { Firestore } from "firebase-admin/firestore";

declare global {
  var FIREBASE_ADMIN_APP: App;
  var FIREBASE_ADMIN_AUTH: Auth;
  var FIREBASE_ADMIN_FIRESTORE: Firestore;
}

const options: AppOptions = {
  credential: credential.cert({
    clientEmail: process.env.FIREBASE_ADMIN_CREDENTIAL_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_CREDENTIAL_PRIVATE_KEY.replace(/\\n/gm, "\n"),
    projectId: process.env.FIREBASE_ADMIN_CREDENTIAL_PROJECT_ID,
  }),
  serviceAccountId: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_ID,
  storageBucket: process.env.FIREBASE_ADMIN_STORAGE_BUCKET,
};

function globalSetup<T extends keyof typeof globalThis>(name: T, callback: () => typeof globalThis[T]) {
  if (!globalThis[name]) globalThis[name] = callback();
  return globalThis[name];
}

const app = globalSetup("FIREBASE_ADMIN_APP", () => initializeApp(options));
const auth = globalSetup("FIREBASE_ADMIN_AUTH", () => getAuth(app));
const firestore = globalSetup("FIREBASE_ADMIN_FIRESTORE", () => {
  const instance = getFirestore(app);
  instance.settings({ ignoreUndefinedProperties: true });
  return instance;
});

export { app, auth, firestore };
