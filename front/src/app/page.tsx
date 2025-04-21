// import { cookieStorage, createStorage, http } from '@wagmi/core'
"use client";
import { ConnectButton } from "@/components/ConnectButton";
import { InfoList } from "@/components/InfoList";
import { ActionButtonList } from "@/components/ActionButtonList";
import Image from "next/image";
import ip from "../../ABI/ip.json";
import { readContract, writeContract } from "wagmi/actions";
import { config } from "../config";
import { useState } from "react";

const CONTRACT_ADDRESS = "0x63ba29cAF4c40DaDA8a61D10AB5D2728c806b61f";

interface PropiedadIntelectual {
  colaboradores: string[];
  estado: number;
  fechaRegistro: BigInt;
  hashContenido: string;
  nombrePropiedadIntelectual: string;
  propietario: string;
  tipoPI: number;
}

export default function Home() {
  const [propiedad, setPropiedad] = useState<PropiedadIntelectual | null>(null);
  const [ipID, setIpID] = useState<string | null>(null);
  const [colaboradores, setColaboradores] = useState<string[]>([]);
  const [nuevoColaborador, setNuevoColaborador] = useState<string>("");

  function crearIP() {

    const nombrePropiedadIntelectual = document.getElementById(
      "nameIpInput"
    ) as HTMLInputElement;
    const hashContenido = document.getElementById(
      "hashInput"
    ) as HTMLInputElement;
    const tipoPI = document.getElementById("tipoPIInput") as HTMLInputElement;

    writeContract(config, {
      abi: ip,
      address: CONTRACT_ADDRESS as `0x${string}`,
      functionName: "crearPropiedadIntelectual",
      args: [
        nombrePropiedadIntelectual.value,
        hashContenido.value,
        colaboradores,
        parseInt(tipoPI.value),
      ],
    })
      .then((data: any) => {
        console.log(data);
        setIpID(data.tokenId);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  function obtenerIp() {
    const ipID = document.getElementById("IpIDInput") as HTMLInputElement;
    readContract(config, {
      abi: ip,
      address: CONTRACT_ADDRESS as `0x${string}`,
      functionName: "getPropiedadIntelectual",
      args: [ipID.value],
    })
      .then((data: any) => {
        console.log(data);
        setPropiedad({
          colaboradores: data.colaboradores,
          estado: data.estado,
          fechaRegistro: data.fechaRegistro,
          hashContenido: data.hashContenido,
          nombrePropiedadIntelectual: data.nombrePropiedadIntelectual,
          propietario: data.propietario,
          tipoPI: data.tipoPI,
        });
        console.log(propiedad);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  // Función para formatear la fecha desde el timestamp
  const formatearFecha = (timestamp: BigInt): string => {
    // Convertimos BigNumber a número (en segundos)
    const timestampEnSegundos = Number(timestamp);

    // Creamos un objeto Date (JavaScript trabaja con milisegundos)
    const fecha = new Date(timestampEnSegundos * 1000);

    // Formateamos la fecha y hora
    return fecha.toLocaleString(); // Muestra fecha y hora según la configuración local
  };

  const agregarColaborador = () => {
    if (nuevoColaborador && nuevoColaborador.startsWith("0x")) {
      setColaboradores([...colaboradores, nuevoColaborador]);
      setNuevoColaborador(""); // Resetear el input
    } else {
      alert("Por favor ingrese una dirección válida que comience con 0x");
    }
  };

  const eliminarColaborador = (index: number) => {
    const nuevosColaboradores = [...colaboradores];
    nuevosColaboradores.splice(index, 1);
    setColaboradores(nuevosColaboradores);
  };

  return (
    <div className={"pages"}>
      <Image src="/reown.svg" alt="Reown" width={150} height={150} priority />
      <h1>AppKit Wagmi Next.js App Router Example</h1>

      <ConnectButton />
      <ActionButtonList />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>Crear propiedad intelectual</p>
        <input type="text" id="nameIpInput" placeholder="ej. Propiedad 1" />
        <input
          type="text"
          id="hashInput"
          placeholder="ej. 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
        />
        <p>Colaboradores</p>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={nuevoColaborador}
            onChange={(e) => setNuevoColaborador(e.target.value)}
            placeholder="Dirección del colaborador (0x...)"
          />
          <button onClick={agregarColaborador}>Añadir Colaborador</button>
        </div>
        

        {colaboradores.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <p>Colaboradores añadidos:</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {colaboradores.map((colaborador, index) => (
                <li key={index} style={{ marginBottom: "5px" }}>
                  {colaborador}{" "}
                  <button 
                    onClick={() => eliminarColaborador(index)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <select id="tipoPIInput">
          <option value="0">Patente</option>
          <option value="1">Licencia</option>
          <option value="2">Marca</option>
          <option value="3">Derechos de autor</option>
          <option value="4">Patente de diseño</option>
          <option value="5">Patente de investigación</option>
        </select>
        <button onClick={crearIP}>Crear</button>
      </div>
      <br />
      <p>Obtener información de una propiedad intelectual</p>
      <input type="text" id="IpIDInput" placeholder="ej. 1256" />
      <button onClick={obtenerIp}>Obtener</button>

      {propiedad && (
        <div>
          <h2>{propiedad.nombrePropiedadIntelectual}</h2>
          <p>Propietario: {propiedad.propietario}</p>
          <p>Hash: {propiedad.hashContenido}</p>
          <p>Estado: {propiedad.estado}</p>
          <p>Fecha: {formatearFecha(propiedad.fechaRegistro)}</p>
          <p>Fecha: {propiedad.fechaRegistro.toString()}</p>
          <h3>Colaboradores:</h3>
          <ul style={{ listStyle: "none" }}>
            {propiedad.colaboradores.map((colaborador, index) => (
              <li key={index}>{colaborador}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
