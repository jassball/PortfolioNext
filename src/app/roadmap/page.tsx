import Image from "next/image";
import { img } from "@/constants/images";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1>Roadmap</h1>
      <p>Coming soon...</p>

      <Image src={img.ROAD} alt="Road" width={500} height={800} />
    </div>
  );
}
