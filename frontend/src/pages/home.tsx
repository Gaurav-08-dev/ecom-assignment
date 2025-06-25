import ProductCard from "@/components/productCard";
import { Link } from "react-router-dom";

const Home = () => {

  const addToCartHandler = (productId: string) => {
    console.log(`Add to cart clicked for product ID: ${productId}`);  
  }
  return (
    <div className="py-8 px-[5%] flex flex-col w-full h-[calc(100vh-4rem)]">
      <section className="w-full h-72 bg-[url(/assets/cover.jpg)] bg-no-repeat bg-center bg-cover"></section>

      <h1 className="text-2xl font-bold mt-12 mb-4 flex justify-between items-center">
        <span className="text-gray-500 font-extralight">Shop the latest trends</span>
        <Link to="/products" className="text-lg font-extralight transition-colors hover:text-gray-500">
          More
        </Link>
      </h1>
      <main className="">
        <ProductCard
          productId="1"
          name="Product 1"
          price={999}
          imageUrl="https://m.media-amazon.com/images/I/71CjP9jmqZL._SL1500_.jpg"
          stock={10}
          handler={() => addToCartHandler("1")}
        />
      </main>
    </div>
  );
};

export default Home;
