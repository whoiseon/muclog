import Lottie from "react-lottie-player";

import lottieJson from 'public/image/lottie/animation.json';

export default function Animation() {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: '100%', height: '100%' }}
    />
  );
};
