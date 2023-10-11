const container = document.querySelector('#container');
const pesquisa = document.querySelector('#caixa-pesquisa-botao');
const caixaClima = document.querySelector('#caixa-clima');
const detalhesClima = document.querySelector('#detalhes-clima');
const erro404 = document.querySelector('#nao-encontrado');

pesquisa.addEventListener('click', () => {

    const APIKey = '0842c97d1fbb1ce47fae0d09dcde2a33';
    const cidade = document.querySelector('#caixa-pesquisa-input').value;

    if (cidade === '') {
        return;
    }

    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt_br&appid=${APIKey}&units=metric`;
    fetch(endpoint)
        .then(res => res.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                caixaClima.style.display = 'none';
                detalhesClima.style.display = 'none';
                erro404.style.display = 'block';
                erro404.classList.add('fadeIn');
                return;
            }

            erro404.style.display = 'none';
            erro404.classList.remove('fadeIn');

            const imagem = document.querySelector('#caixa-clima-img');
            const temperatura = document.querySelector('#temperatura');
            const descricao = document.querySelector('#descricao');
            const umidade = document.querySelector('#umidade-span');
            const vento = document.querySelector('#vento-span');

            switch (json.weather[0].main) {
                case 'Clear':
                    imagem.src = './assets/img/limpo.png';
                    break;

                case 'Rain':
                    imagem.src = './assets/img/chuvoso.png';
                    break;

                case 'Snow':
                    imagem.src = './assets/img/neve.png';
                    break;

                case 'Clouds':
                    imagem.src = './assets/img/nublado.png';
                    break;

                case 'Haze':
                    imagem.src = './assets/img/vento.png';
                    break;

                default:
                    imagem.src = '';

            }

            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            descricao.innerHTML = `${json.weather[0].description}`;
            umidade.innerHTML = `${json.main.humidity}%`;
            vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            caixaClima.style.display = '';
            detalhesClima.style.display = '';
            caixaClima.classList.add('fadeIn');
            detalhesClima.classList.add('fadeIn');
            container.style.height = '590px';
        });
});