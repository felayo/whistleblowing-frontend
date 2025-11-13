import { Container } from "@mui/material";

import Navbar from "../components/Home/Navbar";
import NavMenu from "../components/Home/NavMenu";
import Hero from "../components/Home/HeroGuide";
import Buttons from "../components/Home/Buttons";

const Guide = () => {
  return (
    <Container maxWidth="md">
      <Navbar />
      <NavMenu />
      <Hero />
      <Buttons />
    </Container>
  );
};

export default Guide;
