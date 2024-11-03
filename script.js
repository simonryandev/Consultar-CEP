function consultarCEP() {
    const cep = document.getElementById('cepInput').value;

    document.getElementById('resultado').innerHTML = '';

    if (cep.length !== 8 || isNaN(cep)) {
        document.getElementById('resultado').innerHTML = 'CEP inválido'; 
        return; 
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json()) 
        .then(data => {
            if (data.erro) {
                document.getElementById('resultado').innerHTML = 'CEP não encontrado'; 
            } else {
                const endereco = `
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                `;
                document.getElementById('resultado').innerHTML = endereco; 
            }
        })
        .catch(error => {
            console.error('Erro ao consultar CEP:', error);
            document.getElementById('resultado').innerHTML = 'Ocorreu um erro ao consultar o CEP';
        });
}
