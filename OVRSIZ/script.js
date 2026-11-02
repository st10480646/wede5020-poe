/* OVRSIZ Part 3: small, independent enhancements for the existing pages. */

// Collapse the main navigation behind a menu button on small screens
const header = document.querySelector('header');
const menu = document.querySelector('#main-menu');
if (header && menu) {
    const menuButton = document.createElement('button');
    menuButton.type = 'button';
    menuButton.className = 'menu-toggle';
    menuButton.textContent = 'Menu';
    menuButton.setAttribute('aria-controls', 'main-menu');
    menuButton.setAttribute('aria-expanded', 'false');
    header.querySelector('.logo').after(menuButton);
    header.classList.add('js-nav');
    menuButton.addEventListener('click', function () {
        const isOpen = header.classList.toggle('nav-open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.textContent = isOpen ? 'Close menu' : 'Menu';
    });
}

// Keep HTML as the readable fallback. Build an array of the existing products,
// then render matching copies in the chosen order without duplicating product data.
const productList = document.querySelector('#product-list');
if (productList) {
    const products = [];
    productList.querySelectorAll('article').forEach(function (card) {
        products.push({
            name: card.querySelector('h2').textContent,
            description: card.querySelector('p').textContent,
            price: Number(card.querySelector('strong').parentElement.textContent.replace(/[^0-9.]/g, '')),
            card: card.cloneNode(true)
        });
    });
    const search = document.querySelector('#product-search');
    const sort = document.querySelector('#product-sort');
    const dialog = document.querySelector('#lightbox');
    let imageTrigger;

    // Open selected product photo in the lightbox
    function openLightbox(picture, product, button) {
        imageTrigger = button;
        const largeImage = document.querySelector('#lightbox-image');
        largeImage.src = picture.src;
        largeImage.alt = picture.alt;
        document.querySelector('#lightbox-caption').textContent = product.name + ' — ' + product.description;
        dialog.showModal();
        document.body.classList.add('modal-open');
    }

    function renderProducts() {
        const query = search.value.trim().toLowerCase();
        const matches = products.filter(function (product) {
            return (product.name + ' ' + product.description).toLowerCase().includes(query);
        });
        if (sort.value === 'az') matches.sort(function (a, b) { return a.name.localeCompare(b.name); });
        if (sort.value === 'price') matches.sort(function (a, b) { return a.price - b.price; });
        if (sort.value === 'price-desc') matches.sort(function (a, b) { return b.price - a.price; });
        productList.replaceChildren();
        matches.forEach(function (product) {
            const card = product.card.cloneNode(true);
            const picture = card.querySelector('img');
            const imageButton = document.createElement('button');
            imageButton.type = 'button';
            imageButton.className = 'image-button';
            imageButton.setAttribute('aria-label', 'View larger image: ' + product.name);
            picture.replaceWith(imageButton);
            imageButton.append(picture);
            imageButton.addEventListener('click', function () { openLightbox(picture, product, imageButton); });
            productList.append(card);
        });
        let message = matches.length + (matches.length === 1 ? ' product found.' : ' products found.');
        if (!matches.length) message = 'No products match "' + search.value.trim() + '". Try hoodie or denim, or clear your search.';
        document.querySelector('#search-status').textContent = message;
    }
    document.querySelector('#catalogue-controls').hidden = false;
    search.addEventListener('input', renderProducts);
    sort.addEventListener('change', renderProducts);
    document.querySelector('#lightbox-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
    // Native dialog supports Escape and keeps keyboard focus inside the modal.
    dialog.addEventListener('close', function () {
        document.body.classList.remove('modal-open');
        if (imageTrigger) imageTrigger.focus();
    });
    renderProducts();
}

// Required, trimmed values; clear errors are linked to their own controls.
function validateField(field) {
    // :disabled also covers fields inside a disabled fieldset
    if (field.matches(':disabled')) return true;
    const value = field.value.trim();
    let error = '';
    if (!value) {
        if (field.required) error = field.tagName === 'SELECT' ? 'Please choose an option.' : field.type === 'number' ? 'Enter a whole number.' : 'Please complete this field.';
    }
    else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Enter a valid email address, such as name@example.com.';
    else if (field.type === 'tel' && !/^(\+27|0)\d{9}$/.test(value.replace(/[\s-]/g, ''))) error = 'Enter a South African phone number, such as 082 555 0123 or +27 82 555 0123.';
    else if (field.type === 'number' && (!Number.isInteger(Number(value)) || Number(value) < Number(field.min) || Number(value) > Number(field.max))) error = 'Enter a whole number from ' + field.min + ' to ' + field.max + '.';
    else if (field.minLength > 0 && value.length < field.minLength) error = 'Enter at least ' + field.minLength + ' characters (currently ' + value.length + ').';
    else if (field.maxLength > 0 && value.length > field.maxLength) error = 'Use no more than ' + field.maxLength + ' characters.';
    else if (field.tagName === 'SELECT' && !Array.from(field.options).some(function (option) { return option.value === value; })) error = 'Choose one of the listed options.';
    document.querySelector('#' + field.id + '-error').textContent = error;
    if (error) field.setAttribute('aria-invalid', 'true');
    else if (field.hasAttribute('aria-invalid')) field.setAttribute('aria-invalid', 'false');
    return !error;
}

function setUpValidation(form) {
    const fields = form.querySelectorAll('input[type="text"]:not([name="_gotcha"]), input[type="email"], input[type="tel"], input[type="number"], select, textarea');
    // Only turn off native popups once our own validation is attached.
    form.noValidate = true;
    fields.forEach(function (field) {
        const error = document.createElement('p');
        error.id = field.id + '-error';
        error.className = 'field-error';
        error.setAttribute('aria-live', 'polite');
        field.after(error);
        field.setAttribute('aria-describedby', error.id);
        field.addEventListener('blur', function () { if (field.value.trim() || field.hasAttribute('aria-invalid')) validateField(field); });
        field.addEventListener('input', function () {
            if (field.hasAttribute('aria-invalid')) validateField(field);
        });
        field.addEventListener('change', function () { validateField(field); });
    });
    return function () {
        let firstInvalid;
        fields.forEach(function (field) {
            if (!validateField(field) && !firstInvalid) firstInvalid = field;
        });
        if (firstInvalid) firstInvalid.focus();
        return !firstInvalid;
    };
}

function formatRand(amount) {
    return 'R' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const enquiryForm = document.querySelector('#enquiry-form');
if (enquiryForm) {
    const isValid = setUpValidation(enquiryForm);
    const fields = enquiryForm.elements;
    const response = document.querySelector('#enquiry-response');
    const orderDetails = document.querySelector('#order-details');
    // Prices match the listed products on products.html
    const catalogue = {
        hoodie: { name: 'Essential Boxy Hoodie - Washed Black', price: 850 },
        denim: { name: 'Skate Fit Denim - Vintage Wash', price: 950 }
    };
    const nextSteps = {
        product: 'Sizes and stock are confirmed by the team before any order, so send this summary to check availability in your size.',
        wholesale: 'Bulk pricing is not listed. The team will reply with a bulk quote and availability for your quantity; the retail estimate above is the maximum you would pay.',
        ambassador: 'Ambassador applications are reviewed by the team. Include your social media handles and why OVRSIZ fits your style when you send this summary.',
        sponsorship: 'Sponsorship requests are reviewed by the team. Include your event or team name, dates and audience size when you send this summary.'
    };

    // Show product and quantity only for product or bulk-order enquiries
    function updateOrderDetails() {
        const needsProduct = fields.enquiryType.value !== 'ambassador' && fields.enquiryType.value !== 'sponsorship';
        orderDetails.hidden = !needsProduct;
        orderDetails.disabled = !needsProduct;
    }

    // Phone becomes required when the visitor asks for a phone reply
    function updatePhoneRequirement() {
        fields.phone.required = fields.replyMethod.value === 'phone';
        document.querySelector('label[for="phone"]').textContent = fields.phone.required ? 'Phone number' : 'Phone number (optional)';
        if (fields.phone.hasAttribute('aria-invalid')) validateField(fields.phone);
    }

    function addSummaryRow(list, term, detail) {
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = term;
        dd.textContent = detail;
        list.append(dt, dd);
    }

    fields.enquiryType.addEventListener('change', updateOrderDetails);
    enquiryForm.querySelectorAll('input[name="replyMethod"]').forEach(function (radio) {
        radio.addEventListener('change', updatePhoneRequirement);
    });
    enquiryForm.addEventListener('input', function () { response.hidden = true; });
    updateOrderDetails();

    // Process a valid enquiry into a summary with estimated cost and next steps
    enquiryForm.addEventListener('submit', function (event) {
        event.preventDefault();
        response.hidden = true;
        if (!isValid()) return;
        const type = fields.enquiryType.value;
        const typeLabel = fields.enquiryType.selectedOptions[0].textContent;
        const name = fields.fullName.value.trim();
        const replyByPhone = fields.replyMethod.value === 'phone';
        const summary = document.createElement('dl');
        addSummaryRow(summary, 'Name', name);
        addSummaryRow(summary, 'Enquiry type', typeLabel);
        addSummaryRow(summary, 'Reply by', replyByPhone ? 'Phone: ' + fields.phone.value.trim() : 'Email: ' + fields.email.value.trim());
        if (!orderDetails.disabled) {
            const product = catalogue[fields.productChoice.value];
            const quantity = Number(fields.quantity.value);
            addSummaryRow(summary, 'Product', product.name);
            addSummaryRow(summary, 'Quantity', String(quantity));
            addSummaryRow(summary, 'Estimated retail cost', quantity + ' × ' + formatRand(product.price) + ' = ' + formatRand(product.price * quantity));
        }

        const heading = document.createElement('h2');
        heading.textContent = 'Thank you, ' + name + '. Here is your enquiry summary';
        heading.tabIndex = -1;
        const next = document.createElement('p');
        next.textContent = nextSteps[type];
        const emailLink = document.createElement('a');
        emailLink.className = 'button-link';
        emailLink.textContent = 'Email this enquiry to OVRSIZ';
        const lines = [];
        summary.querySelectorAll('dt').forEach(function (dt) { lines.push(dt.textContent + ': ' + dt.nextElementSibling.textContent); });
        lines.push('', fields.details.value.trim());
        emailLink.href = 'mailto:hello@ovrsiz.co.za?subject=' + encodeURIComponent('OVRSIZ enquiry — ' + typeLabel) + '&body=' + encodeURIComponent(lines.join('\n'));
        const note = document.createElement('p');
        note.className = 'small-note';
        note.textContent = 'Nothing has been sent or ordered yet. The button opens your email app with this summary ready to send.';

        response.replaceChildren(heading, summary, next, emailLink, note);
        response.hidden = false;
        heading.focus();
    });
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    const isValid = setUpValidation(contactForm);
    const status = document.querySelector('#contact-status');
    const submit = document.querySelector('#send-contact');
    const fallback = document.querySelector('#prepare-email');
    const preview = document.querySelector('#email-preview');
    // Online sending switches on automatically once the Formspree form ID is added to the form action.
    const onlineContactEnabled = !contactForm.action.includes('YOUR_FORM_ID');
    if (!onlineContactEnabled) {
        submit.textContent = 'Prepare email';
        fallback.hidden = true;
    }

    // Compile the validated message into an email addressed to the OVRSIZ inbox
    function prepareEmail() {
        if (!isValid()) return;
        const fields = contactForm.elements;
        const type = fields.messageType.selectedOptions[0].textContent;
        const body = 'Name: ' + fields.name.value.trim() + '\nEmail: ' + fields.email.value.trim() + '\nMessage type: ' + type + '\n\n' + fields.message.value.trim();
        document.querySelector('#email-content').textContent = 'To: hello@ovrsiz.co.za\nSubject: OVRSIZ — ' + type + '\n\n' + body;
        document.querySelector('#email-link').href = 'mailto:hello@ovrsiz.co.za?subject=' + encodeURIComponent('OVRSIZ — ' + type) + '&body=' + encodeURIComponent(body);
        preview.hidden = false;
        status.className = '';
        status.textContent = 'Email prepared. Review it below and select "Open in email app" to send it.';
    }

    function showStatus(message, state) {
        status.className = state;
        status.textContent = message;
    }

    contactForm.addEventListener('input', function () { preview.hidden = true; status.textContent = ''; });
    fallback.addEventListener('click', prepareEmail);
    // Send the message with fetch (AJAX) so the visitor stays on the page
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        status.textContent = '';
        preview.hidden = true;
        if (!isValid()) return;
        if (!onlineContactEnabled) { prepareEmail(); return; }
        contactForm.elements._subject.value = 'OVRSIZ — ' + contactForm.elements.messageType.selectedOptions[0].textContent;
        submit.disabled = true;
        fallback.disabled = true;
        contactForm.setAttribute('aria-busy', 'true');
        showStatus('Sending your message…', 'is-sending');
        const controller = new AbortController();
        const timeout = setTimeout(function () { controller.abort(); }, 15000);
        fetch(contactForm.action, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: new FormData(contactForm),
            signal: controller.signal
        }).then(function (response) {
            if (!response.ok) throw new Error('Submission failed');
            showStatus('Thank you, ' + contactForm.elements.name.value.trim() + '. Your message was sent to the OVRSIZ team. We will reply to ' + contactForm.elements.email.value.trim() + '.', 'is-success');
            contactForm.reset();
        }).catch(function () {
            showStatus('Your message could not be sent. Your details are still here. Check your connection and try again, or select "Prepare email instead".', 'is-error');
        }).finally(function () {
            clearTimeout(timeout);
            submit.disabled = false;
            fallback.disabled = false;
            contactForm.removeAttribute('aria-busy');
        });
    });
}

// Interactive Leaflet map showing both OVRSIZ locations
const mapElement = document.querySelector('#store-map');
if (mapElement && typeof L !== 'undefined') {
    const locations = [
        { name: 'Johannesburg Flagship', address: '123 Braamfontein Ave, Johannesburg, 2001', coords: [-26.1923, 28.0361] },
        { name: 'Cape Town Pop-up', address: '45 Bree Street, Cape Town, 8001', coords: [-33.9236, 18.4155] }
    ];
    mapElement.replaceChildren();
    const map = L.map(mapElement, { scrollWheelZoom: false });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const markers = locations.map(function (location) {
        const popup = document.createElement('div');
        const title = document.createElement('strong');
        title.textContent = location.name;
        popup.append(title, document.createElement('br'), location.address);
        return L.marker(location.coords, { title: location.name, alt: location.name }).addTo(map).bindPopup(popup);
    });
    map.fitBounds(L.featureGroup(markers).getBounds(), { padding: [40, 40] });
    // Allow mouse-wheel zoom only after the visitor selects the map, so page scrolling is not hijacked
    map.on('focus click', function () { map.scrollWheelZoom.enable(); });
    map.on('blur', function () { map.scrollWheelZoom.disable(); });

    document.querySelectorAll('.map-focus').forEach(function (button) {
        button.addEventListener('click', function () {
            const marker = markers[Number(button.dataset.location)];
            map.flyTo(marker.getLatLng(), 16);
            marker.openPopup();
            mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
} else if (mapElement) {
    document.querySelectorAll('.map-focus').forEach(function (button) { button.hidden = true; });
}
