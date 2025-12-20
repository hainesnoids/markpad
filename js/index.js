function parseMarkdown() {
    const textInput = document.querySelector('.text-input').value;
    const parser = new showdown.Converter();
    const result = parser.makeHtml(textInput);
    document.querySelector('.markdown-output').innerHTML = result;
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