import * as React from 'react';
import Modal from '@mui/material/Modal';

export default function ProductPic(product) {
    const [open, setOpen] = React.useState(false);


    return (
        <div>
            <Modal open={open} prop={product}/>
        </div>
    );
}
