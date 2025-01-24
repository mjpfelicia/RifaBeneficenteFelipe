document.addEventListener('DOMContentLoaded', () => {
    const numberContainer = document.getElementById('numberContainer');
    const modal = document.getElementById('comprovanteModal');
    const closeModal = document.querySelector('.close');
    const selectedNumbersText = document.getElementById('selectedNumbers');
    const qrContainer = document.getElementById('qrcode');
    const pixButton = document.getElementById('pixButton');
    const dinheiroButton = document.getElementById('dinheiroButton');
    const pagarDepoisButton = document.getElementById('pagarDepoisButton');
    const nomeInput = document.getElementById('nomeInput');
    const comprovanteDiv = document.getElementById('comprovante');
    const comprovanteNome = document.getElementById('comprovanteNome');
    const comprovanteNumeros = document.getElementById('comprovanteNumeros');
    const comprovantePagamento = document.getElementById('comprovantePagamento');
    const whatsappButton = document.getElementById('whatsappButton');
    const finalizarCompraButton = document.getElementById('finalizarCompraButton');

    let selectedNumbers = [];
    let formaPagamento;

    for (let i = 1; i <= 50; i++) {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'number';
        numberDiv.dataset.number = i;
        numberDiv.textContent = i;
        numberDiv.addEventListener('click', () => selectNumber(numberDiv));
        numberContainer.appendChild(numberDiv);
    }

    function selectNumber(numberDiv) {
        if (numberDiv.classList.contains('indisponivel')) {
            alert('Este número está indisponível.');
            return;
        }

        if (!numberDiv.classList.contains('selecionado')) {
            numberDiv.classList.add('selecionado');
            selectedNumbers.push(numberDiv.dataset.number);
        } else {
            numberDiv.classList.remove('selecionado');
            selectedNumbers = selectedNumbers.filter(num => num !== numberDiv.dataset.number);
        }
        updateSelectedNumbersText();
        console.log('Selected number:', numberDiv.dataset.number);
        console.log('Selected numbers array:', selectedNumbers);
    }

    function updateSelectedNumbersText() {
        selectedNumbersText.textContent = `Números Selecionados: ${selectedNumbers.join(', ')}`;
        finalizarCompraButton.style.display = selectedNumbers.length > 0 ? 'block' : 'none';
    }

    finalizarCompraButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    pixButton.addEventListener('click', () => {
        formaPagamento = 'Pix';
        console.log('Pix button clicked');
        qrContainer.style.display = 'none';
        mostrarComprovante();
        salvarSelecao();
    });

    dinheiroButton.addEventListener('click', () => {
        formaPagamento = 'Dinheiro';
        qrContainer.style.display = 'none';
        alert('Por favor, entregue o valor em dinheiro à Nayara Felicia de Oliveira Freitas.');
        mostrarComprovante();
        salvarSelecao();
    });

    pagarDepoisButton.addEventListener('click', () => {
        formaPagamento = 'Pagar Depois';
        qrContainer.style.display = 'none';
        alert('Você escolheu pagar depois. Guarde esta informação.');
        mostrarComprovante();
        salvarSelecao();
    });

    function mostrarComprovante() {
        if (nomeInput.value) {
            comprovanteNome.textContent = `Nome: ${nomeInput.value}`;
            comprovanteNumeros.textContent = `Números: ${selectedNumbers.join(', ')}`;
            comprovantePagamento.textContent = `Forma de Pagamento: ${formaPagamento}`;
            comprovanteDiv.style.display = 'block';
            console.log('Comprovante gerado com sucesso');
        } else {
            alert('Por favor, preencha o nome.');
        }
    }

    function salvarSelecao() {
        selectedNumbers.forEach(num => {
            const selectedDiv = document.querySelector(`.number[data-number="${num}"]`);
            selectedDiv.classList.add('indisponivel');
            selectedDiv.classList.remove('selecionado');
        });
        updateSelectedNumbersText();
    }

    function limparModal() {
        selectedNumbers = [];
        updateSelectedNumbersText();
        nomeInput.value = '';
        comprovanteDiv.style.display = 'none';
        qrContainer.innerHTML = '';
        qrContainer.style.display = 'none';
    }

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    whatsappButton.addEventListener('click', () => {
        const numeros = selectedNumbers.join(', ');
        const nome = nomeInput.value;
        const pagamento = formaPagamento;
        const mensagem = `Obrigado por participar da nossa rifa solidária!:\nNome:${nome}\nNúmeros:${numeros}\nForma de Pagamento:${pagamento}\nBoa sorte!🍀 Agradecemos o seu apoio!`;
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    });
});
