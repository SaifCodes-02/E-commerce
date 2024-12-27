import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#1e1d1d] text-white py-16 mt-10"> {/* Increased padding */}
      <div className="container mx-auto px-4">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Store Locator */}
          <div>
            <h3 className="font-bold uppercase mb-4 flex items-center">
              <span className="mr-2">📍</span>Our Stores
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-gray-400">
                  London
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Milan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  NewYork City
                </a>
              </li>
            </ul>
          </div>

          {/* Client Service */}
          <div>
            <h3 className="font-bold uppercase mb-4 flex items-center">
              <span className="mr-2">📱</span> Client Service
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Help / FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Orders & Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Returns & Refunds
                </a>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-bold uppercase mb-4 flex items-center">
              <span className="mr-2">👤</span> About Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Company Profile
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Investor Relations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold uppercase mb-4 flex items-center">
              <span className="mr-2">📄</span> Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Legal Notes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  General Conditions of Purchase
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            CopyRights © 2025-2026 All rights are Reserved---SaifCodes
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0"> {/* Increased space between icons */}
            {/* Social Icons */}
            <a href="#" className="text-gray-400 hover:text-white text-2xl"> {/* Increased icon size */}
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/SaifCodes-02" target='_blank' className="text-gray-400 hover:text-white text-2xl">
              <i className="fab fa-github"></i>
            </a>
            <a target='_blank' href="https://saifcodes.vercel.app/" className="text-gray-400 hover:text-white text-2xl">
              <i className="fa-solid fa-globe"></i>
            </a>
          </div>
        </div>

      </div>
      <div className='flex items-center justify-center text-4xl mt-16 lg:text-8xl lg:mt-24 md:text-6xl'>   <h1> E V E R S T Y L E S</h1> </div>
   
    </footer>
  );
}

export default Footer;
