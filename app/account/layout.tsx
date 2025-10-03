import SideNav from "./components/sideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-container w-full pt-10 pb-28">
      <div className="flex items-start gap-5">
        <div className="w-[20%]">
          <SideNav />
        </div>
        <div className="w-[80%]">{children}</div>
      </div>
    </section>
  );
}
