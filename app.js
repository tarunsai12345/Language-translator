const sourceLang = document.getElementById('sourceLang');
const targetLang = document.getElementById('targetLang');
const inputText = document.getElementById('inputText');
const output = document.getElementById('output');
const spinner = document.getElementById('spinner');
const toggleModeBtn = document.getElementById('toggleModeBtn');
const swapBtn = document.getElementById('swapBtn');
let darkMode = false;

const languages = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'ru': 'Russian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese'
};

for (let code in languages) {
    const opt1 = document.createElement('option');
    opt1.value = code;
    opt1.textContent = languages[code];
    sourceLang.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = code;
    opt2.textContent = languages[code];
    targetLang.appendChild(opt2);
}
sourceLang.value = 'en';
targetLang.value = 'es';

swapBtn.addEventListener('click', () => {
    const temp = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = temp;
});

toggleModeBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    toggleModeBtn.textContent = darkMode ? 'Light Mode' : 'Dark Mode';
});

document.getElementById('translateBtn').addEventListener('click', async () => {
    const text = inputText.value.trim();
    if (!text) {
        output.textContent = 'Type something';
        output.classList.add('visible');
        return;
    }
    spinner.style.display = 'block';
    output.classList.remove('visible');
    output.textContent = '';
    try {
        const res = await fetch(`https://lingva.ml/api/v1/${sourceLang.value}/${targetLang.value}/${encodeURIComponent(text)}`);
        const data = await res.json();
        spinner.style.display = 'none';
        output.textContent = data.translation || 'Translation failed.';
        output.classList.add('visible');
    } catch (err) {
        spinner.style.display = 'none';
        output.textContent = 'Error fetching translation.';
        output.classList.add('visible');
    }
});
