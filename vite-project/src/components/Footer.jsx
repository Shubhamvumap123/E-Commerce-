import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500 mt-auto">
      <p>&copy; {new Date().getFullYear()} Zoffl. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
