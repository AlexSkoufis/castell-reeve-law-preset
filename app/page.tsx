import SmoothScroll from '@/components/SmoothScroll';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Statement from '@/components/Statement';
import Practice from '@/components/Practice';
import Record from '@/components/Record';
import People from '@/components/People';
import Consult from '@/components/Consult';
import Insights from '@/components/Insights';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <SmoothScroll />
      <Nav />
      <main id="main">
        <Hero />
        <Statement />
        <Practice />
        <Record />
        <People />
        <Consult />
        <Insights />
      </main>
      <Footer />
    </>
  );
}
