// import { cookieStorage, createStorage, http } from '@wagmi/core'
'use client';
import { ConnectButton } from "@/components/ConnectButton";
import { InfoList } from "@/components/InfoList";
import { ActionButtonList } from "@/components/ActionButtonList";
import Image from 'next/image';
import ip from '../../ABI/ip.json';
import { readContract } from "wagmi/actions";
import { config } from "../config";

const CONTRACT_ADDRESS = "0x725E60Adb60332D8C47d9FDA860ff34dD57ABA25";

export default function Home() {
  function getIpID() {
    const ipID = document.getElementById("IpIDInput") as HTMLInputElement;
    readContract(config, {
      abi: ip,
      address: CONTRACT_ADDRESS as `0x${string}`,
      functionName: "getPropiedadIntelectual",
      args: [ipID.value],
    }).then((data: any) => {
      console.log(data);
    });
  }

  return (
    <div className={"pages"}>
      <Image src="/reown.svg" alt="Reown" width={150} height={150} priority />
      <h1>AppKit Wagmi Next.js App Router Example</h1>

      <ConnectButton />
      <ActionButtonList />

      <p>Obtener porpiedades de propiedad intelectual</p>
      <input type="text" id="IpIDInput" placeholder="ej. 1256" /> 
      <button onClick={getIpID}>Obtener</button>
      <div className="advice">
        <p>
          This projectId only works on localhost. <br/>Go to <a href="https://cloud.reown.com" target="_blank" className="link-button" rel="Reown Cloud">Reown Cloud</a> to get your own.
        </p>
      </div>
      <InfoList />
    </div>
  );
}