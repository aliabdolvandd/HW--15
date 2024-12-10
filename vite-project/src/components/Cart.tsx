interface CartProps {
  cart: { [id: number]: number };
  products: { id: number; name: string; price: number }[];
  addToCart: (id: number) => void;
  decreaseItem: (id: number) => void;
  removeFromCart: (id: number) => void;
}
const Cart: React.FC<CartProps> = ({
  cart,
  products,
  addToCart,
  decreaseItem,
  removeFromCart,
}) => {
  const calculateTotal = () => {
    return Object.entries(cart).reduce((total, [id, quantity]) => {
      const product = products.find((p) => p.id === parseInt(id));
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  return (
    <div className="mt-8 border-t pt-4 rtl">
      <h2 className="text-xl font-bold mb-4 text-right">سبد خرید</h2>
      {Object.keys(cart).length === 0 ? (
        <p className="text-gray-500 text-right">سبد خرید خالی است</p>
      ) : (
        <div>
          <div className="flex flex-col space-y-4">
            {Object.entries(cart).map(([id, quantity]) => {
              const product = products.find((p) => p.id === parseInt(id));
              return (
                <div
                  key={id}
                  className="flex items-center justify-between border-b pb-2 flex-row-reverse"
                >
                  <div className="text-right w-1/3">
                    <p className="font-semibold">{product?.name}</p>
                  </div>

                  <div className="flex items-center justify-center w-1/3">
                    <button
                      onClick={() => addToCart(parseInt(id))}
                      className="bg-orange-500 text-white px-2 py-1 rounded"
                    >
                      +
                    </button>
                    <span className="mx-4 text-lg font-bold">{quantity}</span>
                    <button
                      onClick={() => decreaseItem(parseInt(id))}
                      className="bg-orange-500 text-white px-2 py-1 rounded"
                    >
                      -
                    </button>
                  </div>

                  <div className="text-right w-1/3">
                    <p className="font-semibold">
                      {product?.price * quantity} تومان
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-right font-bold">
            <p className="text-lg">
              جمع کل: {calculateTotal().toLocaleString()} تومان
            </p>
            {/* <button 
            onClick={() => setIsOrderOpen}
            className="mt-4 w-full bg-orange-500 text-white py-2 rounded">
                
              ثبت سفارش
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
