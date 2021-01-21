import React from "react";
import { Link } from "react-router-dom";
import { idbPromise, pluralize } from "../../utils/helpers";
import * as actions from '../../utils/actions';
import { useSelector, useDispatch } from 'react-redux'

function ProductItem(item) {
  // const addToCart = () => {
  //   dispatch({
  //     type: ADD_TO_CART,
  //     product: { ...item, purchaseQuantity: 2 },
  //   });
  // };
  const cart = useSelector(state => state);
  const dispatch = useDispatch();
  const { image, name, _id, price, quantity } = item;


  const addToCart = () => {
    // find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    // if there was a mtch, call UPDATE with a new purchase quantity
    if (itemInCart) {
      dispatch({
        type: actions.UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: actions.ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
