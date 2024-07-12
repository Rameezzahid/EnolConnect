document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const businessName = document.getElementById('businessName').value;
    const proprietorName = document.getElementById('proprietorName').value;
    const businessAddress = document.getElementById('businessAddress').value;
    const contactInfo = document.getElementById('contactInfo').value;
    const shopBoardPicture = document.getElementById('shopBoardPicture').files[0];
    const entryType = document.querySelector('input[name="entryType"]:checked').value;
    const geolocation = document.getElementById('geolocation').value;

    const reader = new FileReader();
    reader.readAsDataURL(shopBoardPicture);
    reader.onload = function () {
        const formData = {
            businessName: businessName,
            proprietorName: proprietorName,
            businessAddress: businessAddress,
            contactInfo: contactInfo,
            shopBoardPicture: reader.result.split(',')[1],  // Base64 string
            shopBoardPictureType: shopBoardPicture.type,
            shopBoardPictureName: shopBoardPicture.name,
            geolocation: geolocation,
            entryType: entryType
        };

        console.log("Form data being sent:", formData);

        fetch('https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec', { // replace with your deployment ID
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
    };
});
