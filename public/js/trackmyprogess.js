const loginHandler = async(event) => {
    event.preventDefault()
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    const trackId = event.currentTarget.attributes['trackerid'].value;
  
    if (email && password) {
        const requestUrl = `/api/trackers/${trackId}`;
        // Send a POST request to the API endpoint
        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        // document.location.reload('/tracker')

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/tracker');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#trackid')
.addEventListener('click', trackIdHandler)