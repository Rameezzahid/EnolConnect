document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const businessName = document.getElementById('businessName').value;
    const proprietorName = document.getElementById('proprietorName').value;
    const businessAddress = document.getElementById('businessAddress').value;
    const contactInfo = document.getElementById('contactInfo').value;
    const shopBoardPicture = document.getElementById('shopBoardPicture').files[0];
    const geolocation = document.getElementById('geolocation').value;

    const phoneNumberPattern = /^\+\d{1,3}\d{7,14}$/;
    if (!phoneNumberPattern.test(contactInfo)) {
        alert('Invalid phone number format. Please use the international format.');
        return;
    }

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
            geolocation: geolocation
        };

        fetch('https://script.google.com/macros/s/AKfycbzRcV0MlkH0Fm2zDMG610uWrPbb4CdET_ZDn0Cm4iACzJbZgRsLrkZbGvyXsnLQOJFpIQ/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
          .then(data => {
              alert(data.message);
          }).catch(error => {
              console.error('Error:', error);
              alert('There was an error submitting the form. Please try again.');
          });
    };
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const geolocation = position.coords.latitude + "," + position.coords.longitude;
    document.getElementById('geolocation').value = geolocation;
}
