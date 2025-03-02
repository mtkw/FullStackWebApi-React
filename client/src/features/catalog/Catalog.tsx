import { useEffect, useState } from "react";
import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProduts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:7201/api/Products")
      .then((response) => response.json())
      .then((data) => setProduts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
