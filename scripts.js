document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    const form = document.getElementById('leadForm');
    if (!form) {
        console.error('Form element not found!');
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submission started');

        const businessName = document.getElementById('businessName').value;
        const proprietorName = document.getElementById('proprietorName').value;
        const businessAddress = document.getElementById('businessAddress').value;
        const contactInfo = document.getElementById('contactInfo').value;
        const shopBoardPicture = document.getElementById('shopBoardPicture').files[0];
        const entryType = document.querySelector('input[name="entryType"]:checked').value;

        console.log('Form values:', {
            businessName,
            proprietorName,
            businessAddress,
            contactInfo,
            shopBoardPicture,
            entryType
        });

        const phoneNumberPattern = /^\+\d{1,3}\d{7,14}$/;
        if (!phoneNumberPattern.test(contactInfo)) {
            alert('Invalid phone number format. Please use the international format.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function() {
            const formData = {
                businessName: businessName,
                proprietorName: proprietorName,
                businessAddress: businessAddress,
                contactInfo: contactInfo,
                shopBoardPicture: reader.result.split(',')[1],  // Base64 string
                shopBoardPictureType: shopBoardPicture.type,
                shopBoardPictureName: shopBoardPicture.name,
                entryType: entryType
            };

            console.log("Form data being sent:", formData);

            fetch('https://script.google.com/macros/s/AKfycbyfAS0DLVMy_3G7qXRQGvsT3f4Iy0yJbdG4ejs7TBrSWcrOBNmWyYHwZjx1-NICeVRxmA/exec', {
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
        };

        reader.onerror = function() {
            console.error('FileReader error', reader.error);
        };

        reader.readAsDataURL(shopBoardPicture);
    });
});
