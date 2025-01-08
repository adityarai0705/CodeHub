import "./Welcome.css";
import CodeHubLarge from "../Assets/Logos/CodeHubLarge.png";
import CCLogo from "../Assets/Logos/cclogo.png";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Welcome() {
  const introContainer = useRef();

  useGSAP(
    () => {
      gsap.from("#introTitle", {
        y: 200,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
      });
      gsap.to("#introTitle", {
        y: 25,
        duration: 4,
        ease: "power1.inOut",
        delay: 2,
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: introContainer }
  );

  return (
    <div id="welcomeMain" ref={introContainer}>
      <div id="welcomeBoxMain">
        <div id="welcomePhotoGreetMain">
          <img src={CCLogo} alt="CCLogo" />
          <p>presents</p>
          <img src={CodeHubLarge} alt="Code Hub" id="introTitle" />
        </div>
      </div>
    </div>
  );
}
