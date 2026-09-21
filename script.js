const contactForm = document.getElementById("contactForm");
// connect mongoDB to your project

// const contactBtn = document.querySelector(".contact-btn");
const formMessage = document.getElementById("formMessage"); //"Find the HTML element whose id is formMessage and store it in a JavaScript variable."
// console.log(contactForm);
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // formMessage.textContent = "";
    // formMessage.className = "";

    // const formData = new FormData(contactForm);

    // const name = formData.get("name");
    // const email = formData.get("email");
    // const subject = formData.get("subject");
    // const message = formData.get("message");


    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Show what the user entered
    console.log(name);
    console.log(email);
    console.log(subject);
    console.log(message);


    //Name validation
    if (name.length < 2) {
        formMessage.textContent = "Please enter a valid name.";
        formMessage.className = "error-message" // dynamic classes in JavaScript.
        return;
    }

    // Email validation
    if (!emailPattern.test((email))) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.className = "error-message"
        return;
    }

    //Subject validation
    if (subject.length < 3) {
        formMessage.textContent = "Please enter a valid subject.";
        formMessage.className = "error-message"
        return;
    }

    // Message validation
    if (message.length < 10) {
        formMessage.textContent = "Message must be least 10 characters.";
        formMessage.className = "error-message"
        return;
    }

    //Everything is valid


    // Send data to Express backend
    fetch("http://localhost:5000/api/contact", {
        method: "POST",
        //header tells the server the data I'm sending is JSON
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message
        })
    })
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Something went wrong.");
            }

            return response.json(); //"Take the response and convert its JSON data into a JavaScript object."
        })
        .then(function (data) {  //data is now the actual object returned by the server.

            console.log(data);

            formMessage.textContent = "Message sent successfully!";  // "Js puts this text inside that <p>."
            formMessage.className = "success-message";

            contactForm.reset();
            // Now the success message happens after the server responds successfully.

        })
        .catch(function (error) {   //error is a variable containing information about what went wrong.

            console.error(error);

            formMessage.textContent = "Unable to send your message. Please try again.";
            formMessage.className = "error-message";

        });
});