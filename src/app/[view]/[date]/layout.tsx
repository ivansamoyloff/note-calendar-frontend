
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";

export default async function CalendarLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { view: string; date: string };
}>) {
  return (
    <div className="flex h-full">
      <Sidebar params={params} />
      <div className="flex flex-col flex-1">
        <Header params={params} />
        {children}
      </div>
    </div>
  );
}
