import Header from '@/components/header';
import GetInvolved from '@/components/get-involved';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Get Involved - Support Avan Makerspace | Avan Makerspace',
  description: 'Multiple ways to support Avan Makerspace: donate, volunteer, partner, mentor, or collaborate on research to empower youth in Kakuma Refugee Camp.',
};

export default function GetInvolvedPage() {
  return (
    <div className="w-full">
      <Header />
      <main>
        <GetInvolved />
      </main>
      <Footer />
    </div>
  );
}
