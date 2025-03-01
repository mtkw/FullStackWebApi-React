import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import Catalog from "../../features/catalog/Catalog";
import { Container } from "@mui/material";
import NavBar from "./NavBar";

function App() {
  const [products, setProduts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:7201/api/Products")
      .then((response) => response.json())
      .then((data) => setProduts(data));
  }, []);

  return (
    <>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 14 }}>
        <Catalog products={products} />
      </Container>
    </>
  );
}

export default App;
