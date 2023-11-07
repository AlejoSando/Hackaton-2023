import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registrar } from '../functions/registro.js'

const Registro = () => {
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [fec_nac, setFec_nac] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleRegis = async () => {
    const data = { email: email, contrasenia: password, surname: surname, name: name, fec_nac: fec_nac   };
    const response = await registrar(data);
    return response;
  };

  return (
    <Card className="flex justify-center items-center w-screen h-screen">
      <div className="shadow-xl  border-solid border-2 border-slate-800  rounded-md w-96 pt-4">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28  place-items-center bg-slate-800 rounded-md"
        >
          <Typography variant="h2" color="white">
            Registrate
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Email
          </Typography>
          <Input
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Nombre
          </Typography>
          <Input
            size="lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Apellido
          </Typography>

          <Input
            size="lg"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Contraseña
          </Typography>
          <Input
            size="lg"
            type="date"
            value={fec_nac}
            onChange={(e) => setFec_nac(e.target.value)}
          />
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Contraseña
          </Typography>
          <Input
            size="lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="-ml-2.5">
            <Checkbox
              label="Mantener la sesión"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            fullWidth
            className="bg-slate-800"
            onClick={handleRegis}
          >
            Iniciar Sesión
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Tenés una cuenta?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              <Link to={"/login"}>Inicia sesión.</Link>
            </Typography>
          </Typography>
        </CardFooter>
      </div>
    </Card>
  );
};
export default Registro;
