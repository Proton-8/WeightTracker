
// to REVIEW -----

const logout = async() => {
    console.log('===============================')
    const response = await fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok) {
        document.location.replace('/');
    } else {
        alert('alert!!!!!!!')
    }
    
};

document.querySelector('#logout').addEventListener('click', logout);