import logo from '../../assets/logo.png'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 px-6 md:px-20 font-sans shadow-accent">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Contact Info */}
                <div className="md:text-left">
                    <div className='flex gap-2 items-center border-b border-dashed p-2'>
                        <img className='w-12 h-12 rounded-full' src={logo} alt="" />
                        <p className="text-2xl font-semibold">FOOD EXPIRY TRACKER</p>
                    </div>
                    <p className='w-76 text-xs italic mt-3'>Food Expiry Tracker is a smart tool to keep your kitchen organized. Add your groceries, set expiry dates, and get timely reminders before food goes bad. Stay healthy, save money, and reduce food waste effortlessly.</p>
                </div>

                {/* Terms */}
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2 text-white">Terms</h3>
                    <ul className="space-y-1">
                        <li><a href="/terms" className="hover:text-blue-400 transition">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Social Links */}
                <div className="text-center md:text-right">
                    <h3 className="text-lg font-semibold mb-2 text-white">Follow Us</h3>
                    <div className="flex justify-center md:justify-end space-x-4 text-xl text-gray-400">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
                            <FaFacebook />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
                &copy; {new Date().getFullYear()} Garden Resource. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
