import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BuyScreen = () => {
  const { idviaje } = useParams();
  const [viaje, setViaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aux1, setAux1] = useState(0)
  const [aux2, setAux2] = useState(0)

  const navigate = useNavigate();


  const retornarPrecio = () => {
    if(parseInt(aux1) >= 0 && parseInt(aux2) >= 0){
      return viaje.costo * (parseInt(aux1) + parseInt(aux2))
    }else {
      return 0
    }
  }
  

  const fetchViajes = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/viajes/getallviajes"
      );
      if (!response.ok) {
        throw new Error("Error al obtener los viajes");
      }
      const data = await response.json();

      console.log(data[idviaje-1])
      setViaje(data[idviaje - 1]);
      setLoading(false); 
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const comprarViaje = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/carrito/comprar/1/agregar-viaje/${idviaje-1}`
      );
      
      const data = await response.json();
        alert('comprado con exito')
        navigate("/")
      setLoading(false); 
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchViajes();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
<Card className="w-full max-w-[48rem] flex-row rounded-md overflow-hidden">
        <CardHeader
          shadow={false}
          floated={false}
          className="w-2/5 shrink-0 border-r border-gray-300 pr-2"
          >
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            Informacion del viaje:
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
          Destino: {viaje.destino}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
          Origen: {viaje.origen}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Hora de salida: {viaje.horaSalida}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Hora de llegada: {viaje.horaLlegada}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Número de vuelo: {viaje.numeroVuelo}
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2">
          Precio por pasaje: {viaje.costo}$
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
          Precio total: {retornarPrecio()}$
          </Typography>
        </CardHeader>
        <CardBody>
        <Typography variant="h4" color="gray" className="mb-4 uppercase">
          Detalles de la compra:
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Cantidad de pasajeros mayores:
        </Typography>
        <Input size="md" value={aux1} onChange={(e) => setAux1(e.target.value)}/>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Cantidad de pasajeros menores:
        </Typography>
        <Input size="md"value={aux2} onChange={(e) => setAux2(e.target.value)}/>
        <Typography variant="h5" color="gray" className="mb-4 uppercase pt-2">
        Ingresá los datos de la tarjeta:
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-2">
        Número de tarjeta:
        </Typography>
        <Input size="md"/>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Titular de la tarjeta:
        </Typography>
        <Input size="md"/>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Codigo de seguridad:
        </Typography>
        <Input size="md"/>
        
        <a href="#" className="inline-block">
          <Button variant="text" className="flex items-center gap-2 pt-5" onClick={comprarViaje}>
            Comprar Ahora
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardBody>
    </Card>
    </div>
    );
  }

  export default BuyScreen