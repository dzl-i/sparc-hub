import SocietyClient from "./SocietyClient";

export default async function HomePage() {
  const response = await fetch(`http://127.0.0.1:8080/societies`, {
    cache: "no-store",
  });
  const data = await response.json();

  return <SocietyClient societies={data} />;
}
