import React from 'react';
import { Link } from 'react-router';

const TermsService = () => {
    return (
        <div className='min-h-screen text-center'>
            <div className='p-10'>
                <h2 className="text-3xl mt-10">Terms and Services</h2>
                By accessing and using this website, you agree to comply with our Terms of Service. You accept responsibility for your actions while using the site and agree not to misuse the services provided. We reserve the right to modify or discontinue any part of the website at any time without prior notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offence.

                <h2 className="text-3xl mt-10">Privacy Policy</h2>

                We respect your privacy and are committed to protecting your personal information. Any data collected is used solely to improve our services and provide you with a better experience. We do not share your information with third parties without your consent, except as required by law.

                <h2 className="text-3xl mt-10">Refund Policy</h2>

                Refunds are provided only in specific cases as outlined in our refund policy. Please contact us directly for any refund requests. We strive to resolve any issues promptly and fairly.

                <Link to='/'><button className='btn btn-primary mt-10'>Back To Home</button></Link>
            </div>
        </div>
    );
};

export default TermsService;