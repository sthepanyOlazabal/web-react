import React from "react";
import LogoWhite from "../assets/images/logo-white.png";

Home.propTypes = {};

function Home() {
  return (
    <div className="App">
      <div className="App-header">
        <div>
          <img src={LogoWhite} className="App-logo" alt="logo"></img>
        </div>
      </div>
    </div>
  );
}

export default Home;
