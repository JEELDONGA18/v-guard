import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import HowItWorks from '../components/landing/HowItWorks'
import DashboardPreview from '../components/landing/DashboardPreview'
import SecuritySection from '../components/landing/SecuritySection'
import TechStack from '../components/landing/TechStack'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'

export default function Landing() {
  return (
    <div className="landing-page bg-vg-bg min-h-screen overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <DashboardPreview />
      <SecuritySection />
      <TechStack />
      <CTASection />
      <Footer />
    </div>
  )
}
