import Header from '@/components/Header';
import Hero from '@/components/Hero';
import React from 'react';
type LayoutProps = {
  children:React.ReactNode
}
function Layout({children}:LayoutProps){
  return (
  <div className="flex flex-col min-h-screen">
    <Header />
    <Hero/>
    <div className="container mx-auto flex-1 py-5">{children}</div>
  </div>)

}
export default Layout;