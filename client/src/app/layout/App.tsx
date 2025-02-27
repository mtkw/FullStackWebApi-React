import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import Catalog from "../../features/catalog/Catalog";

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
    <div>
      <h1>E-Commerce Shop</h1>
      <Catalog products={products} addProduct={addProduct} />
    </div>
  );
}

export default App;
