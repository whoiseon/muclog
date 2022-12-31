import {SkeletonContent, SkeletonDate, SkeletonNickname, SkeletonProfile} from "components/common/Skeleton/styles";
import Animation from "components/common/Skeleton/Animation";

interface SkeletonProps {
  type: string,
}

export default function Skeleton({ type }: SkeletonProps) {
  const handleSkeletonType = (type: string) => {
    switch (type) {
      case "image":
        return (
          <SkeletonProfile>
            <Animation />
          </SkeletonProfile>
        )
      case "nickname":
        return (
          <SkeletonNickname>
            <Animation />
          </SkeletonNickname>
        )
      case "date":
        return (
          <SkeletonDate>
            <Animation />
          </SkeletonDate>
        )
      case "content":
        return (
          <SkeletonContent>
            <Animation />
          </SkeletonContent>
        )
      default:
        return (
          <SkeletonNickname>
            <Animation />
          </SkeletonNickname>
        )
    }
  }

  return handleSkeletonType(type);
};
