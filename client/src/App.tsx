import { useEffect, useState } from "react"

function App() {
 
  const [products, setProduts] = useState<{name: string, price: number}[]>([]);

  useEffect(() => {
    fetch('https://localhost:7201/api/Products')
    .then(response => response.json())
    .then(data => setProduts(data))
  }, [])

  const addProduct = () => {
    setProduts(prevState => [...prevState, {name: 'product '+ (prevState.length + 1), price: (prevState.length * 100) + 100}])
  }

  return (
    <div>
      <h1>E-Commerce Shop</h1>
      <ul>
        {products.map((item,index)=>(
          <li key={index}>{item.name} - {item.price}</li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default App
