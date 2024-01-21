import Header from "./Header";
import DynamicHeader from "./DynamicHeader";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export const HeaderFooter = () => (
  <>
    <Header />
    <Outlet/>
    <Footer />
  </>
);

export const HeaderOnly = () => (
  <>
    <Header />
    <Outlet/>
  </>
);

// export const FooterOnly = ({ children }) => (
//   <>
//     {children}
//     <Footer />
//   </>
// );


export const DynamicHeaderFooter = () => (
  <>
    <DynamicHeader/>
    
    <Outlet/>
    
    <Footer />
  </>
);

export const DynamicHeaderOnly = () => (
  <>
    <DynamicHeader/>
    <Outlet/>
    
  </>
);

