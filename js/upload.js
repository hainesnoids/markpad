//let preloads = [];

async function uploadDocument() {
    const text = document.querySelector('.text-input').value;
    const response = await fetch("https://phonehome.ws4k.net/api/hastebin", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain" // if the hastebin server correctly uses Content-Type
        },
        body: text
    })
    if (!response.ok) {
        await showDialog(
            await response.text(),
            'error',
            'Could not upload document',
            [{id: 'ok', text: 'OK'}]);
        return
    }
    const json = await response.json();
    return json['key'];
}

function promptDocumentUpload() {
    const documentUploadModal = document.querySelector('.document-upload-dialog');
    documentUploadModal.showModal();
    //preloads[0].play().then();
    fetch('libdialog/img/dialog-question.svg').then();
    loadAudio('libdialog/sounds/dialog-question.oga').then();
    documentUploadModal.addEventListener('click', function(event) {
        let rect = documentUploadModal.getBoundingClientRect();
        let isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            documentUploadModal.close();
        }
    });
}

const audioContext = new AudioContext();
let audioBuffer;

async function loadAudio(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

function playAudio() {
    const soundSource = audioContext.createBufferSource();
    soundSource.buffer = audioBuffer;
    soundSource.connect(audioContext.destination);
    soundSource.start(0);
}

async function uploadDocumentChooseOutcome(outcome) {
    const documentUploadModal = document.querySelector('.document-upload-dialog');
    switch (outcome) {
        case 'disk':

        case 'hastebin':
            documentUploadModal.close();
            const choiceResult = await showDialog(
                'Uploading this document to hastebin will lock the document and prevent any further changes. Upload now?',
                'question',
                'Lock Document',
                [{id: 'yes', text: 'Yes'},{id: 'no', text: 'No'}],
                true);
            if (choiceResult === 'yes') {
                const key = await uploadDocument();
                await showDialog(
                    `${window.location.origin}/?s=${key}`,
                    'positive',
                    'Upload Complete',
                    [{id: 'ok', text: 'OK'}]);
            }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    //preloads.push(new Audio('libdialog/sounds/dialog-warning.oga'));
    const params = new URLSearchParams(window.location.search);
    const shareCode = params.get('s');
    async function faultyDocument(error) {
        await showDialog(
            error,
            'error',
            'Could not load shared document',
            [{id: 'ok', text: 'OK'}]);
    }
    if (shareCode) {
        // inject stylesheet to hide everything useless to read-only documents
        document.querySelector('.text-input').value = 'Loading document';
        parseMarkdown();
        document.body.classList.add('read-only-document');

        // actually do the important stuff
        const response = await fetch(`https://phonehome.ws4k.net/api/hastebin/${shareCode}`);
        const text = await response.text();
        if (!response.ok || text.includes('Document not found')) {
            faultyDocument(text);
            return;
        }
        try {
            const json = JSON.parse(text);
            document.querySelector('.text-input').value = json['data'];
            parseMarkdown();
        } catch(e) {
            faultyDocument(e);
        }
    }
})