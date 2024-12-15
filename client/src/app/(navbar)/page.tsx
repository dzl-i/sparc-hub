import SocietyClient from "./SocietyClient";

export default async function HomePage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/societies`, {
    cache: "no-store",
  });
  const data = await response.json();

  return <SocietyClient societies={data} />;
}
