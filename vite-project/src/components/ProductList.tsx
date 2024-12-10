export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductListProps {
  products: Product[];
  addToCart: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 object-cover mb-4"
          />
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <p className="text-orange-400 font-semibold mb-4">
            {product.price.toLocaleString()}
          </p>
          <button
            onClick={() => addToCart(product.id)}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            افزودن به سبد خرید
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
