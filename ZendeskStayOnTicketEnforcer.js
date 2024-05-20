// ==UserScript==
// @name        Zendesk Stay on Ticket Enforcer
// @namespace   https://a8c.zendesk.com/
// @version     0.1
// @description Enforces staying on ticket after saving on Zendesk
// @author      mahfuzur rahman
// @match       https://a8c.zendesk.com/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=zendesk.com
// @grant       none
// @downloadURL  https://github.com/coder-mahfuz/Zendesk-Stay-on-Ticket-Enforcer
// @updateURL    https://github.com/coder-mahfuz/Zendesk-Stay-on-Ticket-Enforcer
// ==/UserScript==

(function() {
  const urlString = "/tickets/"; // Replace with your specific URL string
  let soteCssAdded = false;
  let isButtonClicked = false;

  // This function checks the URL, button text, and injects CSS if needed
  function checkUrlAndButtons() {
    if (window.location.href.includes(urlString)) {
      const button = $("[data-tracking-id=ticket-footer-post-save-actions-menu-button]");
      const buttonText = button.text().trim();

      // Add missing CSS classes if not already added
      if (!soteCssAdded) {
        const customStyle = `
          <style>
            /* Target the button using the chosen selector */
            button[data-tracking-id*='ticket-footer-post-save'].animate {
              background-color: #f3ad32; /* Define original color here */
            }

            button[data-tracking-id*='ticket-footer-post-save'] {
              background-color: unset;
              transition: background-color 0.5s ease-in-out;
            }
          </style>`;
        $(customStyle).appendTo("head");
        soteCssAdded = true; // Set flag to prevent further addition
      }

      // Button text check and click logic
      if (!isButtonClicked && buttonText !== "Stay on ticket") {
        button.click();
        button.addClass("animate");
        isButtonClicked = true; // Prevent further clicks

        setTimeout(() => {
          $("[data-tracking-id=ticket-footer-post-save-actionsstay_on_ticket]").click();
          button.removeClass("animate");
          isButtonClicked = false; // Allow checking again after action is performed
        }, 500);
      }
    }
  }

  // Call the function initially to check on page load
  checkUrlAndButtons();
  // Set interval to check URL and button text every 1 minute
  setInterval(checkUrlAndButtons, 500);
})();
