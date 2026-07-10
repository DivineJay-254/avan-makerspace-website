import Header from '@/components/header';
import Stats from '@/components/stats';
import Footer from '@/components/footer';

export default function ImpactPage() {
  return (
    <div className="w-full">
      <Header />
      <main>
        <Stats />
      </main>
      <Footer />
    </div>
  );
}
