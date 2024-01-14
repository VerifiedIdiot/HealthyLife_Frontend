import Header from "./Header";

export const HeaderFooterLayout = ({ children }) => (
  <>
    <Header />
    {children}
    {/* <Footer /> */}
  </>
);

export const HeaderOnlyLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

// export const FooterOnlyLayout = ({ children }) => (
//   <>
//     {children}
//     <Footer />
//   </>
// );
