import Header from "@/components/layout/header";
import GridDotBackground from "@/components/widgets/GridDotBackground";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default layout;
