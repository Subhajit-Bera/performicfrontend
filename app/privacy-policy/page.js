import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PolicySection = ({ title, children }) => (
    <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <div className="space-y-3 text-text-secondary leading-relaxed">{children}</div>
    </section>
);

export default function PrivacyPolicyPage() {
    return (
        <>
            <Header />
            <main className="pt-24 bg-background min-h-screen">
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-extrabold mb-8">Privacy Policy</h1>
                    
                    <p className="text-text-secondary mb-8">Last Updated: September 16, 2025</p>

                    <PolicySection title="1. Introduction">
                        <p>Welcome to Performic Consultancy Services ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. Please read this policy carefully.</p>
                    </PolicySection>

                    <PolicySection title="2. Information We Collect">
                        <p>We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.</p>
                        <p>The personal information we collect may include: Name, Email Address, Phone Number, Mailing Address, Educational Background, and Career Interests.</p>
                    </PolicySection>
                    
                    <PolicySection title="3. How We Use Your Information">
                        <p>We use the information we collect or receive to: facilitate account creation and logon process, send you marketing and promotional communications, provide and administer our services, request feedback, and protect our services.</p>
                    </PolicySection>

                    <PolicySection title="4. Data Security">
                        <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>
                    </PolicySection>
                    
                     <PolicySection title="5. Contact Us">
                        <p>If you have questions or comments about this policy, you may email us at <a href="mailto:performic45@gmail.com" className="text-accent hover:underline">performic45@gmail.com</a> or by post to our address listed on the Contact Us page.</p>
                    </PolicySection>

                </div>
            </main>
            <Footer />
        </>
    );
}