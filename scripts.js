document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const businessName = document.getElementById('businessName').value;
    const proprietorName = document.getElementById('proprietorName').value;
    const businessAddress = document.getElementById('businessAddress').value;
    const contactInfo = document.getElementById('contactInfo').value;
    const shopBoardPicture = document.getElementById('shopBoardPicture').files[0];
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
            geolocation: geolocation
        };

        fetch('https://script.google.com/macros/s/AKfycbzRcV0MlkH0Fm2zDMG610uWrPbb4CdET_ZDn0Cm4iACzJbZgRsLrkZbGvyXsnLQOJFpIQ/exec', {
            method: 'POST',
            body: JSON.stringify(formData)
        }).then(response => response.json())
          .then(data => {
              console.log(data);
          }).catch(error => {
              console.error('Error:', error);
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
