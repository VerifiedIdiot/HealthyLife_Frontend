import Header from "./Header";
import DynamicHeader from "./DynamicHeader";

export const HeaderFooter = ({ children }) => (
  <>
    <Header />
    {children}
    {/* <Footer /> */}
  </>
);

export const HeaderOnly = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

// export const FooterOnly = ({ children }) => (
//   <>
//     {children}
//     <Footer />
//   </>
// );


export const DynamicHeaderFooter = ({ children }) => (
  <>
    <DynamicHeader />
    {children}
    {/* <Footer /> */}
  </>
);

export const DynamicHeaderOnly = ({ children }) => (
  <>
    <DynamicHeader />
    {children}
    
  </>
);

