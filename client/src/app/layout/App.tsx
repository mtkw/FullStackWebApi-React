import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import Catalog from "../../features/catalog/Catalog";
import { Box, Button, Container, Typography } from "@mui/material";

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
      <Box display="flex" justifyContent="center" gap={3} marginY={3}>
        <Typography variant="h4">E-Commerce Shop</Typography>
        <Button variant="contained" onClick={addProduct}>
          Add Product
        </Button>
      </Box>

      <Catalog products={products} />
    </Container>
  );
}

export default App;
