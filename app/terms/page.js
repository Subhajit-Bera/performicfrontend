import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PolicySection = ({ title, children }) => (
    <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <div className="space-y-3 text-text-secondary leading-relaxed">{children}</div>
    </section>
);

export default function TermsAndConditionsPage() {
    return (
        <>
            <Header />
            <main className="pt-24 bg-background min-h-screen">
                 <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-extrabold mb-8">Terms & Conditions</h1>
                    
                    <p className="text-text-secondary mb-8">Last Updated: September 16, 2025</p>

                    <PolicySection title="1. Agreement to Terms">
                        <p>By accessing and using our website and services, you agree to be bound by these Terms and Conditions. If you do not agree with all of these terms, then you are expressly prohibited from using the site and you must discontinue use immediately.</p>
                    </PolicySection>

                    <PolicySection title="2. User Accounts">
                        <p>You may be required to register for an account to access certain features of our service. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p>
                    </PolicySection>
                    
                    <PolicySection title="3. Intellectual Property Rights">
                        <p>Unless otherwise indicated, the website is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the site (collectively, the &quot;Content&quot;) and the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>
                    </PolicySection>
                    
                    <PolicySection title="4. Prohibited Activities">
                        <p>You may not access or use the site for any purpose other than that for which we make the site available. The site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
                    </PolicySection>

                    <PolicySection title="5. Modifications and Interruptions">
                        <p>We reserve the right to change, modify, or remove the contents of the site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the service without notice at any time.</p>
                    </PolicySection>

                </div>
            </main>
            <Footer />
        </>
    );
}