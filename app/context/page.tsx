import Header from '@/components/header';
import Context from '@/components/context';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Context - Kakuma Refugee Camp | Avan Makerspace',
  description: 'Understand the Kakuma Refugee Camp context and why Avan Makerspace exists to empower displaced youth through opportunity.',
};

export default function ContextPage() {
  return (
    <div className="w-full">
      <Header />
      <main>
        <Context />
      </main>
      <Footer />
    </div>
  );
}
