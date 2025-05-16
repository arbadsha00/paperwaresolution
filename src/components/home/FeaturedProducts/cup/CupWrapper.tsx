import Cup_1 from "./Cup_1";
import Cup_2 from "./Cup_2";
import Cup_3 from "./Cup_3";

interface Props {
  keyIndex: number;
}

const cups = [Cup_1, Cup_2, Cup_3];

export default function CupWrapper({ keyIndex }: Props) {
  const CupComponent = cups[keyIndex % cups.length];
  return <CupComponent />;
}
