document.getElementById('testForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const testInput = document.getElementById('testInput').value;
    const formData = {
        testInput: testInput
    };

    console.log("Form data being sent:", formData);

    fetch('https://script.google.com/macros/s/AKfycbzRcV0MlkH0Fm2zDMG610uWrPbb4CdET_ZDn0Cm4iACzJbZgRsLrkZbGvyXsnLQOJFpIQ/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response received from server:", data);
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
