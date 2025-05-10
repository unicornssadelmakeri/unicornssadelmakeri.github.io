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
                    </div>
                    <div class="underline pricing-description hidden">
                        <h3>${item.description}</h3>
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

                allDescriptions.forEach(d => {
                    if (d !== desc) d.classList.add('hidden');
                });

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
