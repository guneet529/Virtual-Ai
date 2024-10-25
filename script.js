let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by GD Sir");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        openWindow("https://youtube.com/");
    } else if (message.includes("open google") || message.includes("google")) {
        speak("Opening Google...");
        openWindow("https://google.com/");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        openWindow("https://facebook.com/");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        openWindow("https://instagram.com/");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        openWindow("https://web.whatsapp.com/");
    } else if (message.includes("open calculator")) {
        speak("Sorry, I can't open the calculator in the browser.");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("Today's date is " + date);
    } else {
        let finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
        openWindow(`https://www.google.com/search?q=${message}`);
    }
}

function openWindow(url) {
    // Ensure the window.open happens directly after user interaction
    setTimeout(() => {
        window.open(url, "_blank");
    }, 100); // Small delay to allow speech to finish before opening
}
