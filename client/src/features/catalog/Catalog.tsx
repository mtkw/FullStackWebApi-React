import { useFetchProductsQuery } from "./catalogApi";
import ProductList from "./ProductList";

export default function Catalog() {
  const { data, isLoading } = useFetchProductsQuery();

  if (isLoading || !data) return <h1>Loading...</h1>;

  return (
    <>
      <ProductList products={data} />
    </>
  );
}
