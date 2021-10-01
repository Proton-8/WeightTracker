const signupFormHandler = async(event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const currentWeight = document.querySelector('#currentWeight-signup').value.trim();
    const targetWeight = document.querySelector('#targetWeight-signup').value.trim();
    const startDate = document.querySelector('#startDate-signup').value.trim();
    const endDate = document.querySelector('#endDate-signup').value.trim();

    if (email && password) {
        const response = await fetch('/api/signups', {
            method: 'POST',
            body: JSON.stringify({ name, email, password,currentWeight,targetWeight,startDate,endDate }),
            headers: { 'Content-Type': 'application/json' },
           
        });

        if (response.ok) {
            document.location.replace('/signup');
            console.log("Fetch++++")
        } else {
            alert("response.statusText");

        }
    }
    
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);