import Header from '@/components/header';
import Hero from '@/components/hero';
import Stats from '@/components/stats';
import About from '@/components/about';
import Equipment from '@/components/equipment';
import Membership from '@/components/membership';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Equipment />
        <Membership />
      </main>
      <Footer />
    </div>
  );
}
