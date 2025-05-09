// Handles the short information text and center paragraph
fetch('assets/information.json')
    .then(response => response.json())
    .then(data => {

        const paragraphArr = Object.values(data.paragraphs);
        document.getElementById('center-paragraph').textContent = paragraphArr[0];
        document.getElementById('information').textContent = paragraphArr[1];
        
        let html = '';
        paragraphArr.forEach((item, index) => {
            console.log(index)
            if(index < 2) { return; }
            html += `<p class="more-item">${item}</p>`;
        });

        document.getElementById('more-text').innerHTML = html;
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
        const paragraphArr = Object.values(data.paragraphs);

        let html = '';
        paragraphArr.forEach((item, index) => {
            if(index < 2) { return; }
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
