import { useEffect, useState, createContext } from 'react';
import AllProducts from './Components/AllProducts.js';
import "./App.css"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';



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
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="secondary"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Walmart.Galvanize
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
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

[/] Make an API call to get specific details on a given product when its entry is clicked 
    (Products data service - subsection ":productId")

[/] Display a list of products as cards with text of description

[/ sorta ] Make each product clickable so that when clicked, it displays an image from the API for 
    that product (Products data service - subsection "styles")

[] Make it so that only one product's photo is visible at a time, and clicking it again closes 
    the photo (NOTE: If a product does not have a viable photo on the API, allow for this eventuality with good conditional rendering).

*/