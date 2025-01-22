import Header from '@/components/landing/Header';
import Landing from '@/components/landing/Landing';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="landing-layout">
      <Header />
      <main className="landing-layout__main">
        <Landing />
      </main>
      <Footer />
    </div>
  );
}
