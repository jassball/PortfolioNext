import Image from "next/image";
import Navbar from "@/components/ui/navbar";
import { Svg } from "../constants/svg";

export default function Home() {
  return (
    <div className="space-y-24">
      <Navbar />

      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-4">
          <h4 className="text-2xl">Hei og velkommen!</h4>
          <p className="text-lg">
            Jeg er en utvikler som er opptatt av å bruke IT-løsninger for å
            drive innovasjon og verdiskapning i bedrifter.
          </p>
          <p className="text-lg">
            Tar for tiden en MSc innen Business Analytics.
          </p>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-mono ">
            Det her er min useriøse, seriøse portefølje.
            <Image
              className="absolute -z-10 -ml-28 mb-4 -mt-20"
              src={Svg.middleRightFigure}
              alt="Logo"
              width={380}
              height={250}
            />
          </h1>
          <h1 className="text-5xl font-mono">
            Her kommer prosjekter som jeg finner interessante og relevante.
          </h1>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-mono ">
            Se roadmap for planen fremover og fremgang.
          </h1>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <Image
            className=" -z-10 -ml-10 mb-4  font-bold"
            src={Svg.bottomLeftFigure}
            alt="Logo"
            width={380}
            height={250}
          />
        </div>

        <Image
          className="-z-10 -ml-10 mb-4 -mt-10 font-bold"
          src={Svg.bottomRightFigure}
          alt="Logo"
          width={450}
          height={350}
        />
      </div>
    </div>
  );
}
