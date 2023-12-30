// Components
import { Header, Footer } from "components/layout";

// Styled Elements
import { HeaderStyles, MainStyles } from "assets/styles/layout";

export const MainLayout = ({ children }) => {
  return (
    <MainStyles.Container>
      {/* <Header /> */}
      <HeaderStyles.Container />
      <main>{children}</main>
      <Footer />
    </MainStyles.Container>
  );
};
