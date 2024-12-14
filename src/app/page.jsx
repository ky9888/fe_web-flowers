import BirthdayFlowers from "@/components/mainPage/birthdayFlowers";
import PopularFlowers from "@/components/mainPage/popularFlowers";
import SlideMain from "@/components/mainPage/slideMain";
import Block from "@/components/mainPage/blog";

export default function Home() {
  return (
    <div >
      <SlideMain />
      <PopularFlowers/>
      <BirthdayFlowers/>
      <Block/>
    </div>
  );
}
