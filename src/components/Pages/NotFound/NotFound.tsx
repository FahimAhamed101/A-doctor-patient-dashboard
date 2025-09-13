import notFoundImage from "/src/assets/notfound/not-found.png";
import Button from "../../UI/Button";
import Image from "next/image";
import Link from "next/link";
const NotFound = () => {
  return (
    <section className="w-full h-screen flex flex-col gap-2 justify-center items-center">
      <Image src={notFoundImage} alt="not found" width={500} height={500} />
      <Link href="/home">
        <Button className="text-white">Back To Home</Button>
      </Link>
    </section>
  );
};

export default NotFound;
