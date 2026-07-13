import Header from '@/components/header';
import Approach from '@/components/approach';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Our Approach - How We Work | Avan Makerspace',
  description: 'Learn about Avan Makerspace\'s approach to youth empowerment through peer mentorship, showcasing, collaboration, and resource-conscious program design.',
};

export default function ApproachPage() {
  return (
    <div className="w-full">
      <Header />
      <main>
        <Approach />
      </main>
      <Footer />
    </div>
  );
}
