


import React from 'react';
import styles from './TopSubNav.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface TopNavProps {
  siteLinks?: SiteLink[];
}

interface SiteLink {
    link:string;
    label:string;
}

const sampleSiteLinks = [
    {label:'FAQ',
        link:"/frequently-asked-questions"},
    {label:'Pet Insurance',
        link:"/vet-subscription"},
    {label:'Adoption Subscription',
        link:"/vet-subscription"},
]

const TopSubNav: React.FC<TopNavProps> = ({ siteLinks=sampleSiteLinks }) => {
  return (
    <div className={styles.topNav}>
      <div className={styles.logoContainer}>
        <Image src={'/trustpilot-logo.png'} width={100} height={100} alt="Trustpilot" className={styles.trustpilotLogo} />
      </div>
      <div className={styles.siteLinks}>
        {siteLinks.map((link, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className={styles.pipe}>|</span>}
            <Link  href={link.link} className={styles.link}>{link.label}</Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TopSubNav;
