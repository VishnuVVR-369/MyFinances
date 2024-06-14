import Header from "@/components/header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <Header />
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
