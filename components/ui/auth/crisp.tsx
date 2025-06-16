'use client';

import { useEffect } from 'react';

const CrispChat = () => {
	useEffect(() => {
		// Initialize Crisp
		window.$crisp = [];
		window.CRISP_WEBSITE_ID = '05caebaf-e6b0-41b4-97e8-ed0b3adc712b';

		// Inject CSS to reposition and style Crisp
		const style = document.createElement('style');
		style.innerHTML = `
      .crisp-client .cc-floating.cc-bottom.cc-right {
        bottom: auto !important;
        top: 20px !important;
        right: 20px !important;
      }

      .crisp-client .cc-widget.cc-active {
        width: 50px !important;
        height: 50px !important;
        border-radius: 50% !important;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .crisp-client .cc-avatar svg {
        width: 22px !important;
        height: 22px !important;
      }

      @media (max-width: 768px) {
        .crisp-client .cc-floating.cc-bottom.cc-right {
          top: 15px !important;
          right: 15px !important;
        }

        .crisp-client .cc-widget.cc-active {
          width: 45px !important;
          height: 45px !important;
        }
      }
    `;
		document.head.appendChild(style);

		// Load Crisp script
		const script = document.createElement('script');
		script.src = 'https://client.crisp.chat/l.js';
		script.async = true;
		document.head.appendChild(script);

		// Cleanup
		return () => {
			const crispScript = document.querySelector(
				'script[src="https://client.crisp.chat/l.js"]'
			);
			if (crispScript) crispScript.remove();

			document.querySelectorAll('style').forEach((styleTag) => {
				if (styleTag.innerHTML.includes('.crisp-client')) {
					styleTag.remove();
				}
			});
		};
	}, []);

	return null;
};

export default CrispChat;
