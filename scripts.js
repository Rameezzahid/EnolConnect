document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const businessName = document.getElementById('businessName').value;
    const proprietorName = document.getElementById('proprietorName').value;
    const businessAddress = document.getElementById('businessAddress').value;
    const contactInfo = document.getElementById('contactInfo').value;
    const shopBoardPicture = document.getElementById('shopBoardPicture').files[0];
    const geolocation = document.getElementById('geolocation').value;
    
    const formData = new FormData();
    formData.append('businessName', businessName);
    formData.append('proprietorName', proprietorName);
    formData.append('businessAddress', businessAddress);
    formData.append('contactInfo', contactInfo);
    formData.append('shopBoardPicture', shopBoardPicture);
    formData.append('geolocation', geolocation);

    fetch('<YOUR_GOOGLE_APPS_SCRIPT_URL>', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          console.log(data);
      }).catch(error => {
          console.error('Error:', error);
      });
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
