
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
    <div className="flex flex-col h-full">
      <Header params={params} />
      <div className="flex flex-1">
        <Sidebar params={params} />
        {children}
      </div>
    </div>
  );
}
