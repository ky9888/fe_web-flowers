import TypeProducts from "@/components/topicProducts/typeProduts";

export default async function Home() {
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/api/products/getTypeProducts/Tặng Người Yêu`
  );
 

  if (!res.ok) {
    return <div>Please enter a valid product ID or product not found.</div>;
  }

  const ress = await res.json();
  const data = ress.data;
  console.log("Product DataAAAA:", data);

  return (
    <>
    
      <TypeProducts data={data} />
    </>
  );
}