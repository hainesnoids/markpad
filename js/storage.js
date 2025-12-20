function saveToLocalStorage(source = 'auto') {
    const textInput = document.querySelector('.text-input');
    syncIcon.innerHTML = 'cloud_sync';
    try {
        localStorage.setItem('saved-document', textInput.value);
        syncIcon.innerHTML = 'cloud_done';
        if (source === 'button') {
            Alert('Saved document to local storage.');
        }
    } catch(err) {
        syncIcon.innerHTML = 'cloud_error';
    }
    setTimeout(() => { syncIcon.innerHTML = 'cloud_upload' }, 3000);
}
function loadFromLocalStorage() {
    this.syncIcon = document.querySelector('.sync-button .material-symbols-outlined');
    const savedData = localStorage.getItem('saved-document');
    if (savedData) {
        //syncIcon.innerHTML = 'download';
        const textInput = document.querySelector('.text-input');
        textInput.value = savedData;
        //syncIcon.innerHTML = 'download_done';
        Alert('Loaded saved document.');
        // setTimeout(() => { syncIcon.innerHTML = 'cloud_upload' }, 3000);
    } else {
        // do nothing, let the sample text load
    }
}
document.addEventListener('DOMContentLoaded', () => {
    this.syncIcon = document.querySelector('.sync-button .material-symbols-outlined');
})