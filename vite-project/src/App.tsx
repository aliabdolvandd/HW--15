import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import OrderForm from "./components/OrderForm";
import products from "./data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cart, setCart] = useState<{ [id: number]: number }>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  const [isOrderOpen, setIsOrderOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    toast.success("محصول به سبد خرید اضافه شد!", { position: "bottom-left" });
  };

  const decreaseItem = (id: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) updated[id]--;
      else delete updated[id];
      return updated;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const submitOrder = (userInfo: {
    name: string;
    phone: string;
    address: string;
    cart: string;
    order: string;
  }) => {
    // const cart = JSON.stringify(Cart);
    localStorage.setItem("order", JSON.stringify(userInfo));
    localStorage.removeItem("cart");
    setCart({});
    setIsOrderOpen(false);
    toast.success("سفارش شما ثبت شد .تحویل سفارش تا 30 دقیقه دیگر", {
      position: "bottom-left",
    });
  };

  return (
    <div className="p-4 rtl">
      <div className="w-full bg-orange-500 h-16 flex items-center justify-between flex-row-reverse space-x-4">
        <h1 className="text-2xl text-white font-bold mb-4 text-right">
          فست فود انلاین
        </h1>
        <h2 className="text-xl text-white">بهترین غذا ها در سریغ ترین زمان</h2>
      </div>
      <ProductList products={products} addToCart={addToCart} />
      <Cart
        cart={cart}
        products={products}
        addToCart={addToCart}
        decreaseItem={decreaseItem}
        removeFromCart={removeFromCart}
      />
      {isOrderOpen && (
        <OrderForm
          onSubmit={submitOrder}
          onCancel={() => setIsOrderOpen(false)}
        />
      )}
      <div>
        <button
          onClick={() => setIsOrderOpen(true)}
          className="mt-4 w-full bg-orange-500 text-white py-2 rounded"
        >
          ثبت سفارش
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
