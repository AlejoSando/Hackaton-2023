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
import { useEffect, useState } from "react";
import { Link, json, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [dataLogin, setDataLogin] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = { email: email, password: password };

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.ponce.token) {
        setDataLogin(responseData);
        await localStorage.setItem("userSession", JSON.stringify(responseData))
        navigate("/");
      }
      return responseData;
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      throw error;
    }
  };

  return (
    <Card className="flex justify-center items-center w-screen h-screen">
      <div className="shadow-xl  border-solid border-2 border-slate-800  rounded-md w-1/3 pt-4">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28  place-items-center bg-slate-800 rounded-md"
        >
          <Typography variant="h3" color="white">
            Iniciar Sesión
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
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            No tenes cuenta?
            <span className="ml-1 font-bold">
              <Link to={"/registro"}>Crear cuenta.</Link>
            </span>
          </Typography>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Login;
