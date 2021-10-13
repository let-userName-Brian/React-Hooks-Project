
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { FetchAPIContext } from '../App';
import ProductPic from './ProductPic'


export default function SelectedProduct({ product, styles }) {
    const [image, setImage] = useState()
    const [details, setDetails] = useState()
    const GrabAPI = useContext(FetchAPIContext)

    useEffect(() => {
        // image
        GrabAPI.fetchProductStyles(product.id).then(style => {
            setImage(style?.results[0]?.photos[0]?.thumbnail_url)
        })
        // details
        GrabAPI.fetchProductDetails(product.id).then(setDetails)
    }, [])

    return (
        <Card sx={{ maxWidth: 400}}>
                <ProductPic name={product.name} image={image} /> 
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {product.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        ${product.default_price}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {product.description}
                    </Typography>
                </CardContent>
        </Card>
    );
}
//need to add clickable functions to display images