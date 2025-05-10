// Handles the short information text and center paragraph
fetch('assets/information.json')
    .then(response => response.json())
    .then(data => {

        //1const paragraphArr = Object.values(data.paragraphs);
        const sec1 = Object.values(data.section1);
        document.getElementById('section-1-title').textContent = sec1[0];
        document.getElementById('section-1-paragraph').textContent = sec1[1];
        console.log(sec1);

        const sec2 = Object.values(data.section2);
        document.getElementById('section-2-title').textContent = sec2[0];
        document.getElementById('section-2-paragraph').textContent = sec2[1];
        console.log(sec2[0]);

        const sec3 = Object.values(data.section3);
        document.getElementById('section-3-title').textContent = sec3[0];
        console.log(sec3[0]);

        const sec4 = Object.values(data.section4);
        document.getElementById('section-4-title').textContent = sec4[0];
        console.log(sec4[0]);

    }).catch(error => console.error('Error loading text:', error));

fetch('assets/prices.json')
    .then(response => response.json())
    .then(data => {
        let html = '<div class="pricing-list">';

        Object.values(data).forEach(item => {
            html += `
                <div class="pricing-item">
                    <div class="pricing-header">
                        <h3 class="title">${item.title}</h3>
                        <h3 class="price">${item.price}</h3>
                        <div class="arrow price-arrow" id="price-arrow">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129">
                                <g>
                                    <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div class="pricing-description hidden">
                        <p>${item.description}</p>
                        <div class="underline pricing-description"></div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        document.getElementById('pricing').innerHTML = html;

        document.querySelectorAll('.pricing-header').forEach(header => {
            header.addEventListener('click', () => {
                const allDescriptions = document.querySelectorAll('.pricing-description');
                const desc = header.nextElementSibling;
                const arrow = header.querySelector('.price-arrow');

                allDescriptions.forEach(d => {
                    if (d !== desc) d.classList.add('hidden');
                });

                document.querySelectorAll('.price-arrow').forEach(a => {
                    if (a !== arrow) a.classList.remove('expanded');
                });

                arrow.classList.toggle('expanded');
                desc.classList.toggle('hidden');
            });
        });
    }).catch(error => console.error('Error loading JSON:', error));

fetch('assets/information.json')
    .then(response => response.json())
    .then(data => {
        const sec4 = Object.values(data.section4);
        let html = '';
        sec4.forEach((item, index) => {
            if(index == 0) { 
                return; }
            html += `<p class="more-item">${item}</p>`;
        });

        document.getElementById('more-text').innerHTML = html;

        const container = document.getElementById('more-text');
        const toggleArrow = document.getElementById('toggle-arrow');

        toggleArrow.addEventListener('click', () => {
            container.classList.toggle('expanded');
            toggleArrow.classList.toggle('expanded');
        });
    })
    .catch(error => console.error('Error loading text:', error));

// Select the element to watch
const pictureContainer = document.querySelector('.c2.picture');

// Check if the element exists before adding event listeners
if (pictureContainer) {
    // Function to adjust padding based on vertical position
    function adjustPadding() {
        const rect = pictureContainer.getBoundingClientRect();
        
        // Get the element's position relative to the viewport
        const elementTop = rect.top;  // Distance from top of the viewport
        const elementHeight = rect.height;  // Element's height
        
        // Get the height of the viewport
        const viewportHeight = window.innerHeight;

        // Here, you can adjust the padding based on the position of the element
        let newPadding = '1vw';  // Default padding

        // Adjust the padding dynamically based on the element's position
        if (elementTop < viewportHeight * 0.5) {
            newPadding = '3vw';  // Increase padding
        } else if (elementTop < viewportHeight * 0.75) {
            newPadding = '2vw';  // Medium padding
        } else {
            newPadding = '0.5vw';  // Decrease padding
        }

        // Apply the new padding to the element
        pictureContainer.style.padding = newPadding;
    }

    // Call the function on scroll and resize events
    window.addEventListener('scroll', adjustPadding);
    window.addEventListener('resize', adjustPadding);

    // Initial call to set the padding when the page loads
    adjustPadding();
} else {
    console.error("The element '.c2.picture' was not found in the DOM.");
}
