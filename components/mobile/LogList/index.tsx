import {DocumentData, Timestamp} from "@firebase/firestore";
import dayjs from "dayjs";
import Parser from "html-react-parser";

interface LogListProps {
  data: DocumentData[]
}

export default function LogList({ data }: LogListProps) {
  return (
    <div>
      {
        data.map((log) => {
          const date = dayjs(log.createdAt).format("YY-MM-DD");
          return (
            <div key={log.id}>
              <p dangerouslySetInnerHTML={{ __html: log.content }} />
              <span>{ date }</span>
            </div>
          )
        })
      }
    </div>
  )
}