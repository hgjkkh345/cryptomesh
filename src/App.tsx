import "animate.css"
import "styles/global.scss"
import {Router} from "./service/router/Router";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <>
      <Router />
      <Toaster
        containerStyle={{zIndex: 99999}}
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;
