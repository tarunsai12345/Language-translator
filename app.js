const API_URL = "https://lingva.ml/api/v1";
const languages = {
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "de": "German",
    "hi": "Hindi",
    "ja": "Japanese",
    "ko": "Korean",
    "ru": "Russian",
    "zh": "Chinese",
    "ar": "Arabic",
    "pt": "Portuguese",
    "tr": "Turkish"
};

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");
const translateBtn = document.getElementById("translateBtn");
const darkModeToggle = document.getElementById("darkModeToggle");
const swapBtn = document.getElementById("swapBtn");

function translateLang() {
    for (let code in languages) {
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");
        option1.value = option2.value = code;
        option1.textContent = option2.textContent = languages[code];
        sourceLang.appendChild(option1);
        targetLang.appendChild(option2);
    }
    sourceLang.value = "en";
    targetLang.value = "es";
}

translateBtn.addEventListener("click", async () => {
    const from = sourceLang.value;
    const to = targetLang.value;
    const text = inputText.value.trim();
    if (!text) return outputText.textContent = "Please enter some text.";
    try {
        const response = await fetch(`${API_URL}/${from}/${to}/${encodeURIComponent(text)}`);
        const data = await response.json();
        outputText.textContent = data.translation;
    } catch (err) {
        outputText.textContent = "Translation failed. Try again later.";
        console.error(err);
    }
});

swapBtn.addEventListener("click", () => {
    const temp = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = temp;
});

if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
});
translateLang();