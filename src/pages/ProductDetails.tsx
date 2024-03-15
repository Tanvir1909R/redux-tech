import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useSingleProductQuery } from '@/redux/api/apiSlice';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const {data:product} = useSingleProductQuery(id,{refetchOnMountOrArgChange:true,pollingInterval:30000})
  console.log(product);
  

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.data?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.data?.name}</h1>
          <p className="text-xl">Rating: {product?.data?.rating}</p>
          <ul className="space-y-1 text-lg">
            {product?.data?.features?.map((feature:string,idx:number) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
          <Button>Add to cart</Button>
        </div>
      </div>
      <ProductReview id={product?.data._id} />
    </>
  );
}
