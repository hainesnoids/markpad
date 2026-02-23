// libDialog by Hainesnoids
// Licensed under the MIT License

let libDialog = {
    'directories': {
        'sounds': 'libdialog/sounds',
        'icons': 'libdialog/img'
    },
    'useLocalFiles': function(stylesheetPresent = true, icons, sounds) {
        this.directories.sounds = sounds;
        this.directories.icons = icons;
        if (stylesheetPresent === true) {
            document.querySelector('.libdialog-default-stylesheet').remove();
        }
    }
}

// Creates a dialog and shows it to the user. This function runs asynchronously and will halt execution until the user chooses a response.
//
// Documentation: https://git.gay/hainesnoids/libdialog#readme
async function showDialog(message = '', type = 'info', title = 'Alert', buttons = [{id: 'ok', text: 'OK'}], audioWasPreloaded = false) {
    // libDialog-specific scripts
    async function playSound(url) {
        const sound = new Audio(url);
        try {
            await sound.play();
            return true;
        } catch(e) {
            return false;
        }
    }

    // create a dialog element from the template
    const template = document.querySelector('#libdialog');
    const dialog = template.content.querySelector('.libdialog-dialog').cloneNode(true);

    // set the information
    const dialogIcon = dialog.querySelector('.libdialog-icon');
    const dialogTitle = dialog.querySelector('.libdialog-title');
    const dialogContent = dialog.querySelector('.libdialog-content');

    dialog.classList.add(`libdialog-type-${type}`);
    dialogIcon.src = `${libDialog.directories.icons}/dialog-${type}.svg`;
    dialogContent.innerHTML = message;
    dialogTitle.innerHTML = title;


    return new Promise(async (resolve) => {
        // add buttons
        const dialogButtonsWrapper = dialog.querySelector('.libdialog-buttons');
        buttons.forEach((item) => {
            const button = document.createElement('button');
            button.classList.add('libdialog-button');
            button.innerHTML = item.text;
            button.onclick = () => dialogRespond(item.id);
            dialogButtonsWrapper.appendChild(button);
        })

        // show the dialog and play the corresponding sound
        document.body.appendChild(dialog);
        dialog.showModal();
        if (audioWasPreloaded) {
            playAudio();
        } else {
            await playSound(`${libDialog.directories.sounds}/dialog-${type}.oga`);
        }

        // return the value from the user
        function dialogRespond(id) {
            dialog.close();
            dialog.remove();
            resolve(id);
        }
    });
}