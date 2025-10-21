import { Container } from "@mui/material";

import Navbar from "../components/Global/Navbar";
import NavMenu from "../components/Home/NavMenu";
import Hero from "../components/Home/HeroHome";
import Buttons from "../components/Home/Buttons";

const Home = () => {
  return (
    <Container maxWidth="md">
      <Navbar />
      <NavMenu />
      {/* Other Home page content can go here */}
      <Hero />
      <Buttons />
    </Container>
  );
};

export default Home;
