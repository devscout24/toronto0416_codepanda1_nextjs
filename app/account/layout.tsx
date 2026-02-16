import SideNav from "./components/sideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-container w-full pt-6 pb-16 lg:pt-10 lg:pb-28">
      <div className="flex items-start gap-5">
        <div className="sticky top-0 hidden lg:block lg:w-[20%]">
          <SideNav />
        </div>
        <div className="w-full lg:w-[80%]">{children}</div>
      </div>
    </section>
  );
}
