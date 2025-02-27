import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import Catalog from "../../features/catalog/Catalog";
import { Container, Typography } from "@mui/material";

function App() {
  const [products, setProduts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:7201/api/Products")
      .then((response) => response.json())
      .then((data) => setProduts(data));
  }, []);

  const addProduct = () => {
    setProduts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: "product " + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        quantityInStock: 100,
        description: "test",
        pictureUrl: "http://picsum.photo/200",
        brand: "Nike",
        type: "Shoose",
      },
    ]);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">E-Commerce Shop</Typography>
      <Catalog products={products} addProduct={addProduct} />
    </Container>
  );
}

export default App;
