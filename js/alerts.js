function Alert(msg) {
    const alertBox = document.querySelector('.alerts');
    const alert = document.createElement('div');
    alert.classList.add('alert');
    const alertMsg = document.createElement('span');
    alertMsg.innerHTML = msg;
    alert.appendChild(alertMsg);
    alertBox.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    },3000);
}
/*document.addEventListener('DOMContentLoaded', () => {
    this.alertBox = document.querySelector('.alerts');
});*/