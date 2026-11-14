import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import { HomeHighlights } from '@/components/public/home-highlights';

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <main>
        <Hero />
        <HomeHighlights />
      </main>
      <Footer />
    </div>
  );
}
