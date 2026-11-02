# OVRSIZ — Oversized Streetwear Website

**OVRSIZ** is a fictional online streetwear brand founded in 2026. This repository contains the static website built for **WEDE5020 Web Development (Introduction)**, Parts 1–3 of the POE.

**Live website:** 

---

## Student Information

- Student name: _to be supplied_ (the site's founder character is Marcus; this does not establish the student's name)
- Student number and group: _to be supplied_
- Module: WEDE5020, Part 3 POE

## Project Overview

The website establishes a strong brand identity for a premium, gender-neutral, oversized clothing line and lets visitors browse products, send enquiries and contact the team. It is a static HTML/CSS/JavaScript site designed for GitHub Pages hosting, as stated in the Part 1 proposal.

| Part | Focus |
|---|---|
| Part 1 | Proposal, HTML structure, semantic elements, content and navigation |
| Part 2 | CSS styling, colour scheme, typography and mobile-first responsive design |
| Part 3 | JavaScript functionality, SEO, form validation/processing and deployment preparation |

## Organisation

- **Name:** OVRSIZ (fictional, founded 2026)
- **Specialises in:** high-quality, gender-neutral, oversized clothing
- **Mission:** to redefine comfort and street culture for modern youth by providing sustainable oversized wardrobe staples
- **Locations (storyline):** Johannesburg Flagship (123 Braamfontein Ave, Johannesburg, 2001) and Cape Town Pop-up (45 Bree Street, Cape Town, 8001)

## Website Goals

From the Part 1 proposal:

- Establish a strong brand identity, showcase the latest oversized collection and generate online sales.
- KPI: 500 unique visitors in the first month.
- KPI: 5% conversion rate on the products page.
- KPI: 50 submitted enquiry forms for brand ambassadorship opportunities.

## Target Audience

Gen Z and younger millennials aged 16–28 who value streetwear, comfort, and skate and hip-hop culture.

## Features

### Part 1

- Five linked pages: Home, About Us, Products, Enquiries and Contact.
- Semantic HTML5 structure (header, nav, main, section, article, footer).
- Product content, brand story, team section, enquiry and contact forms, store locations.

### Part 2

- Monochrome palette (black `#121212`, charcoal `#222222`, off-white `#f4f4f4`) with neon-green `#39ff14` accents, defined as CSS custom properties.
- Brutalist `Impact`/`Arial Black` headings with `Roboto` body text.
- Mobile-first layout using Flexbox and CSS Grid, with a 768px breakpoint for tablet/desktop.
- Hover/focus pseudo-classes on navigation, buttons and form fields.

### Part 3

| Feature | Where | How it works |
|---|---|---|
| Responsive menu button | All pages | On screens under 768px the navigation collapses behind a **Menu** button (`aria-expanded` updates). The button is created by JavaScript, so without JavaScript the full menu still shows. |
| Accordion (FAQ) | products.html | Native `<details>`/`<summary>` disclosures with a fade-in animation. Keyboard accessible by default. |
| Gallery lightbox | products.html | Selecting a product photo opens it larger in a native `<dialog>` with a dark backdrop, caption and **Close image** button. Closes with Escape, the Close button or a backdrop click; focus returns to the photo that opened it. |
| Dynamic content | products.html | JavaScript reads the HTML product cards into an array of objects (`name`, `description`, `price`) and re-renders them into the page with `createElement`/`replaceChildren`. The HTML cards stay as the no-JavaScript fallback. |
| Search, filter and sort | products.html | Case-insensitive search across product names and descriptions, a live result count, a no-results message, and sorting by collection order, name A–Z, price low–high and price high–low. |
| Interactive map | contact.html | One Leaflet + OpenStreetMap map with a marker and popup for each store. Supports drag-to-pan, zoom buttons, keyboard-focusable markers, and **Show on map** buttons that fly to each store. Mouse-wheel zoom turns on only after the map is clicked, so page scrolling is not hijacked. Each store also has an "Open in OpenStreetMap" link as a fallback. |
| Enquiry form processing | enquiry.html | Validates input, then shows a summary with an **estimated retail cost** (quantity × listed price) and next steps for availability, bulk quotes, ambassadorship or sponsorship. An **Email this enquiry** button opens the visitor's email app with the summary filled in. |
| Contact form email (AJAX) | contact.html | Validates input, then sends it to the OVRSIZ inbox through Formspree using `fetch()`. Shows **Sending**, **Success** and **Error** states. **Prepare email instead** compiles the message into a reviewable email addressed to `hello@ovrsiz.co.za` (the recipient stated in the code) and opens it in the visitor's email app. |
| Animations and transitions | style.css | Fade-in for the lightbox, FAQ answers, mobile menu and enquiry summary, plus colour and scale transitions on buttons and links. All motion is disabled under `prefers-reduced-motion`. |
| SEO | All pages | Unique titles, meta descriptions and meta keywords, one page-specific H1, descriptive image filenames and alt text, internal links, `robots.txt` and `sitemap.xml`. |

## Technologies Used

- HTML5, CSS3 and vanilla JavaScript (no frameworks, build tools or backend)
- [Leaflet 1.9.4](https://leafletjs.com/) loaded from unpkg with Subresource Integrity, plus OpenStreetMap tiles (no API key needed)
- [Formspree](https://formspree.io/) for contact-form email delivery (static-site compatible; no server code)
- Google Fonts (Roboto)
- GitHub Pages for hosting

## Project Structure

```text
OVRSIZ/
├── index.html          # Home: hero, trending categories, calls to action
├── about.html          # Brand story, mission and vision, founder
├── products.html       # Searchable/sortable catalogue, lightbox, FAQ
├── enquiry.html        # Product, bulk order, ambassador and sponsorship enquiries
├── contact.html        # General contact form (email/AJAX) and interactive map
├── style.css           # Single stylesheet (Part 2 styles + Part 3 additions)
├── script.js           # Single script for all Part 3 functionality
├── robots.txt          # Crawler rules and sitemap location
├── sitemap.xml         # List of the five public pages
├── images/
│   ├── ovrsiz-black-oversized-hoodies-streetwear.jpeg
│   ├── marcus-ovrsiz-founder.jpg
│   ├── essential-boxy-hoodie-washed-black.jpeg
│   └── skate-fit-denim-vintage-wash.jpeg
├── docs/
│   └── screenshots/    # Evidence screenshots
├── .gitignore
└── README.md           # This document (single source of documentation)
```

## How to Run Locally

No installation or build step is needed.

1. Download or clone the repository.
2. Open the folder in Visual Studio Code.
3. Right-click `index.html` and choose **Open with Live Server** (Live Server extension), or open `index.html` directly in a browser.

Use Live Server (or another local web server) to test the map. OpenStreetMap may refuse map tiles when the page is opened directly as a `file://` path.

## Responsive Design

- Mobile first: stacked layout, full-width buttons and form fields, and a collapsible **Menu** button.
- From 768px: horizontal header and navigation, two-column cards, and a product grid with the image beside the text.
- Part 3 features were checked at 375px (mobile), 768px (tablet) and 1280px (desktop) with no horizontal overflow on any page. The map shrinks to 320px high on very small screens, and the enquiry summary stacks into one column.

## Accessibility Considerations

- Skip-to-content link on every page and a visible neon focus outline (`:focus-visible`).
- Every form control has a `<label>`. Radio buttons are grouped in a `<fieldset>` with a `<legend>`.
- Error messages appear under the field they belong to, are linked with `aria-describedby`, set `aria-invalid`, and are announced through `aria-live`.
- The lightbox uses the native `<dialog>` element (keeps focus inside, closes with Escape) and returns focus afterwards.
- The menu button reports its state with `aria-expanded`. Map markers can be reached with the keyboard, and each store has text and link fallbacks.
- `prefers-reduced-motion` disables animations.

## SEO Implementation

| Page | Title | Focus keywords |
|---|---|---|
| index.html | OVRSIZ \| Oversized Streetwear, Heavyweight Hoodies & Baggy Denim | oversized streetwear, heavyweight hoodies, baggy denim |
| about.html | About Us: Our Story, Mission & Founder \| OVRSIZ | OVRSIZ story, founder Marcus, streetwear brand mission |
| products.html | Shop Oversized Hoodies & Skate Fit Denim \| OVRSIZ | boxy hoodie, 450gsm hoodie, skate fit denim, wide leg jeans |
| enquiry.html | Brand Ambassador, Sponsorship & Bulk Order Enquiries \| OVRSIZ | streetwear brand ambassador, sponsorship, bulk orders |
| contact.html | Contact Us: Johannesburg & Cape Town Stores \| OVRSIZ | contact OVRSIZ, Johannesburg/Braamfontein, Cape Town/Bree Street |

- **Title tags:** unique on every page, with the page topic first and the brand name at the end.
- **Meta keywords:** 5–6 relevant, page-specific phrases on every page. They are included because the rubric asks for them; modern search engines largely ignore this tag.
- **Meta descriptions:** a unique, roughly 120–160 character summary of each page's actual content.
- **Headings:** the header logo is now a link, not an `<h1>`, so each page has one topic-specific H1 followed by logical H2/H3 levels.
- **Image filenames:** renamed from generic names (for example `hero-image.jpeg`, `product-jeans.jpeg`) to descriptive, hyphenated names, with every reference updated.
- **Alt text:** describes what each photo actually shows, without keyword stuffing.
- **Clean URLs and internal links:** short, lowercase page names, with contextual links between Home, Products, Enquiry, About and Contact.
- **Local SEO:** city names and store addresses on the contact page and in its metadata.
- **robots.txt:** allows all crawlers and points to the sitemap.
- **sitemap.xml:** lists the five public pages only.
- **Page speed:** images total about 130 KB, images below the first screen use `loading="lazy"`, every image has `width`/`height` to prevent layout shift, scripts use `defer`, and Leaflet loads only on the contact page.
- **Security:** no secrets or API keys in the code, no `eval`, all user input is written with `textContent` (never `innerHTML`), email links are built with `encodeURIComponent`, external libraries use Subresource Integrity hashes, and the contact form includes a Formspree honeypot field (`_gotcha`) against spam bots.
- **Off-page SEO (backlinks, social media):** not done. This needs real accounts and posts by the student; nothing has been invented.

## Forms

### Enquiry (enquiry.html)

**Purpose:** product information, wholesale/bulk orders, brand ambassadorship and sponsorship. These are the enquiry types from the Part 1 proposal.

**Controls:** full name (text), email (email), phone (tel, optional), preferred reply method (radio buttons), enquiry type (select), product (select), quantity (number, 1–500) and details (textarea, 10–1500 characters).

**Validation (HTML5 attributes + JavaScript):**

- Required fields, with whitespace-only input rejected.
- Email format.
- South African phone format (`082 555 0123` or `+27 82 555 0123`). Phone becomes required when "Phone" is chosen as the reply method.
- Quantity must be a whole number from 1 to 500.
- Minimum/maximum character lengths, including a live character count in the error message.
- Dropdowns must have a valid option selected.
- Errors appear inline on submit and when leaving a field, update as the user types, and clear once the field is corrected. Focus moves to the first invalid field.

**Processing and response:** the product and quantity fields appear only for product and bulk-order enquiries. After validation, the form shows a summary panel with the visitor's name, enquiry type, reply method, product, quantity and **estimated retail cost** (for example 12 × R850.00 = R10,200.00), using the prices listed on products.html. It then gives next steps for that enquiry type. No stock levels, discounts or delivery dates are invented; availability and bulk pricing are confirmed by the team. **Email this enquiry to OVRSIZ** opens the visitor's email app with the summary ready to send.

### Contact (contact.html)

**Purpose:** general messages to the organisation (general questions, feedback, location information).

**Controls:** name, email, message type (select), full message (textarea), plus a hidden honeypot field and a hidden email subject.

**Validation:** the same inline system as the enquiry form (required fields, email format, length limits, valid selection).

**Processing and email:**

- **Send message (AJAX):** submits the form with `fetch()` to Formspree, which emails the message to the address registered on the Formspree form. The status area shows *Sending your message…*, then a success message (and the form is cleared) or an error message (the input is kept). A 15-second timeout prevents the page from hanging.
- **Prepare email instead:** compiles the validated input into an email to `hello@ovrsiz.co.za`, shows a preview, and opens the visitor's email app with the subject and body filled in. This covers the brief's requirement that the message is "compiled and included into an email" the visitor can send.
- Until a real Formspree form ID is added, the site automatically falls back to **Prepare email** only and hides the AJAX button. See the Formspree setup steps below.



## Part 3 Changelog

### 2 November 2026

**Fixed**

- **GitHub Pages blocker:** the contact form used Netlify Forms (`data-netlify`, `action="/contact.html"`), which cannot work on GitHub Pages (the hosting platform named in the Part 1 proposal). Replaced it with a Formspree endpoint (a full `https://` URL, so it works under any repository sub-path). Removed the Netlify-only attributes and hidden fields.
- **Headings:** every page used the logo "OVRSIZ" as its `<h1>`, so no page had a topic-specific H1. The logo is now a styled home link (same visual design), and each page's main heading is its H1: "Redefining Comfort.", "About OVRSIZ" (new), "Latest Collection", "Work With Us / Product Enquiries" and "Contact Us". Lower headings were shifted so levels are not skipped (for example contact location names h4 → h3, product names h3 → h2).
- **Maps:** the two Google Maps embeds did not pin the stated addresses (one showed only the area, one showed postcode 8000 instead of 8001). Replaced them with one Leaflet/OpenStreetMap map with a marker for each store. Neither storyline address geocodes to an exact building, so markers sit at the Braamfontein suburb centre and on Bree Street and are described on the page as approximate. The addresses themselves are unchanged.
- **Lightbox images** now scale to the full dialog width, so they display larger than on the card.

**Added**

- Mobile **Menu** toggle (JavaScript-created, `aria-expanded`, hidden from 768px up).
- "Price: high to low" sort option, singular/plural result counts and a no-results message that repeats the search term.
- Lightbox caption now includes the product description.
- A third FAQ item linking to the store map.
- Enquiry form: optional phone (SA format), preferred reply method (radio buttons; makes phone required), **Sponsorship** enquiry type (from the Part 1 proposal), quantity (1–500). Product and quantity are shown only for product and bulk enquiries.
- Enquiry response: summary panel with estimated retail cost, type-specific next steps and an **Email this enquiry** mailto button.
- Contact form: AJAX submission to Formspree with `fetch()`, Sending/Success/Error states, a timeout, a honeypot field and a dynamic email subject. The **Prepare email instead** path is kept. AJAX switches on automatically once a real form ID is added.
- Map interaction: "Show on map" buttons, popups, keyboard-focusable markers, click-to-enable wheel zoom and "Open in OpenStreetMap" fallback links.
- `sitemap.xml` at the site root (replacing `docs/sitemap.xml.template`) and a `Sitemap:` line in `robots.txt`, both with clearly marked URL placeholders.
- Fade-in animations for the mobile menu, lightbox and enquiry summary (disabled under reduced motion).
- Clickable `tel:` phone link on the contact page, and new internal links on Home, About, Products and Enquiry.

**Improved**

- Renamed all four images to descriptive filenames and updated every reference.
- Rewrote alt text to describe what each photo actually shows.
- Rewrote all titles to be descriptive and page-specific, expanded meta keywords to 5–6 relevant phrases per page, and refined the enquiry and contact descriptions.
- Validation messages are more specific (live character count, "Please choose an option" for dropdowns, phone and quantity rules). Errors are no longer shown on an empty field the user only tabbed past.
- README rewritten as the single documentation file; `docs/AI-DISCLOSURE.md`, `docs/DEPLOYMENT.md`, `docs/PART3-AUDIT.md` and `docs/TESTING.md` were merged into it and deleted.

### 1 November 2026

- Added `script.js` for product filtering/sorting, dynamic rendering, the gallery lightbox, enquiry processing and contact email preparation.
- Added native FAQ disclosures and reduced-motion-aware transition styles.
- Added message-type and product-interest controls with labels, required values and length limits.
- Added inline JavaScript validation, linked error messages and status feedback.
- Added page-specific meta descriptions and keywords, `robots.txt`, skip links, current-page navigation styling and focus outlines.
- Replaced non-functional **Add to Cart** buttons with enquiry links, and removed an invalid button nested inside a link on the home page.
- Added accessible titles to the map frames (since replaced by the Leaflet map), image dimensions and lazy loading.
- Captured product-page desktop and mobile screenshots (`docs/screenshots/`). These show the 1 November version and should be retaken after deployment.

## Part 2 Feedback Corrections

Part 2 feedback could not be verified: no lecturer feedback was supplied with the project. The fixes above came from auditing the site against the Part 3 rubric and are **not** claimed as lecturer-requested changes.



## References

Harvard style adapted for the IIE. **ACTION REQUIRED:** check the formatting against the current IIE referencing guide.

Formspree (n.d.) *Submit forms with JavaScript (AJAX)*. Formspree Help Center. Available at: https://help.formspree.io/hc/en-us/articles/360013470814-Submit-forms-with-JavaScript-AJAX- (Accessed: 2 November 2026).

Google (n.d.) *Roboto*. Google Fonts. Available at: https://fonts.google.com/specimen/Roboto (Accessed: 1 November 2026).

Leaflet (2023) *Leaflet: an open-source JavaScript library for mobile-friendly interactive maps*. Version 1.9.4. Available at: https://leafletjs.com/ (Accessed: 2 November 2026).

MDN Web Docs (n.d.a) *&lt;dialog&gt;: the Dialog element*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog (Accessed: 1 November 2026).

MDN Web Docs (n.d.b) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation (Accessed: 1 November 2026).

MDN Web Docs (n.d.c) *Using the Fetch API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch (Accessed: 2 November 2026).

OpenStreetMap contributors (n.d.) *OpenStreetMap*. Map data © OpenStreetMap contributors, available under the Open Database Licence. Available at: https://www.openstreetmap.org/copyright (Accessed: 2 November 2026).

The Independent Institute of Education (2026) *Web Development (Introduction): WEDE5020 POE (paper and marking rubric)*. Johannesburg: The IIE.

**AI tools** (see the disclosure below):

Anthropic (2026) *Claude* [AI coding assistant]. Assistance with OVRSIZ WEDE5020 Part 3 audit and repair, 2 November.

OpenAI (2026) *Codex* [AI coding assistant]. Assistance with OVRSIZ WEDE5020 Part 3, 1 November.


- `ovrsiz-black-oversized-hoodies-streetwear.jpeg` (was `hero-image.jpeg`)
- `marcus-ovrsiz-founder.jpg` (was `founder.jpg`)
- `essential-boxy-hoodie-washed-black.jpeg` (was `product-hoodie.jpeg`)
- `skate-fit-denim-vintage-wash.jpeg` (was `product-jeans.jpeg`)

Do not claim these images are original or licensed without evidence.

## AI Assistance Disclosure

AI coding assistants were used during Part 3:

- **1 November 2026, OpenAI Codex:** inspected the existing files against the Part 3 brief and helped write the first versions of the JavaScript (search, sorting, lightbox, validation, enquiry guidance, email preparation), the CSS additions and the documentation.
- **2 November 2026, Anthropic Claude:** audited the project against the Part 3 rubric, fixed the GitHub Pages blocker (Netlify → Formspree AJAX), replaced the map embeds with a Leaflet map, restructured headings, improved SEO metadata, filenames and alt text, extended the enquiry form and its cost response, added the mobile menu, tested the site locally, and merged the documentation into this README.

The brand, storyline, page content, images, product descriptions and prices came from the student's Parts 1 and 2 work and were preserved.

Suggested in-text acknowledgement: "Part 3 functionality and documentation were developed with AI assistance (OpenAI, 2026; Anthropic, 2026)."



![Desktop product catalogue](docs/screenshots/products-desktop.jpg)
![Mobile product catalogue](docs/screenshots/products-mobile.jpg)
