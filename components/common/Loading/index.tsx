import {Background} from "components/common/Loading/styles";
import Lottie from "react-lottie-player";
import lottieJson from "public/image/lottie/loading.json";

export default function Loading() {
  return (
    <Background>
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: '24%', height: '24%' }}
      />
    </Background>
  );
};
