import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Navbar from "./Navbar";
import Contact from "./Navbar/Contact";
import Paypal from "./Navbar/Paypal";
import Tools from "./Navbar/Tools";

import Tool from "./Tool";

const App = () => {
    const path = "https://micetf.fr";
    const tool = "Images séquentielles (Générateur)";

    return (
        <>
            <Navbar
                path={path}
                tool={tool}
                right={[
                    <a
                        className="navbar-brand"
                        href="https://micetf.fr/images-sequentielles"
                        title="Le jeu"
                    >
                        Images Séquentielles
                    </a>,
                    <Paypal />,
                    <Tools path={path} />,
                    <Contact tool={tool} />,
                ]}
            />
            <Tool />
        </>
    );
};

export default App;
