document.addEventListener('DOMContentLoaded', () => {
    const numberContainer = document.getElementById('numberContainer');
    for (let i = 1; i <= 50; i++) {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'number';
        numberDiv.textContent = i;
        numberContainer.appendChild(numberDiv);
    }
});
