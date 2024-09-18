import type { MetaFunction } from "@remix-run/node";
import { DevicesHeader } from "~/components/DevicesHeader";
import { Header } from "~/components/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "NinjaOne Test" },
    { name: "description", content: "NinjaOne React Dev Showcase" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <section className="px-6 py-6">
        <DevicesHeader />
      </section>
    </div>
  );
}
