import {Background} from "components/common/Loading/styles";
import Lottie from "react-lottie-player";
import lottieJson from "public/image/lottie/loading.json";
import {useCallback} from "react";

interface LoadingProps {
  isMobile: boolean
}

export default function Loading({ isMobile }: LoadingProps) {
  const loadingStyle = useCallback((isMobile: boolean) => {
    if (isMobile) {
      return {
        width: '36%',
        height: '36%'
      }
    } else {
      return {
        width: '18%',
        height: '18%'
      }
    }
  }, []);

  return (
    <Background>
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={loadingStyle(isMobile)}
      />
    </Background>
  );
};
