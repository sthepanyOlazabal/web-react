import React, { useContext } from "react";
import LogoWhite from "../assets/images/logo-white.png";
import { GlobalContext } from "../global/GlobalContext";

Home.propTypes = {};

function Home() {
  let { usuario, setUsuario } = useContext(GlobalContext);

  return (
    <div className="App">
      <div className="App-header">
        <div>
          <img src={LogoWhite} className="App-logo" alt="logo"></img>
          <p>{usuario?.correo || ""}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
