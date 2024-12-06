import { User } from "@/ts/types";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  User as FirebaseUser,
  getAuth,
} from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import axios from "axios";
import { SignUpFormData } from "@/pages/login";

const firebaseConfig = {
  apiKey: "AIzaSyCGSQ3xLid-8JY9jUVaz3bDEmkfrshk3i4",
  authDomain: "chat-app-6d61d.firebaseapp.com",
  projectId: "chat-app-6d61d",
  storageBucket: "chat-app-6d61d.firebasestorage.app",
  messagingSenderId: "313875108042",
  appId: "1:313875108042:web:a1aa9723ccf499e45ee433",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Funciones relacionadas con usuarios
export const createUser = async (
  userData: Omit<User, "createdAt" | "lastActive">
) => {
  console.log("userData: ", userData);
  const userRef = doc(db, "users", userData.uid);
  await setDoc(userRef, {
    ...userData,
    createdAt: serverTimestamp(),
    lastActive: serverTimestamp(),
  });
};

const uploadImageToImgBB = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data.url;
  } catch (error) {
    throw new Error(`Error uploading image: ${error}`);
  }
};

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const signUp = async (data: SignUpFormData) => {
  const { email, password, profilePicture, quote, name: displayName } = data;

  try {
    const photoURL = await uploadImageToImgBB(profilePicture);
    console.log("photoURL: ", photoURL);

    if (!photoURL) {
      throw new Error("Photo url is undefined");
    }

    // 1. Crear el usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 2. Actualizar el perfil con displayName y photo
    await updateProfile(user, {
      displayName,
      photoURL,
    });
    console.log("updated profile");

    // 3. Crear el documento del usuario en Firestore
    await createUser({
      uid: user.uid,
      email: user.email!,
      displayName,
      photoURL,
      status: quote,
    });

    console.log("user created and register");

    return user;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};
