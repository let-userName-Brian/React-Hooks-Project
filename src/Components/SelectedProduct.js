
import { CardActionArea, CardMedia, IconButton, Skeleton, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { FetchAPIContext } from '../App';
import AddShoppingCartIcon from '@mui/material/Button'
import { CircularProgress, Backdrop } from '@mui/material'
import { borderRadius } from '@mui/system';
import { blueGrey } from '@mui/material/colors';


export default function SelectedProduct({ product }) {
    const [image, setImage] = useState()
    const [details, setDetails] = useState()
    const GrabAPI = useContext(FetchAPIContext)
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // image
        GrabAPI.fetchProductStyles(product.id).then(style => {
            setImage(style?.results[0]?.photos[0]?.thumbnail_url)
        })
        // details
        GrabAPI.fetchProductDetails(product.id).then(setDetails)
    }, [])

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
    <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '20vh' }}
        >
    <Grid item xs={3}></Grid>
        <Card sx={{ 
            maxWidth: 400,
            borderColor: 'black',
            borderRadius: 10,
            }}>
            <CardActionArea onClick={handleToggle}>
            <Skeleton
                sx={{ bgcolor: 'light grey' }}
                variant="rectangular"
                width={400}
                height={150}
            />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
                >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <CardMedia name={product.style} image={image} alt='pic' /> 
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
                    {/* <IconButton color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon />
                    //****not working properly  </IconButton> */}
                </CardContent>
            </CardActionArea>
        </Card>
    </Grid>
    );
}
//need to add clickables to display images