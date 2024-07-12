document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('autoGeolocation') === 'true') {
        document.getElementById('autoGeolocation').checked = true;
    }
});

document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const businessName = document.getElementById('businessName').value;
    const proprietorName = document.getElementById('proprietorName').value;
    const businessAddress = document.getElementById('businessAddress').value;
    const contactInfo = document.getElementById('contactInfo').value;
    const shopBoardPicture = document.getElementById('shopBoardPicture').files[0];
    const entryType = document.querySelector('input[name="entryType"]:checked').value;

    const phoneNumberPattern = /^\+\d{1,3}\d{7,14}$/;
    if (!phoneNumberPattern.test(contactInfo)) {
        alert('Invalid phone number format. Please use the international format.');
        return;
    }

    if (document.getElementById('autoGeolocation').checked) {
        getLocationAndSubmit(businessName, proprietorName, businessAddress, contactInfo, shopBoardPicture, entryType);
    } else {
        submitForm(businessName, proprietorName, businessAddress, contactInfo, shopBoardPicture, entryType, document.getElementById('geolocation').value);
    }
});

document.getElementById('getGeolocationButton').addEventListener('click', getLocation);
document.getElementById('autoGeolocation').addEventListener('change', function() {
    if (this.checked) {
        getLocation();
        localStorage.setItem('autoGeolocation', 'true');
    } else {
        localStorage.removeItem('autoGeolocation');
        localStorage.removeItem('geolocation');
    }
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
    if (document.getElementById('autoGeolocation').checked) {
        localStorage.setItem('geolocation', geolocation);
    }
}

function getLocationAndSubmit(businessName, proprietorName, businessAddress, contactInfo, shopBoardPicture, entryType) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const geolocation = position.coords.latitude + "," + position.coords.longitude;
            document.getElementById('geolocation').value = geolocation;
            localStorage.setItem('geolocation', geolocation);
            submitForm(businessName, proprietorName, businessAddress, contactInfo, shopBoardPicture, entryType, geolocation);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function submitForm(businessName, proprietorName, businessAddress, contactInfo, shopBoardPicture, entryType, geolocation) {
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
}
