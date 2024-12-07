import { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  displayName: string;
  photoURL: string;
  status: string;
  email: string;
  createdAt: Timestamp;
  lastActive: Timestamp;
  displayNameLowerCase: string;
}

export interface CurrentUser {
  uid: string;
  displayName: string;
  photoUrl: string;
}

export interface ChatUser {
  uid: string;
  displayName: string;
  photoURL: string;
  status?: string;
}

export interface Chat {
  id: string;
  lastMessage: {
    content: string;
    timestamp: Date;
  } | null;
  participants: string[];
  user: ChatUser;
}
