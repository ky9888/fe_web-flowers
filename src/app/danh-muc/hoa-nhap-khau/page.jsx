import TopicProducts from "@/components/topicProducts";

export default async function Home() {
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/api/products/getTopicProducts/Hoa Nhập khẩu`
  );
 

  if (!res.ok) {
    return <div>Please enter a valid product ID or product not found.</div>;
  }

  const ress = await res.json();
  const data = ress.data;


  return (
    <>
      <TopicProducts data={data} />
    </>
  );
}