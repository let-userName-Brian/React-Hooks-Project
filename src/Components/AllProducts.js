import SelectedProduct from "./SelectedProduct";

export default function AllProducts({ products }) {
    return (
        <div>
            {products.map(product => <SelectedProduct key={product.id} product={product} />)}
        </div>
    )
}
