// Define QR codes for each stage
let qrCodes = [["A place where computers reside", 1], ["The room of inauguration", 2], ["You come here to play chess", 3], ["You hate the man sitting here", 4], ["You chill here", 5], ["Exit of Audi", 6], ["The hallway of goodness", 7], ["The place where orientation happened", 8], ["You play carrom here", 9], ["Your workshop is here", 10]];

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


function onScanSuccess(decodedText, decodedResult) {
    pauseScan();
    let nextQRIndex = parseInt(getCookie("nextQRIndex"));
    let shuffledOrder = JSON.parse(getCookie("shuffledOrder"));
    if (nextQRIndex == 999) {
        if (decodedText === 'QRCode12') {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle12").hidden = false;
        } else {
            alert("Invalid last scan")
            resumeScan();
        }
    }
    else {
        if (decodedText === 'QRCode1') {
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
        else if (decodedText === 'QRCode2' && shuffledOrder[nextQRIndex][1] === 1) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle2").hidden = false;
        }
        else if (decodedText === 'QRCode3' && shuffledOrder[nextQRIndex][1] === 2) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle3").hidden = false;
        }
        else if (decodedText === 'QRCode4' && shuffledOrder[nextQRIndex][1] === 3) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle4").hidden = false;
        }
        else if (decodedText === 'QRCode5' && shuffledOrder[nextQRIndex][1] === 4) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle5").hidden = false;
        }
        else if (decodedText === 'QRCode6' && shuffledOrder[nextQRIndex][1] === 5) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle6").hidden = false;
        }
        else if (decodedText === 'QRCode7' && shuffledOrder[nextQRIndex][1] === 6) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle7").hidden = false;
        }
        else if (decodedText === 'QRCode8' && shuffledOrder[nextQRIndex][1] === 7) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle8").hidden = false;
        }
        else if (decodedText === 'QRCode9' && shuffledOrder[nextQRIndex][1] === 8) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle9").hidden = false;
        }
        else if (decodedText === 'QRCode10' && shuffledOrder[nextQRIndex][1] === 9) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle10").hidden = false;
        }
        else if (decodedText === 'QRCode11' && shuffledOrder[nextQRIndex][1] === 10) {
            document.getElementById("scanner").hidden = true;
            document.getElementById("riddle11").hidden = false;
        }
        else {
            alert("Invalid qrhi")
            resumeScan();
        }
    }
}


document.querySelector("#btnAnswer1").addEventListener('click', () => {
    if (document.getElementById("text1").value.trim().toLowerCase() == "coin") {
        riddleSolved();
    }
});

document.querySelector("#btnAnswer2").addEventListener('click', () => {
    if (document.getElementById("text2").value.trim().toLowerCase() == "internet") {
        riddleSolved();
    }
});

document.querySelector("#btnAnswer3").addEventListener('click', () => {
    if (document.getElementById("text3").value.trim().toLowerCase() == "calculator") {
        riddleSolved();
    }
});

document.querySelector("#btnAnswer4").addEventListener('click', () => {
    if (document.getElementById("text4").value.trim().toLowerCase() == "python") {
        riddleSolved();
    }
});

document.querySelector("#btnAnswer5").addEventListener('click', () => {
    if (document.getElementById("text5").value.trim().toLowerCase() == "wifi") {
        riddleSolved();
    }
});

document.querySelector("#btnAnswer6").addEventListener('click', () => {
    if (document.getElementById("text6").value.trim().toLowerCase() == "cpu") {
        riddleSolved();
    }
});

document.querySelector("#btnAnswer7").addEventListener('click', () => {
    if (document.getElementById("text7").value.trim().toLowerCase() == "ram") {
        riddleSolved();
    }
});

document.querySelector("#btnAnswer8").addEventListener('click', () => {
    if (document.getElementById("text8").value.trim().toLowerCase() == "website") {
        riddleSolved();
    }
});

document.querySelector("#btnAnswer9").addEventListener('click', () => {
    if (document.getElementById("text9").value.trim().toLowerCase() == "monitor") {
        riddleSolved();
    }
});

document.querySelector("#btnAnswer10").addEventListener('click', () => {
    if (document.getElementById("text10").value.trim().toLowerCase() == "debugger") {
        riddleSolved();
    }
});

document.querySelector("#btnAnswer11").addEventListener('click', () => {
    if (document.getElementById("text11").value.trim().toLowerCase() == "os") {
        riddleSolved();
    }
});

document.querySelector("#btnAnswer12").addEventListener('click', () => {
    if (document.getElementById("text12").value.trim().toLowerCase() == "html") {
        alert("You found the treasure")
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
        document.getElementById("dd").innerHTML = "Final Clue"
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

