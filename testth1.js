// Define QR codes for each stage
let qrCodes = [["Where the hum of machines fills the air, And problem-solving minds gather there. Find this place if you dare!", 1], ["In this space, ideas take shape, With bright screens and no red tape. Find me to continue the escape.", 2], ["I'm not a room, but I lead to them all, A gathering place, both wide and small. Find me just beyond the hall.", 3], ["I'm not the end, but the start of the way, Where people pause and often stay. Find me where paths convey.", 4], ["I stand tall, I mark the start, The way inside, where journeys chart. Find me where all paths depart.", 5], ["I'm the first to welcome, the last to bid bye, Standing still under the sky. Find me where all must pass by.", 6], ["Lights dim low, and the speakers play, Here's where visuals lead the way. Find me where ideas display.", 7], ["Where sounds and visuals come alive, A space where creativity thrives. Find me where media and ideas live.", 8], ["Not a field, but it holds the gear, For athletes and players who gather here. Find me where the spirit is clear.", 9], ["Rackets, balls, and a game plan too, This is the room for the sporty crew. Find me where fitness comes through.", 10]];

// Function to set a cookie with an expiration in hours
function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); // Hours to milliseconds
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null; // Return null if not found
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const randomIndex = Math.floor(Math.random() * (i + 1));
        // Swap the elements
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

try {
    let nextQRIndex = parseInt(getCookie("nextQRIndex"));
    if (nextQRIndex < qrCodes.length) {
        const clue = JSON.parse(getCookie("shuffledOrder"))[nextQRIndex][0];
        document.getElementById("dd").innerHTML = "Clue for the next location : " + clue + ". You have completed " + (nextQRIndex + 1) + " clues";
    } else if (nextQRIndex === 999) {
        document.getElementById("dd").innerHTML = "Final Clue"
    }
} catch (error) {
    console.log("Start of game");
}

const element = document.querySelector('#body');

function adjustHeight() {
    const viewportHeight = window.innerHeight; // 100vh equivalent
    const contentHeight = element.scrollHeight + 500; // Height of the content
    console.log(viewportHeight, contentHeight)
    element.style.height = `${Math.max(viewportHeight, contentHeight)}px`; // Set the larger of the two
}

// Adjust the height on page load
adjustHeight()

function onScanSuccess(decodedText, decodedResult) {
    pauseScan();
    let nextQRIndex = parseInt(getCookie("nextQRIndex"));
    let shuffledOrder = JSON.parse(getCookie("shuffledOrder"));
    if (nextQRIndex == 999) {
        if (decodedText === 'qrCode12QuadFinal') {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle12").hidden = false;
        } else {
            let errArr = ["Oops! This QR Code is invalid or corrupted. But don't worry, join us tomorrow at Fiestron for more exciting events!", "Error: Unable to read this QR Code. However, come visit Fiestron tomorrow for our next amazing event!", "Invalid QR Code. It seems something went wrong. But the fun doesn't stop here—join us at Fiestron tomorrow for more!", "Unable to scan this QR Code. But the adventure continues—head over to Fiestron tomorrow for more fantastic events!", "Whoops! Something went wrong with this QR Code. Visit us tomorrow at Fiestron for even more exciting activities!", "This QR Code seems invalid. Don’t miss out though—come join us tomorrow at Fiestron for more events!", "Scan failed. The QR Code didn’t work, but there's plenty more fun ahead. Join us tomorrow at Fiestron!", "This QR Code isn’t valid. But stay tuned for more! Join us tomorrow at Fiestron for exciting new events."]
            alert(errArr[Math.floor(Math.random() * errArr.length)]);
            resumeScan();
        }
    }
    else {
        if (decodedText === 'qrcode1quadpopeye') {
            if (nextQRIndex) {
                alert("Invalid QR");
            } else {
                const shuffledOrderArray = shuffleArray(qrCodes);
                setCookie("shuffledOrder", JSON.stringify(shuffledOrderArray), 3);
                setCookie("nextQRIndex", "-1", 3);
                document.getElementById("scanner").hidden = true;
                document.getElementById("riddle1").hidden = false;
                nextQRIndex = getCookie("nextQRIndex");
                shuffledOrder = JSON.parse(getCookie("shuffledOrder"));
                document.getElementById("data1").innerHTML = shuffledOrder + " | " + nextQRIndex;
            }
        }
        else if (decodedText === 'qrCode2cslabxoxo' && shuffledOrder[nextQRIndex][1] === 1) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle2").hidden = false;
        }
        else if (decodedText === 'qrCode3cslabrpop' && shuffledOrder[nextQRIndex][1] === 2) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle3").hidden = false;
        }
        else if (decodedText === 'qrCode4foyermom' && shuffledOrder[nextQRIndex][1] === 3) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle4").hidden = false;
        }
        else if (decodedText === 'qrCode5foyercode' && shuffledOrder[nextQRIndex][1] === 4) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle5").hidden = false;
        }
        else if (decodedText === 'qrCode6gateagain' && shuffledOrder[nextQRIndex][1] === 5) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle6").hidden = false;
        }
        else if (decodedText === 'qrCode7gatewalebhai' && shuffledOrder[nextQRIndex][1] === 6) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle7").hidden = false;
        }
        else if (decodedText === 'qrcode8mmragain' && shuffledOrder[nextQRIndex][1] === 7) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle8").hidden = false;
        }
        else if (decodedText === 'QRCode9mmrbro' && shuffledOrder[nextQRIndex][1] === 8) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle9").hidden = false;
        }
        else if (decodedText === 'QRCode10sportsRoombhai' && shuffledOrder[nextQRIndex][1] === 9) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle10").hidden = false;
        }
        else if (decodedText === 'QRCode11againsportsRoom' && shuffledOrder[nextQRIndex][1] === 10) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle11").hidden = false;
        }
        else {
            let errArr = ["Oops! This QR Code is invalid or corrupted. But don't worry, join us tomorrow at Fiestron for more exciting events!", "Error: Unable to read this QR Code. However, come visit Fiestron tomorrow for our next amazing event!", "Invalid QR Code. It seems something went wrong. But the fun doesn't stop here—join us at Fiestron tomorrow for more!", "Unable to scan this QR Code. But the adventure continues—head over to Fiestron tomorrow for more fantastic events!", "Whoops! Something went wrong with this QR Code. Visit us tomorrow at Fiestron for even more exciting activities!", "This QR Code seems invalid. Don’t miss out though—come join us tomorrow at Fiestron for more events!", "Scan failed. The QR Code didn’t work, but there's plenty more fun ahead. Join us tomorrow at Fiestron!", "This QR Code isn’t valid. But stay tuned for more! Join us tomorrow at Fiestron for exciting new events."]
            alert(errArr[Math.floor(Math.random() * errArr.length)]);
            resumeScan();
        }
    }
}


document.querySelector("#btnAnswer1").addEventListener('click', () => {
    if (document.getElementById("text1").value.trim().toLowerCase() == "ratatouille") {
        riddleSolved();
    } else {
        showAlert("This answer is incorrect")
    }
});

document.querySelector("#btnAnswer2").addEventListener('click', () => {
    if (document.getElementById("text2").value.trim().toLowerCase() == "harry potter") {
        riddleSolved();
    } else {
        showAlert("This answer is incorrect")
    }
});

document.querySelector("#btnAnswer3").addEventListener('click', () => {
    if (document.getElementById("text3").value.trim().toLowerCase() == "modern family") {
        riddleSolved();
    } else {
        showAlert("This answer is incorrect")
    }
});

document.querySelector("#btnAnswer4").addEventListener('click', () => {
    if (document.getElementById("text4").value.trim().toLowerCase() == "keyboard") {
        riddleSolved();
    } else {
        showAlert("This answer is incorrect")
    }
});

document.querySelector("#btnAnswer5").addEventListener('click', () => {
    if (document.getElementById("text5").value.trim().toLowerCase() == "krusty krab") {
        riddleSolved();
    } else {
        showAlert("This answer is incorrect")
    }
});

document.querySelector("#btnAnswer6").addEventListener('click', () => {
    if (document.getElementById("text6").value.trim().toLowerCase() == "chatur") {
        riddleSolved();
    } else {
        showAlert("This answer is incorrect")
    }
});

document.querySelector("#btnAnswer7").addEventListener('click', () => {
    if (document.getElementById("text7").value.trim().toLowerCase() == "tees maar khan") {
        riddleSolved();
    } else {
        showAlert("This answer is incorrect")
    }
});

document.querySelector("#btnAnswer8").addEventListener('click', () => {
    if (document.getElementById("text8").value.trim().toLowerCase() == "sholay") {
        riddleSolved();
    } else {
        showAlert("This answer is incorrect")
    }
});

document.querySelector("#btnAnswer9").addEventListener('click', () => {
    if (document.getElementById("text9").value.trim().toLowerCase() == "age") {
        riddleSolved();
    } else {
        showAlert("This answer is incorrect")
    }
});

document.querySelector("#btnAnswer10").addEventListener('click', () => {
    if (document.getElementById("text10").value.trim().toLowerCase() == "coin") {
        riddleSolved();
    } else {
        showAlert("This answer is incorrect")
    }
});

document.querySelector("#btnAnswer11").addEventListener('click', () => {
    if (document.getElementById("text11").value.trim().toLowerCase() == "envelope") {
        riddleSolved();
    } else {
        showAlert("This answer is incorrect")
    }
});

document.querySelector("#btnAnswer12").addEventListener('click', () => {
    if (document.getElementById("text12").value.trim().toLowerCase() == "c") {
        alert("You found the treasure, meet the event head immeditately")
    } else {
        showAlert("This answer is incorrect")
    }
});

function riddleSolved() {
    let nextQRIndex = parseInt(getCookie("nextQRIndex")) + 1;
    if (nextQRIndex == qrCodes.length) {
        nextQRIndex = 999;
    }
    if (nextQRIndex < qrCodes.length) {
        const clue = JSON.parse(getCookie("shuffledOrder"))[nextQRIndex][0];
        document.getElementById("dd").innerHTML = "Clue for the next location : " + clue + ". You have completed " + (nextQRIndex + 1) + " clues";
    } else if (nextQRIndex === 999) {
        document.getElementById("dd").innerHTML = "Open skies and paths align, A meeting spot both grand and fine. Find me where the campus does shine."
    }
    resumeScan();
    setCookie("nextQRIndex", nextQRIndex, 3);
    document.getElementById("scanner").hidden = false;
    document.getElementById("riddle1").hidden = true;
    document.getElementById("riddle2").hidden = true;
    document.getElementById("riddle3").hidden = true;
    document.getElementById("riddle4").hidden = true;
    document.getElementById("riddle5").hidden = true;
    document.getElementById("riddle6").hidden = true;
    document.getElementById("riddle7").hidden = true;
    document.getElementById("riddle8").hidden = true;
    document.getElementById("riddle9").hidden = true;
    document.getElementById("riddle10").hidden = true;
    document.getElementById("riddle11").hidden = true;
    document.getElementById("riddle12").hidden = true;
}


// Add event listener to the clear button
document.getElementById('clearButton').addEventListener('dblclick', function () {
    document.cookie = "nextQRIndex=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "shuffledOrder=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload(); // Reload to reset the application state
});

// Initialize QR code scanner
let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", {
    fps: 10,
    qrbox: {
        width: 250,
        height: 250
    }
},
    false
);

// Add pause and resume methods
function pauseScan(freeze = true) {
    const state = html5QrcodeScanner.getState();
    if (state === Html5QrcodeScannerState.SCANNING) {
        html5QrcodeScanner.pause(freeze);
    }
}

function resumeScan() {
    const state = html5QrcodeScanner.getState();
    if (state === Html5QrcodeScannerState.PAUSED) {
        html5QrcodeScanner.resume();
    }
}

// Render the scanner with success and failure callbacks
html5QrcodeScanner.render(onScanSuccess);

// Function to display Bootstrap alert with fading effect
function showAlert(message, type = 'danger') {
    // Create alert element
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show');
    alertElement.setAttribute('role', 'alert');
    alertElement.innerHTML = `${message} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;

    // Append alert to container
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.appendChild(alertElement);

    // Fade out the alert after 7.5 seconds
    setTimeout(() => {
        alertElement.classList.remove('show');
        setTimeout(() => {
            alertElement.remove();
        }, 1250); // Fade out duration is 1.25 seconds
    }, 7500); // Alert stays visible for 7.5 seconds
}
