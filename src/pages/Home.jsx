import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import TheorySection from '../components/TheorySection.jsx';
import TestsSection from '../components/TestsSection.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <TheorySection />
        <TestsSection />
      </main>
      <Footer />
    </div>
  );
}
