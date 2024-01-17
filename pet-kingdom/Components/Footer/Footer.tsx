// components/Footer.tsx
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className=" text-black bg-gradient-to-r via-southPeach via-70% to-transparent  from-coral bg-opacity-5 p-6 ">
      <div className="container mx-auto flex flex-col justify-between items-center">
        
        {/* Logo */}
        <div className="w-32">
         Logo
        </div>
        
        {/* Copyright */}
        <div className="text-sm">
          Copyright © 2023 Pet Kingdom, Inc.
        </div>
        
        {/* Links */}
        <div className="space-x-4">
          <a href="#" className="hover:text-southPeach text-black transition">Legal Stuff</a>
          <a href="#" className="hover:text-southPeach transition">Privacy Policy</a>
          <a href="#" className="hover:text-southPeach transition">Security</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
