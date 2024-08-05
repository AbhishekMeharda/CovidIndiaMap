import './cart.css';

const Cart = ({label, value}) => {
    return (
        <div className="cart">
            <span className="cart-text">{label}</span>
            <span className="cart-count">{value}</span>
        </div>
    )
}

export default Cart;