const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }

    function openLink(url) {
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.click();
    }

    function handleCommands(command) {
        if (command.includes("open youtube")) {
            speak("Opening YouTube...");
            setTimeout(() => {
                openLink("https://www.youtube.com");
            }, 1000);
        } else if (command.includes("open facebook")) {
            speak("Opening Facebook...");
            setTimeout(() => {
                openLink("https://www.facebook.com");
            }, 1000);
        } else if (command.includes("open instagram")) {
            speak("Opening Instagram...");
            setTimeout(() => {
                openLink("https://www.instagram.com");
            }, 1000);
        } else {
            speak(`Searching for "${command}"...`);
            setTimeout(() => {
                openLink(`https://www.google.com/search?q=${encodeURIComponent(command)}`);
            }, 1000);
        }
    }

    speak("Hello, how can I help you?");
    recognition.start();

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log("Recognized command:", command);
        handleCommands(command);
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        speak("Sorry, I couldn't understand you.");
    };

    recognition.onspeechend = () => {
        console.log("Speech ended.");
    };
});
