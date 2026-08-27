import type { Product } from "../helpers/types"

type Props = {
    products : Product[],
    onMove : (p:Product) => void
}
export const ProductList:React.FC<Props> = ({products, onMove}) => {
    return (
        <div>
            <h2>Products</h2>
            <div>
                {
                    products.map(product => 
                        <div key = {product.id}>
                            <h2>{product.name}</h2>
                            <h2>{product.price}$</h2>
                            <img src = {product.picture} />
                            <button onClick={() => {onMove(product)}}>Buy</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}