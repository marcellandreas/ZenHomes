import { FaMailBulk, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="max-padd-container flex items-start justify-between flex-col lg:flex-row gap-8 py-6 mb-7 bg-gradient-to-r from-primary via-white to-white">
        <div>
          <h4 className="h4">We are always here to help</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae.
          </p>
        </div>
        <div className="flexStart flex-wrap gap-8">
          <div className="flexCenter gap-x-6">
            <FaLocationDot />
            <div>
              <h5 className="h5">Location</h5>
              <p>123, Avenue, Cl</p>
            </div>
          </div>
          <div className="flexCenter gap-x-6">
            <FaPhone />
            <div>
              <h5 className="h5">Phone</h5>
              <p>+0123456789</p>
            </div>
          </div>
          <div className="flexCenter gap-x-6">
            <FaMailBulk />
            <div>
              <h5 className="h5">Email Support</h5>
              <p>info@zenhomes.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-padd-container flex items-start justify-between flex-wrap gap-12 mt-12">
        {/* logo - Left side */}
        <div className="flex flex-col max-w-sm gap-y-5">
          {/* logo */}
          <div>
            <Link to={"/"}>
              <img src={logo} alt="" className="h-16" />
            </Link>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            earum reprehenderit possimus!
          </p>
        </div>
        <div className="flexStart gap-7 xl:gap-x-36 flex-wrap">
          <ul>
            <h4 className="h4 mb-3">Customer Service</h4>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Help center
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Payment methods
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Contact
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Shipping status
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Complaints
              </a>
            </li>
          </ul>
          <ul>
            <h4 className="h4 mb-3">Legal</h4>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Privacy Policy
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Cookie settings
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Terms & conditions
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Cancelation
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Imprint
              </a>
            </li>
          </ul>
          <ul>
            <h4 className="h4 mb-3">Others</h4>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Our teams
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Sustainability
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Press
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Jobs
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Newsletter
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* copyrights */}
      <p className="max-padd-container medium-14 py-2 px-8 rounded flexBetween mt-6 bg-gradient-to-r from-primary via-white to-white">
        <span>2025 ZenHomes</span>
        <span>All rights reserved</span>
      </p>
    </footer>
  );
};

export default Footer;
