import Header from "@/components/layout/header";
import { GridBackground } from "@/components/widgets/GridDotBackground";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GridBackground>
      <Header />
      <main>{children}</main>
    </GridBackground>
  );
};

export default layout;
