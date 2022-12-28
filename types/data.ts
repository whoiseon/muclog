import {Timestamp} from "@firebase/firestore";

export interface LogsType {
  content: string,
  createdAt: Timestamp,
  creatorId: string,
  creatorName: string
}