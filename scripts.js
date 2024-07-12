document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const testInput = document.getElementById('testInput').value;
    const formData = {
        testInput: testInput
    };

    console.log("Form data being sent:", formData);

    fetch('https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec', { // replace with your deployment ID
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        console.log("Response received from server:", response);
        return response.json();
    })
    .then(data => {
        console.log("Parsed response from server:", data);
        if (data.status === 'success') {
            alert(data.message);
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the form. Please try again.');
    });
});
