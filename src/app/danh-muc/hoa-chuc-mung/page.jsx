import TopicProducts from "@/components/topicProducts";

export default async function Home() {
  const res = await fetch(
    "http://localhost:5000/api/products/getTopicProducts/Hoa Chúc Mừng"
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
