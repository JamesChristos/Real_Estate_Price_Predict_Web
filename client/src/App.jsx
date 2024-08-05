import React from 'react';
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Residences from "./components/Residences/Residences";
import Value from "./components/Value/Value";
import Contact from "./components/Contact/Contact";
import GetStart from "./components/GetStart/GetStart";
import Footer from "./components/Footer/Footer";
import { ChakraProvider } from '@chakra-ui/react';
import "./App.css";
import Feature from './components/Feature/Feature';

function App() {
  return (
     <ChakraProvider>
    <div className="App">
      <div>
        <Header />
        <Hero />
      </div>
      <Feature />
      <div id="residences">
        <Residences />
      </div>
      <div id="values">
        <Value />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <div id="get-start">
        <GetStart />
      </div>
      <Footer />
    </div>
     </ChakraProvider>
  );
}

export default App;
