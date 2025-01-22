import Link from "next/link";
import React from "react";

const links = ["About", "Privacy Policy", "Licensing", "Contact"]

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2025 W. All Rights Reserved.</p>
      <div className="footer__links">
        {links.map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="footer__link"
            scroll={false}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;