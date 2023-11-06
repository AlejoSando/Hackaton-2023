import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
   
  const Login = () => {
    return (
   <Card className="flex justify-center items-center w-screen h-screen">
    
        <div className="shadow-xl  border-solid border-2 border-slate-800  rounded-md w-96 pt-4">
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
          <Input size="lg"/>
          <Typography
              as="a"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Contraseña
            </Typography>
          <Input size="lg" />
          <div className="-ml-2.5">
            <Checkbox label="Mantener la sesión" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth className="bg-slate-800">
            Iniciar Sesión
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            No tenes cuenta?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Crear cuenta.
            </Typography>
          </Typography>
        </CardFooter></div>
      </Card>
    );
  }

export default Login