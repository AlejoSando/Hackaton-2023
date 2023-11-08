import { useEffect, useState } from 'react'
import Body from './components/Body'
import Footer from './components/Footer'
import NavigationBar from './components/NavigationBar'

function App() {
  const [userState, setUserState] = useState(null);  
  
  const verificarUser = async () => {
    try {
      const items = await JSON.parse(localStorage.getItem("userSession"));
      if (items) {
        setUserState(items);
      }
    } catch (error) {
      console.error("Error al verificar usuario:", error.message);
    }
  };
  
  useEffect(() => {
    const verificarFetch = async () => {
      await verificarUser();
    };  
    verificarFetch();
  }, []);

  return (
    <>
     <NavigationBar userSession={userState}/>
     <Body />
     <Footer/>
    </>
  )
}

export default App;
