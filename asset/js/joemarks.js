function searchMovies() {
    const name = document.getElementById('searchfilm').value.toLowerCase();

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            document.getElementById('info').innerHTML = `
                <h2>${data.name.toUpperCase()}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
            `;
        })
        .catch(error => {
            document.getElementById('info').innerHTML = `
                <p>the motion-picture you are looking for may exist someday.</p>
            `;
        });
}