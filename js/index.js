function parseMarkdown() {
    const textInput = document.querySelector('.text-input').value;
    const parser = new showdown.Converter();
    document.querySelector('.markdown-output').innerHTML = parser.makeHtml(textInput);
}

function main() {
    const textInput = document.querySelector('.text-input');
    textInput.addEventListener('keyup', () => {
        parseMarkdown();
        saveToLocalStorage();
    })
    loadFromLocalStorage();
    parseMarkdown();
}

document.addEventListener('DOMContentLoaded', main);