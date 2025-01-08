import {
  Chat,
  Message,
  SendMessageParams,
  User,
  UserChatData,
} from "@/ts/types";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  getAuth,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
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

const uploadImageToImgBB = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const { data } = await axios.post(
      "/.netlify/functions/uploadImages",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
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

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName,
      photoURL,
    });
    console.log("updated profile");

    await createUser({
      uid: user.uid,
      email: user.email!,
      displayName,
      photoURL,
      status: quote,
      displayNameLowerCase: displayName.toLowerCase(),
    });

    console.log("user created and register");

    return user;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

export const getUserData = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return null;
  return { ...userSnap.data(), uid: userSnap.id } as User;
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

export const searchUsers = async (searchTerm: string) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("displayNameLowerCase", ">=", searchTerm),
      where("displayNameLowerCase", "<=", searchTerm + "\uf8ff")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          uid: doc.id,
        } as User)
    );
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

export const getUserChats = async (userId: string) => {
  try {
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("participants", "array-contains", userId));
    const chatSnapshot = await getDocs(q);

    const chatsPromises = chatSnapshot.docs.map(async (chatDoc) => {
      const chatData = chatDoc.data();

      const otherUserId = chatData.participants.find(
        (id: string) => id !== userId
      );

      const userDoc = await getDoc(doc(db, "users", otherUserId));
      const userData = userDoc.data();

      return {
        id: chatDoc.id,
        lastMessage: chatData.lastMessage,
        participants: chatData.participants,
        user: {
          uid: userDoc.id,
          displayName: userData?.displayName,
          photoURL: userData?.photoURL,
          status: userData?.status,
        },
      };
    });

    const chats = await Promise.all(chatsPromises);

    return chats.sort((a, b) => {
      if (!a.lastMessage?.timestamp) return 1;
      if (!b.lastMessage?.timestamp) return -1;

      const timestampA = new Date(a.lastMessage.timestamp.seconds * 1000);
      const timestampB = new Date(b.lastMessage.timestamp.seconds * 1000);

      return timestampB.getTime() - timestampA.getTime();
    }) as Chat[];
  } catch (error) {
    console.error("Error fetching user chats:", error);
    throw error;
  }
};

export const fetchExistingChats = async (userId: string) => {
  try {
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("participants", "array-contains", userId));

    const snapshot = await getDocs(q);
    return snapshot.docs.reduce((acc: string[], doc) => {
      const chatData = doc.data();

      const otherParticipant = chatData.participants.find(
        (id: string) => id !== userId
      );
      if (otherParticipant) acc.push(otherParticipant);
      return acc;
    }, []);
  } catch (error) {
    console.error("Error fetching existing chats:", error);
    throw error;
  }
};

export const createChat = async (participants: string[]) => {
  try {
    const chatsRef = collection(db, "chats");
    const chatDoc = await addDoc(chatsRef, {
      participants,
      createdAt: serverTimestamp(),
      lastMessage: null,
    });

    await Promise.all(
      participants.map((userId) =>
        setDoc(doc(db, "userChats", `${userId}_${chatDoc.id}`), {
          userId,
          chatId: chatDoc.id,
          unreadCount: 0,
          lastReadTimestamp: serverTimestamp(),
          isBlocked: false,
        })
      )
    );

    console.log("chat created");

    return chatDoc.id;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

export const getChatMessages = (
  chatId: string,
  callback: (messages: Message[]) => void
) => {
  const messagesRef = collection(db, "messages");
  const q = query(
    messagesRef,
    where("chatId", "==", chatId),
    orderBy("timestamp", "asc")
  );

  return onSnapshot(q, async (snapshot) => {
    const messagesPromises = snapshot.docs.map(async (docSnapshot) => {
      const data = docSnapshot.data();
      const userDoc = await getDoc(doc(db, "users", data.senderId));
      const userData = userDoc.data();

      return {
        id: docSnapshot.id,
        ...data,
        senderName: userData?.displayName,
        senderPhotoURL: userData?.photoURL,
        timestamp: data.timestamp?.toDate(),
      } as Message;
    });

    const messages = await Promise.all(messagesPromises);
    callback(messages);
  });
};

export const sendMessage = async ({
  chatId,
  content,
  senderId,
  type,
}: SendMessageParams) => {
  try {
    await addDoc(collection(db, "messages"), {
      chatId,
      content,
      senderId,
      type,
      timestamp: serverTimestamp(),
    });

    await updateDoc(doc(db, "chats", chatId), {
      lastMessage: {
        content: type === "image" ? "Image" : content,
        senderId,
        timestamp: serverTimestamp(),
      },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const uploadImageMessage = async (
  file: File,
  chatId: string,
  senderId: string
) => {
  const imageUrl = await uploadImageToImgBB(file);

  await sendMessage({
    chatId,
    content: imageUrl,
    senderId,
    type: "image",
  });
};

export const getSharedPhotos = async (chatId: string) => {
  const q = query(
    collection(db, "messages"),
    where("chatId", "==", chatId),
    where("type", "==", "image"),
    orderBy("timestamp", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    const fileName =
      data.fileName ||
      `Image_${
        new Date(data.timestamp?.toDate()).toLocaleString().split(",")[0]
      }_${Date.now() % 10000}.jpg`;
    return {
      id: doc.id,
      imageUrl: data.content,
      fileName,
      timestamp: data.timestamp?.toDate(),
    };
  });
};

export const toggleBlockUser = async (
  currentUserId: string,
  chatId: string
) => {
  try {
    const userChatRef = doc(db, "userChats", `${currentUserId}_${chatId}`);
    const userChatDoc = await getDoc(userChatRef);
    const userData = userChatDoc.data() as UserChatData;

    const currentBlockedBy = userData.blockedBy || {};
    const isCurrentlyBlocked = currentBlockedBy[currentUserId] || false;

    await updateDoc(userChatRef, {
      [`blockedBy.${currentUserId}`]: !isCurrentlyBlocked,
      isBlocked: !isCurrentlyBlocked,
    });

    return !isCurrentlyBlocked;
  } catch (error) {
    console.error("Error toggling block status:", error);
    throw error;
  }
};

export const subscribeToBlockStatus = (
  chatId: string,
  currentUserId: string,
  otherUserId: string,
  onBlockStatusChange: (blockedByMe: boolean, blockedByOther: boolean) => void
) => {
  let currentBlockedByMe = false;
  let currentBlockedByOther = false;

  const unsubscribeMe = onSnapshot(
    doc(db, "userChats", `${currentUserId}_${chatId}`),
    (doc) => {
      const data = doc.data() as UserChatData;
      currentBlockedByMe = data?.blockedBy?.[currentUserId] || false;
      onBlockStatusChange(currentBlockedByMe, currentBlockedByOther);
    }
  );

  const unsubscribeOther = onSnapshot(
    doc(db, "userChats", `${otherUserId}_${chatId}`),
    (doc) => {
      const data = doc.data() as UserChatData;
      currentBlockedByOther = data?.blockedBy?.[otherUserId] || false;
      onBlockStatusChange(currentBlockedByMe, currentBlockedByOther);
    }
  );

  return () => {
    unsubscribeMe();
    unsubscribeOther();
  };
};

export const deleteChat = async (chatId: string, participants: string[]) => {
  const batch = writeBatch(db);

  try {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("chatId", "==", chatId));
    const messagesSnapshot = await getDocs(q);
    messagesSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    participants.forEach((userId) => {
      const userChatRef = doc(db, "userChats", `${userId}_${chatId}`);
      batch.delete(userChatRef);
    });

    const chatRef = doc(db, "chats", chatId);
    batch.delete(chatRef);

    await batch.commit();
    console.log("Chat deleted");
  } catch (error) {
    console.error("Error in batch delete:", error);
    throw error;
  }
};
