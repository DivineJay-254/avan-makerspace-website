import Header from '@/components/header';
import About from '@/components/about';
import Footer from '@/components/footer';

export default function AboutPage() {
  return (
    <div className="w-full">
      <Header />
      <main>
        <About />
      </main>
      <Footer />
    </div>
  );
}
