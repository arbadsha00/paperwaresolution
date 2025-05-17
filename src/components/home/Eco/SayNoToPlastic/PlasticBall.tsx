import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import { PlasticBall_3D } from "./PlasticBall_3d";
interface PlasticBallProps {
  PlasticBallId?: string;
}

export const PlasticBall = ({ PlasticBallId }: PlasticBallProps) => {
  return (
    <View
      id={PlasticBallId}
      className="size-[3rem] md:size-[6rem] bg-black rounded-full"
    >
      <PerspectiveCamera
        makeDefault
        fov={75}
        aspect={1} 
        near={0.1}
        far={1000}
        position={[0, 0, 5]}
      />
      <Environment files="/courtyard_1k.hdr" />
      <PlasticBall_3D />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.005}
      />
    </View>
  );
};
