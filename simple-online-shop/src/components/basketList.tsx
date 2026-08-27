import type { Basket} from "../helpers/types"

type Props = {
    items : Basket[],
    deleteElement : (p:number) => void;
    productUp : (p:number) => void;
    productDown : (p:number) => void;
    onCheckout : () => void;
}
export const BasketList:React.FC<Props> = ({items, deleteElement, productUp, productDown, onCheckout}) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Shopping bag </h2>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map(item => 
                             <tr key = {item.id}>
                                <td>{item.name}</td>
                                <td>{item.price}$</td>
                                <td>{item.quantity}</td>
                                <td>{item.price * item.quantity}$</td>
                                <td> 
                                    <button onClick={() => {deleteElement(item.id)}}>X</button>
                                    <button onClick={() => {productUp(item.id)}}>+</button>
                                    <button onClick={() => {productDown(item.id)}}>-</button>
                                </td>
                             </tr>
                        )
                    }
                </tbody>
            </table>
            <div className="basket-summary">
                <span>Total</span>
                <strong>${total.toLocaleString()}</strong>
                <button type="button" onClick={onCheckout} disabled={items.length === 0}>Checkout</button>
            </div>
        </div>
    )
}