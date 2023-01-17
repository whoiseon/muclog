import {Background} from "components/common/Loading/styles";
import Lottie from "react-lottie-player";
import lottieJson from "public/image/lottie/loading.json";

interface LoadingProps {
  isMobile?: boolean
}

export default function Loading({ isMobile }: LoadingProps) {
  return (
    <Background>
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{
          width: '36%',
          height: '36%'
        }}
      />
    </Background>
  );
};
