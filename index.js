fetch('https://unicornssadelmakeri.se/assets/text/information.json')
    .then(response => response.json())
    .then(data => {
        section1(data);
        section2(data);
        section3(data);
        section4(data);
    }).catch(error => console.error('Error loading text:', error));

fetch('https://unicornssadelmakeri.se/assets/text/prices.json')
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

function section1(data) {
    try {
        const sec1 = Object.values(data.section1);
        document.getElementById('section-1-title').textContent = sec1[0];

        let html = '';
        sec1.forEach((item, index) => {
            if(index == 0) { 
                return; }
            html += `<p id="section-1-paragraph">${item}</p>`;
        });

        document.getElementById('section-1-paragraphs').innerHTML = html;

    } catch(error) {
        console.error('Error loading text:', error);
    }
}

function section2(data) {
    try {
        const sec2 = Object.values(data.section2);
        document.getElementById('section-2-title').textContent = sec2[0];
        let html = '';
        sec2.forEach((item, index) => {
            if(index == 0) { 
                return; 
            } else if(index == sec2.length-1) {
                console.log("test")
                html += `<p class="section-2-paragraph quote">${item}</p>`;
            } else {
                html += `<p class="section-2-paragraph">${item}</p>`;
            }
        });

        document.getElementById('section-2-paragraphs').innerHTML = html;

    } catch(error) {
        console.error('Error loading text:', error);
    }
}

function section3(data) {
    try {
        const sec3 = Object.values(data.section3);
        document.getElementById('section-3-title').textContent = sec3[0];
    } catch(error) {
        console.error('Error loading text:', error);
    }
}

function section4(data) {
    try {
        const sec4 = Object.values(data.section4);
        document.getElementById('section-4-title').textContent = sec4[0];

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
    } catch(error) {
        console.error('Error loading text:', error);
    }
}
