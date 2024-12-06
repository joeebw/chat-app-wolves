import { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  displayName: string;
  photoURL: string;
  status: string;
  email: string;
  createdAt: Timestamp;
  lastActive: Timestamp;
}

export interface CurrentUser {
  uid: string;
  displayName: string;
  photoUrl: string;
}
