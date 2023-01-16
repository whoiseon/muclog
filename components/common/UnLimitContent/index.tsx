import {Dispatch, SetStateAction, useCallback} from "react";
import {Button} from "components/common/UnLimitContent/styles";

interface UnLimitContentProps {
  text: string,
  limit: number,
  setLimit: Dispatch<SetStateAction<number>>
}

export default function UnLimitContent({ text, limit, setLimit }: UnLimitContentProps) {
  const handleUnLimit = useCallback(() => {
    setLimit((prev) => prev + limit);
  }, [limit, setLimit]);

  return (
    <Button
      data-layout="unLimitContentMoreButton"
      onClick={handleUnLimit}
    >
      { text }
    </Button>
  );
};
