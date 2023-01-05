import {Timestamp} from "@firebase/firestore";

export interface LogsType {
  content: string,
  createdAt: Timestamp,
  creatorId: string,
  creatorName: string
}

export interface UserInfoType {
  displayName: string,
  email: string,
  photoURL: string,
  type: string,
  uid: string,
}