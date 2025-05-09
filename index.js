fetch('information.txt')
    .then(response => response.text())
    .then(data => {
        var text = data;
        var textArr = text.split("~");
        document.getElementById('information').textContent = textArr[0];
        document.getElementById('center-paragraph').textContent = textArr[7];
    })
    .catch(error => console.error('Error loading text:', error));

fetch('prices.json')
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
    })
    .catch(error => console.error('Error loading JSON:', error));
