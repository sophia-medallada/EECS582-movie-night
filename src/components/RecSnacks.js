//Authors: Sophia, Eli, Damian, Matthew and Abraham
//Date: 4/10/2025
//Last Modified: 4/15/25
//Purpose: List of Recommend Snacks to users

import React from 'react';

const SnackList = () => {
  const links = [
    {id: 1, url: 'https://www.amazon.com/Orville-Redenbachers-Theater-Microwave-24-Count/dp/B00I9VCF0U?crid=3AO6MGSNC6JPE&dib=eyJ2IjoiMSJ9.fv2RupxUtEcxtfVtjncwTcaYlzteCPgrcVbBP7afqxxBAgBMcjKxSS4F48LUC4gjbSlI9vKPArP65lwrzt0jiSNNXXErO06_n4QfYgKIXtYB2t31twlC9Ka-lQMSJFigXlFke9IfynZyd6mOF9eZHqBTfgdOB8ZkC-2wL3HZaf2J0QGBz5Ag7swP_SXnOuYhHhUkUHQiRArmmOiZJnTufBA5DgxBjrPYiras5_ipA2y9XKCgYDsb-r19jcmlkkF8Y-JdjQy6oAOOTTKjukMrN4CFUHK0jAXHvMAC1NQNW5Q.gm-XBH2vPxyHuVlfbAtTOeowVpi97kkef2EYwCKuXcU&dib_tag=se&keywords=movie+popcorn&qid=1744673538&sprefix=movie+popcorn%2Caps%2C142&sr=8-5', text: 'Movie Popcorn'},
    {id: 2, url: 'https://www.amazon.com/MUNCHIE-MIX-SAMPLER-Assortment-Refrigerator/dp/B0D385N3B1?crid=SF49RHNYYIG6&dib=eyJ2IjoiMSJ9.O6LNDbN7oKvToG5vRnu_4rWO-f0mSQEzwEJr22KEowKM-p5RD9tED_NI8TN-gOJurZXV2mumFQ0vrDxx716zUWMLeMOx1JAJhzRDkmaGgwI7j26ZX1ZmRR2UpZClWcnyKAXLU2QW85yMpFipa6zGQ5uVqz5sf16IdCItsuU1-KibPJ9Li427wWg3S5V8T8J5sTZb4Hjh7XXbZs7HJ3QEY1Hq6m_0fhveepHPNOmtvKykTsFpAsAKQCfh7u4keXUuWrQyt6PENJawhdIeV4C28WTGIB7u2zEPrp601sYjBD0.FoiKuI1-GeCxqe7PrtJ_xB05p9wnfkBNyCH3xc444U4&dib_tag=se&keywords=soda+variety+bundle&qid=1744673693&sprefix=soda+varietybundle%2Caps%2C106&sr=8-6', text: 'Nachos'},
    {id: 3, url: 'https://www.amazon.com/Original-Watermelon-SWEDISH-Halloween-Variety/dp/B087Z6RY25?crid=2BVX1A913M0SG&dib=eyJ2IjoiMSJ9.WHzdgXr7HdcswWCSht40iBHL_v-ZVFEfh7f_GSY70TX66Q7_qOqCdLSMac3P1YRV4FDeKinfqel5hTJbsKH-Um-vZmbcLsVA4rYq2cHqjGthPQQz71dFgBwLWIp447BYmH9-0qkKzeoWP5JtIjDeYAVD7CokBvn6-4dA_ROAgJ57Fo9gjrxMVca9yragQ9gNsqtVEdKQXxxRqVZsYOB8HFK-RuYN9BtZfOqAP9BaXVeFjagBqVrz6U42psjM7sC72tWD_zigb8M4MfHpt_WJ6l_c6rI5PXS1KXnGCP4uMm4.Ha7WsexzeY5BE-RA7ZYT1nxet8pojXKo5cS00TSSmNc&dib_tag=se&keywords=movie+candy+variety+pack&qid=1744673603&sprefix=movie+candy+var%2Caps%2C134&sr=8-8', text: 'Variety Candies'},
    {id: 4, url: 'https://www.amazon.com/MUNCHIE-MIX-SAMPLER-Assortment-Refrigerator/dp/B0D385N3B1?crid=SF49RHNYYIG6&dib=eyJ2IjoiMSJ9.O6LNDbN7oKvToG5vRnu_4rWO-f0mSQEzwEJr22KEowKM-p5RD9tED_NI8TN-gOJurZXV2mumFQ0vrDxx716zUWMLeMOx1JAJhzRDkmaGgwI7j26ZX1ZmRR2UpZClWcnyKAXLU2QW85yMpFipa6zGQ5uVqz5sf16IdCItsuU1-KibPJ9Li427wWg3S5V8T8J5sTZb4Hjh7XXbZs7HJ3QEY1Hq6m_0fhveepHPNOmtvKykTsFpAsAKQCfh7u4keXUuWrQyt6PENJawhdIeV4C28WTGIB7u2zEPrp601sYjBD0.FoiKuI1-GeCxqe7PrtJ_xB05p9wnfkBNyCH3xc444U4&dib_tag=se&keywords=soda+variety+bundle&qid=1744673693&sprefix=soda+varietybundle%2Caps%2C106&sr=8-6', text: 'Soda'}
  ];

  return (
    <div className="links-container">
      <h2>Recommended Snacks</h2>
      <ul className="links-list">
        {links.map((link) => (
          <li key={link.id} className="link-item">
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="link"
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
  
export default SnackList;
  


