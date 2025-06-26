import { Product } from "@/product";
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { formatPrice } from "utils/currencyFormatter";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/perfumes/${product.id}`} className="block group">
      {" "}
      {/* Added 'group' class */}
      <div
        className="relative bg-white rounded-xl shadow-lg overflow-hidden
                      transform transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl"
      >
        {/* Product Image */}
        <div className="relative w-full h-72">
          {" "}
          {/* Fixed height for consistent card sizing */}
          <Image
            src={product.imageUrl} // Use imageUrl as defined in products data
            alt={product.name}
            fill // Fills the parent container
            objectFit="fill"
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw" // Responsive image sizes for optimization
          />
          {/* View Details Icon - Hidden by default, appears on hover */}
          <div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto"
          >
            <FaEye className="text-white text-5xl opacity-80" />
          </div>
        </div>

        {/* Product Details */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-ug-text-heading mb-2 truncate">
            {product.name}
          </h3>
          <p className="text-ug-text-dark text-sm mb-3 truncate">
            {product.brand}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-ug-purple-primary">
              UGX {formatPrice(product.price, "UGX", 0)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
