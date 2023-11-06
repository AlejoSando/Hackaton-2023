import { useEffect, useState } from "react";
import CardComponent from "./Card";

const Body = () => {
  const [listaDeViajes, setListaDeViajes] = useState([]);
  useEffect(() => {
    const fetchViajes = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/viajes/getallviajes"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los viajes");
        }
        const data = await response.json();
        setListaDeViajes(data); 
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchViajes();
  }, []);
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {listaDeViajes.map((viaje, index) => (
          <div
            key={index}
            className="w-full sm:w-1/4s md:w-1/4 lg:w-1/4 xl:w-1/4"
          >
            <CardComponent key={index} viaje={viaje}/>
          </div>
        ))}
      </div>
    </>
  );
};

export default Body;
