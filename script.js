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
    const pixKeyElement = document.querySelector('.activate-button'); // Correção aqui

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
        if (!numberDiv.classList.contains('indisponivel')) {
            if (!numberDiv.classList.contains('selecionado')) {
                numberDiv.classList.add('selecionado');
                selectedNumbers.push(numberDiv.dataset.number);
            } else {
                numberDiv.classList.remove('selecionado');
                selectedNumbers = selectedNumbers.filter(num => num !== numberDiv.dataset.number);
            }
            updateSelectedNumbersText();
        } else {
            limparModal();
            selectedNumbers.push(numberDiv.dataset.number);
            updateSelectedNumbersText();
            modal.style.display = 'block';
        }
        console.log('Selected number:', numberDiv.dataset.number); // Verificar o número selecionado
        console.log('Selected numbers array:', selectedNumbers); // Verificar o array de números selecionados
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
        console.log('Pix button clicked'); // Log para verificar o clique no botão
        generateQRCode();
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

    function generateQRCode() {
        qrContainer.innerHTML = ''; // Limpar QR Code anterior
        console.log('Generating QR Code'); // Log para verificar se a função está sendo chamada
        const qr = new QRious({
            element: qrContainer, // Elemento onde o QR Code será renderizado
            value: `00020126360014BR.GOV.BCB.PIX0114SUA_CHAVE_PIX520400005303986540315.005802BR5916Nayara Felicia de Oliveira Freitas6009Sao Paulo62070503***6304${selectedNumbers.join(',')}`
        });
        qrContainer.style.display = 'block'; // Certifique-se de que o container está sendo exibido
        console.log('QR Code generated'); // Log para verificar se o QR Code foi gerado
    }

    function generateQRCodeFromPixKey() {
        const qrContainer = document.getElementById('qrcode'); // Garantir que o elemento exista
        if (!qrContainer) {
            console.error('O elemento #qrcode não foi encontrado');
            return;
        }
        const pixKey = '00020126360014BR.GOV.BCB.PIX01149314598895204000053039865802BR5916Nayara Felicia de Oliveira Freitas6009Sao Paulo62070503***6304A13F';
        qrContainer.innerHTML = ''; // Limpar QR Code anterior
        console.log('Generating QR Code from Pix Key'); // Log para verificar se a função está sendo chamada
        const qr = new QRious({
            element: qrContainer,
            value: pixKey
        });
        qrContainer.style.display = 'block'; // Certifique-se de que o container está sendo exibido
        console.log('QR Code generated from Pix Key'); // Log para verificar se o QR Code foi gerado
    }

    pixKeyElement.addEventListener('click', () => {
        generateQRCodeFromPixKey();
    });

    function mostrarComprovante() {
        if (nomeInput.value) {
            comprovanteNome.textContent = `Nome: ${nomeInput.value}`;
            comprovanteNumeros.textContent = `Números: ${selectedNumbers.join(', ')}`;
            comprovantePagamento.textContent = `Forma de Pagamento: ${formaPagamento}`;
            comprovanteDiv.style.display = 'block';
        }
        console.log('Comprovante - selectedNumbers:', selectedNumbers); // Verificar array no comprovante
    }

    function salvarSelecao() {
        selectedNumbers.forEach(num => {
            const selectedDiv = document.querySelector(`.number[data-number="${num}"]`);
            selectedDiv.classList.add('indisponivel');
            selectedDiv.classList.remove('selecionado');
        });
        updateSelectedNumbersText(); // Mover atualização aqui
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
        const numeros = comprovanteNumeros.textContent.split('Números: ')[1];
        const nome = nomeInput.value;
        const pagamento = formaPagamento;
        const mensagem = `Comprovante:\nNome: ${nome}\nNúmeros: ${numeros}\nForma de Pagamento: ${pagamento}`;
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    });
});
