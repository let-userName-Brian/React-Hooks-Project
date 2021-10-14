import { useEffect, useState, createContext } from 'react';
import AllProducts from './Components/AllProducts.js';
import "./App.css"


const url = "http://52.26.193.201:3000"

export const ProductClickContext = createContext()
export const FetchAPIContext = createContext()

function App() {

  const [products, setProducts] = useState([])

  const FetchAPI = {
    fetchProducts,
    fetchProductDetails,
    fetchProductStyles
  }

  useEffect(() => {
    async function fetchData() {
      let items = await fetchProducts()
      setProducts(items)
    }
    fetchData()
  }, [])



  async function fetchProducts() {
    let response = await fetch(`${url}/products/list`)
    let data = await response.json()
    return data
  }

  async function fetchProductStyles(productId) {
    let response = await fetch(`${url}/products/${productId}/styles`)
    let data = await response.json()
    return data
  }
  
  async function fetchProductDetails(productId) {
    let response = await fetch(`${url}/products/${productId}`)
    let data = await response.json()
    return data
  }

  if (Array.isArray(products) && products.length > 0) {
    return (
        <FetchAPIContext.Provider value={FetchAPI}>
          <div className="App">
            <AllProducts products={products} />
          </div>
        </FetchAPIContext.Provider>
    )
  } else { return <div>Im slow, hold on</div> }
}

export default App;


/*
[/] Make an API call to get a product list (Products data service, subsection "list")

[] Make an API call to get specific details on a given product when its entry is clicked 
    (Products data service - subsection ":productId")

[/] Display a list of products as cards with text of description

[] Make each product clickable so that when clicked, it displays an image from the API for 
    that product (Products data service - subsection "styles")

[] Make it so that only one product's photo is visible at a time, and clicking it again closes 
    the photo (NOTE: If a product does not have a viable photo on the API, allow for this eventuality with good conditional rendering).

*/