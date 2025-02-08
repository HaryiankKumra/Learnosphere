let speechSynthesisUtterance;
let isPlaying = false;
let textQueue = [];
let currentIndex = 0;

// Load PDF
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const typedArray = new Uint8Array(this.result);
            pdfjsLib.getDocument(typedArray).promise.then(pdf => {
                pdf.getPage(1).then(page => {
                    const scale = 1.5;
                    const viewport = page.getViewport({ scale });
                    const canvas = document.getElementById('pdfCanvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    page.render({
                        canvasContext: context,
                        viewport: viewport
                    });

                    // Extract text using OCR
                    extractTextFromCanvas(canvas);
                });
            });
        };
        fileReader.readAsArrayBuffer(file);
    }
});

// Extract Text with OCR
function extractTextFromCanvas(canvas) {
    Tesseract.recognize(
        canvas,
        'eng',
        {
            logger: m => console.log(m)
        }
    ).then(({ data: { text } }) => {
        document.getElementById('ocrText').innerHTML = text;
        textQueue = text.split('. '); // Split into sentences
    });
}

// Text-to-Speech
document.getElementById('playPauseBtn').addEventListener('click', function() {
    if (!isPlaying) {
        playText();
    } else {
        speechSynthesis.pause();
        isPlaying = false;
        this.textContent = '▶ Resume';
    }
});

document.getElementById('stopBtn').addEventListener('click', function() {
    speechSynthesis.cancel();
    isPlaying = false;
    currentIndex = 0;
    document.getElementById('playPauseBtn').textContent = '🔊 Play';
    removeHighlight();
});

document.getElementById('speedControl').addEventListener('input', function() {
    speechSynthesis.cancel();
    playText();
});

function playText() {
    if (currentIndex >= textQueue.length) return;
    
    removeHighlight();

    speechSynthesisUtterance = new SpeechSynthesisUtterance(textQueue[currentIndex]);
    speechSynthesisUtterance.rate = document.getElementById('speedControl').value;
    
    highlightText(currentIndex);
    
    speechSynthesisUtterance.onend = function() {
        currentIndex++;
        if (currentIndex < textQueue.length) {
            playText();
        } else {
            isPlaying = false;
            document.getElementById('playPauseBtn').textContent = '🔊 Play';
        }
    };

    speechSynthesis.speak(speechSynthesisUtterance);
    isPlaying = true;
    document.getElementById('playPauseBtn').textContent = '⏸ Pause';
}

// Highlight Text Being Read
function highlightText(index) {
    const ocrTextDiv = document.getElementById('ocrText');
    const sentences = ocrTextDiv.innerHTML.split('. ');

    sentences[index] = `<span class="highlight">${sentences[index]}</span>`;
    ocrTextDiv.innerHTML = sentences.join('. ');
}

function removeHighlight() {
    const ocrTextDiv = document.getElementById('ocrText');
    ocrTextDiv.innerHTML = ocrTextDiv.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');
}
