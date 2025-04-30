import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";


type props = {
    children : ReactNode,
}
export default function Layout({ children }: props ) {
  return (
    <>
      <div className="bg-gradient-to-br from-background to-muted">
        
        <Header/>
        <main className="h-fit  container mx-auto px-4 py-8" >
            {children}
        </main>
        
      </div>
              <Footer/>
    </>
  );
}
