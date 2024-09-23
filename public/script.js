TOKEN = "06718c70-62c4-4b73-b48a-0bc914e8d6e5-77c4b6e0-571a-4ff9-bb93-2d98aac9e9e2";
API_KEY = "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"
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Criar um elemento <li> a partir da mensagem e do nome da classe
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    }

    // Enviar requisição para API
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.classList.add("error")
        messageElement.textContent = "Epa! Algo de errado. Tente novamente";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Adiciona a mensagem do usuario na caixa de mensagem
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Exibe "Gerando resposta..." enquanto aguarda uma resposta da API
        const incomingChatLi = createChatLi("Gerando resposta...", "incoming");
        chatbox.appendChild(incomingChatLi);
        generateResponse(incomingChatLi);
    }, 600)
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
sendChatBtn.addEventListener("click", handleChat);



function CNPJValido(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length != 14)
        return false;

    var tamanhoTotal = cnpj.length - 2
    var cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
    var digitosVerificadores = cnpj.substring(tamanhoTotal);
    var soma = 0;
    var pos = tamanhoTotal - 7;
    for (i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitosVerificadores.charAt(0))
        return false;

    tamanhoTotal = tamanhoTotal + 1;
    cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
    soma = 0;
    pos = tamanhoTotal - 7;
    for (i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitosVerificadores.charAt(1))
        return false;

    return true;
}

function CPFValido(cpf) {
    cpf = cpf.replace(/\D+/g, '');
    if (cpf.length !== 11) return false;

    let soma = 0;
    let resto;
    if (/^(\d)\1{10}$/.test(cpf)) return false; // Verifica sequências iguais

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function CPFormat(cpf) {
    var cpfPattern = cpf.replace(/\D/g, '') // Remove qualquer coisa que não seja número
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
        .replace(/(\d{3})(\d)/, '$1-$2')
    return cpfPattern;
}

function CEPFormat(cep) {
    var cepPattern = cep.replace(/\D/g, '') // Remove qualquer coisa que não seja número
        .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona traço após o quinto digito
    return cepPattern;
}

function invalidarCampo(elementoInvalido) {
    elementoInvalido.classList.add("invalido");
    return;
}

function CEPAuto(cep, esp, elemento) {
    const URL_CEP = `https://viacep.com.br/ws/${cep}/json/`;
    const requestCEP = {
        headers: {
            "Authorization": `Bearer ${TOKEN}`
        },
    }
    
    fetch(URL_CEP, requestCEP) // Pega dados da API ViaCep
        .then(response => response.json())
        .then(data => {

            if (data.erro) {
                console.log('CEP não encontrado.');
                invalidarCampo(elemento)
                return false;
            }

            document.getElementById(`${esp}rua`).value = data.logradouro // Substitui valores
            document.getElementById(`${esp}bairro`).value = data.bairro
            document.getElementById(`${esp}municipio`).value = data.localidade
            document.getElementById(`${esp}uf`).value = data.uf
            return true;
        })
        .catch(error => {
            console.log('Erro ao buscar o CEP.');
            console.error('Erro:', error);
            return false;
        });
}

function CNPJFormat(cnpj) {
    var cnpjPattern = cnpj.replace(/\D/g, '') // Remove qualquer coisa que não seja número
        .replace(/(\d{2})(\d)/, '$1.$2') // Adiciona traço após o quinto digito
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona traço após o quinto digito
        .replace(/(\d{3})(\d)/, '$1/$2') // Adiciona traço após o quinto digito
        .replace(/(\d{4})(\d)/, '$1-$2') // Adiciona traço após o quinto digito
    return cnpjPattern;
}

function IEFormat(ie) {
    var iePattern = ie.replace(/\D/g, '') // Remove qualquer coisa que não seja número
        .replace(/(\d{2})(\d)/, '$1.$2') // Adiciona traço após o quinto digito
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona traço após o quinto digito
        .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o quinto digito
    return iePattern;
}

function CNPJAuto(valor) {
    var cnpj = "";
    for (i = 0; i < 18; i++) {
        temp = valor.charAt(i);
        if (!isNaN(temp)) {
            cnpj = cnpj + temp
        }
    }

    fetch(`https://open.cnpja.com/office/${cnpj}`) // Pega dados da API ViaCep
        .then(response => response.json())
        .then(data => {

            if (data.erro) {
                console.log('CNPJ não encontrado.');
                return false;
            }

            document.getElementById('empr').value = data.company.name// Substitui valores
            document.getElementById('ie').value = IEFormat(data.registrations[0].number) // Substitui valores
            document.getElementById('emprrua').value = data.address.street
            document.getElementById('emprbairro').value = data.address.district
            document.getElementById('emprmunicipio').value = data.address.city
            document.getElementById('empruf').value = data.address.state
            document.getElementById('emprcep').value = CEPFormat(data.address.zip)
            document.getElementById('refponto').value = data.address.details
            document.getElementById('tel').value = telFormat(data.phones[0].area + data.phones[0].number)
            return true;
        })
        .catch(error => {
            console.log('Erro ao buscar o CNPJ.');
            console.error('Erro:', error);
            return false;
        });
}

function telFormat(tel) {
    var telPattern = tel.replace(/\D/g, '')
        .replace(/(\d{0})(\d)/, '$1($2') // Adiciona traço após o quinto digito
        .replace(/(\d{2})(\d)/, '$1) $2') // Adiciona traço após o quinto digito
    return telPattern;
}

function selectOnlyThis(id) {
    for (var i = 1; i <= 5; i++) {
        opcao = document.getElementById("ch" + i);
        opcao.checked = false;
        opcao.removeAttribute("required");

    }
    document.getElementById(id).checked = true;
}

document.getElementById('cpf').addEventListener('input', function (e) {
    e.target.classList.remove('invalido');
    var value = e.target.value;
    e.target.value = CPFormat(value);
    if (value.length == 14) {
        if (!CPFValido(value)) invalidarCampo(e.target);
    }
});

// Funções de preenchimento automático, mascaramento e validação do CEP
document.getElementById('cep').addEventListener('input', function (e) {
    e.target.classList.remove('invalido');
    var value = e.target.value;
    e.target.value = CEPFormat(value);

    if (value.length == 9) {
        CEPAuto(value, "", e.target);
    };
});

document.getElementById('cnpj').addEventListener('input', function (e) {
    e.target.classList.remove('invalido');
    var value = e.target.value;
    if (value.length < 15) {
        e.target.value = CPFormat(value);
        if (value.length == 14) {
            CPFValido(value);
        }
    } else {
        e.target.value = CNPJFormat(value);
        if (value.length == 18) {
            if (CNPJValido(value)) {
                if (CNPJAuto(value)) invalidarCampo(e.target);
            } else {
                invalidarCampo(e.target);
            }
        }
    }
});

document.getElementById('ie').addEventListener('input', function (e) {
    var value = e.target.value;
    e.target.value = IEFormat(value);
});

document.getElementById('emprcep').addEventListener('input', function (e) {
    e.target.classList.remove('invalido')
    var value = e.target.value;
    e.target.value = CEPFormat(value)

    if (value.length == 9) {
        CEPAuto(value, "empr", e.target);
    };
});

document.getElementById('tel').addEventListener('input', function (e) {
    var value = e.target.value;
    e.target.value = telFormat(value);
});

let outros = document.getElementById("outros-prod")
document.querySelector('#especificacao').addEventListener('click', event => {
    if (event.target.type === 'checkbox') {
        selectOnlyThis(event.target.id);
        if (event.target.checked == true) {
            if (event.target.value == "outros") {
                outros.style.display = null;
                document.getElementById("text-outros").setAttribute('required', '');
            } else {
                outros.style.display = "none";
                document.getElementById("text-outros").removeAttribute("required");
            }
        } 
    }
});

document.getElementById('classificacao').addEventListener("change", function (e) {
    let espe = document.getElementById("especificacao")
    let outros = document.getElementById("outros-clas")
    espe.style.display = 'none';
    outros.style.display = 'none';

    if (e.target.value == "outros") {
        outros.style.display = null;
        outros.setAttribute('required', '');
    }
    if (e.target.value == "unidade_beneficiamento") {
        espe.style.display = null;
        let opcoes = document.querySelectorAll('input[type="checkbox"]');
        for (let opcao of opcoes) {
            opcao.setAttribute('required', '');
          }
    }
});

document.getElementById('registro').addEventListener('change', function (e) {
    let muni = document.getElementById("sim-registro");
    document.getElementById("reg-municipio").removeAttribute("required");
    muni.style.display = 'none';
    if (e.target.value == "sim") {
        muni.style.display = null;
        document.getElementById("reg-municipio").setAttribute('required', '');
    }
});

document.querySelector('form').onsubmit = e => {
    e.target.reset();
    return false;
 };
