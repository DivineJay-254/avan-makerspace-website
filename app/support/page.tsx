import Header from '@/components/header';
import Equipment from '@/components/equipment';
import Membership from '@/components/membership';
import Footer from '@/components/footer';

export default function SupportPage() {
  return (
    <div className="w-full">
      <Header />
      <main>
        <Equipment />
        <Membership />
      </main>
      <Footer />
    </div>
  );
}
