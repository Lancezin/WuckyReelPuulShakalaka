'use strict';

// Banco de palavras: substantivos separados por gênero e número para manter a concordância.
const verbs = [
  { word: 'Roube' }, { word: 'Pesque' }, { word: 'Construa' }, { word: 'Encontre' },
  { word: 'Desbloqueie' }, { word: 'Proteja' }, { word: 'Persiga' }, { word: 'Domine' },
  { word: 'Compre' }, { word: 'Venda' }, { word: 'Adote' }, { word: 'Resgate' },
  { word: 'Invoque' }, { word: 'Cace' }, { word: 'Capture' }, { word: 'Plante' },
  { word: 'Destrua' }, { word: 'Escale' }, { word: 'Alimente' }, { word: 'Treine' },
  { word: 'Lance' }, { word: 'Esconda' }, { word: 'Cozinhe' }, { word: 'Transforme' },
  { word: 'Entregue' }, { word: 'Colecione' }, { word: 'Salve' }, { word: 'Carregue' },
  { word: 'Atravesse' }, { word: 'Pilote' }, { word: 'Monte' }, { word: 'Pinte' },
  { word: 'Acorde' }, { word: 'Conquiste' }, { word: 'Derrote' }, { word: 'Abra' },
  { word: 'Feche' }, { word: 'Decore' }, { word: 'Exploda' }, { word: 'Reforme' },
  { word: 'Clone' }, { word: 'Crie' }, { word: 'Empilhe' }, { word: 'Jogue' },
  { word: 'Arremesse' }, { word: 'Reprograme' }, { word: 'Conserte' }, { word: 'Hipnotize' },
  { word: 'Imite' }, { word: 'Contrate' }, { word: 'Assuste' }, { word: 'Engula' },
  { word: 'Desenhe' }, { word: 'Fotografe' }, { word: 'Persiga' }, { word: 'Investigue' },
  { word: 'Sabote' }, { word: 'Organize' }, { word: 'Sobrecarregue' }, { word: 'Personalize' },
  { word: 'Fabrique' }, { word: 'Descubra' }, { word: 'Recupere' }, { word: 'Roube' },
  { word: 'Cure' }, { word: 'Enfeitice' }, { word: 'Ressuscite' }, { word: 'Evolua' },
  { word: 'Derreta' }, { word: 'Congele' }, { word: 'Invente' }, { word: 'Troque' },
  { word: 'Empurre' }, { word: 'Puxe' }, { word: 'Esmague' }, { word: 'Pule' },
  { word: 'Siga' }, { word: 'Alcance' }, { word: 'Desvie' }, { word: 'Alugue' },
  { word: 'Decifre' }, { word: 'Hackeie' }, { word: 'Programe' }, { word: 'Convoque' },
  { word: 'Desenterre' }, { word: 'Encolha' }, { word: 'Amplie' }, { word: 'Pastoreie' },
  { word: 'Domestique' }, { word: 'Lidere' }, { word: 'Governe' }, { word: 'Saboreie' },
  { word: 'Fuja', prep: 'de' }, { word: 'Corra', prep: 'para' }, { word: 'Viaje', prep: 'para' },
  { word: 'Escape', prep: 'de' }, { word: 'Mergulhe', prep: 'em' }, { word: 'Se esconda', prep: 'em' },
  { word: 'Dance', prep: 'com' }, { word: 'Negocie', prep: 'com' }, { word: 'Converse', prep: 'com' },
  { word: 'Troque', prep: 'por' }, { word: 'Aposte', prep: 'em' }, { word: 'Entre', prep: 'em' },
  { word: 'Saia', prep: 'de' }, { word: 'Lute', prep: 'contra' }, { word: 'Acampe', prep: 'em' },
  { word: 'More', prep: 'em' }, { word: 'Durma', prep: 'em' }, { word: 'Pule', prep: 'sobre' },
  { word: 'Voe', prep: 'até' }, { word: 'Passe', prep: 'por' }, { word: 'Se aventure', prep: 'em' },
  { word: 'Sobreviva', prep: 'a' }, { word: 'Brigue', prep: 'com' }, { word: 'Case', prep: 'com' },
  { word: 'Se esconda', prep: 'atrás de' }, { word: 'Cuide', prep: 'de' }, { word: 'Desconfie', prep: 'de' }
];

const masculineSingular = [
  'ovo','jardim','catboy','dragão','robô','fantasma','dinossauro','cachorro','gato','peixe','planeta','vulcão','castelo','tesouro','pirata','zumbi','alienígena','cérebro','cogumelo',' hambúrguer'.trim(),
  'controle','computador','celular','abacaxi','tomate','pinguim','tubarão','esqueleto','unicórnio','meme','travesseiro','elevador','ônibus','avião','submarino','foguete','satélite','portal','labirinto','deserto','oceano','vampiro','lobisomem','coelho','macaco','urso','leão','cavalo','porco','frango','queijo','sanduíche','bolo','sorvete','chocolate','picolé','café','suco','refrigerante','microfone','teclado','mouse','monitor','servidor','disquete','cartucho','videogame','controle remoto','ventilador','chuveiro','vaso','tapete','sofá','armário','espelho','quadro','relógio','sapato','chapéu','óculos','capacete','escudo','martelo','machado','arco','tridente','laser','raio','cometa','meteoro','buraco negro','universo','multiverso','reino','império','vilarejo','shopping','mercado','hospital','museu','parque','zoológico','aquário','circo','estádio','aeroporto','túnel','arranha-céu','prédio','apartamento','bunker','abrigo','acampamento','barco','navio','trem','caminhão','trator','tanque','helicóptero','drone','carrinho','skate','patinete','balão','paraquedas','robô gigante','mecha','golem','slime','monstro','chefão','vilão','herói','detetive','cientista','mago','ninja','samurai','cavaleiro','rei','imperador','CEO','influenciador','youtuber','streamer','NPC','noob','tryhard','gamer','bacon','pão','milho','feijão','arroz','macarrão','ovo frito','pastel','coxinha','brigadeiro','pudim','melão','limão','morango','pêssego','coco','pepino','repolho','brócolis','alface','cacto','bonsai','girassol','carvalho','pinheiro','rio','lago','pântano','céu','sol','eclipse','continente','vórtice','buraco','labirinto infinito','andar','botão','interruptor','eletrodoméstico','imposto','boleto','contrato','diploma','troféu','prêmio','token','código','algoritmo','bug','glitch','pixel','mod','servidor de Minecraft','mapa','bioma','inventário','baú','bloco','portal do Nether','Ender Dragon','Creeper','villager','gato de botas','catboy lendário','ovo de ouro','jardim secreto','pato','ganso','peru','flamingo','morcego','escorpião','caranguejo','polvo','camarão','golfinho','tartaruga','jacaré','crocodilo','camaleão','papagaio','corvo','falcão','pavão','elefante','rinoceronte','hipopótamo','camelo','lhama','esquilo','ouriço','guaxinim','texugo','furão','suricato','lêmure','gorila','chimpanzé','orangotango','babuíno','búfalo','bisão','alce','veado','javali','lobo-guará','cachorro-quente','pastel de vento','pote de sorvete','saco de batata','pacote de miojo'
];

const feminineSingular = [
  'casa','lua','aura','maçã','cidade','floresta','ilha','montanha','praia','estrela','galáxia','nave','espada','poção','varinha','princesa','bruxa','fada','sereia','múmia','múmia','vaca','galinha','abelha','borboleta','aranha','formiga','baleia','orca','medusa','água-viva','lontra','capivara','girafa','zebra','raposa','coruja','cobra','lagartixa','iguana','rã','sardinha','piranha','arraia','lagosta','ostra','pérola','concha','âncora','mochila','bolsa','carteira','moeda','nota','cédula','chave','porta','janela','parede','escada','piscina','cama','mesa','cadeira','lâmpada','geladeira','máquina','impressora','câmera','televisão','antena','bateria','pilha','tomada','bicicleta','moto','motocicleta','lamborghini','limusine','carroça','carreta','estrada','rodovia','ponte','passarela','estação','plataforma','fábrica','loja','padaria','farmácia','escola','universidade','biblioteca','igreja','caverna','mina','masmorra','arena','torre','fortaleza','base','fazenda','plantação','horta','árvore','flor','rosa','orquídea','tulipa','margarida','vitória-régia','folha','semente','fruta','banana','laranja','melancia','uva','pera','ameixa','framboesa','cereja','cenoura','batata','cebola','abóbora','mandioca','pipoca','pizza','lasanha','panqueca','tapioca','sopa','salada','salsicha','linguiça','geleia','torta','bolacha','biscoito','bala','paçoca','trufa','nuvem','tempestade','chuva','nevasca','ventania','neblina','sombra','luz','energia','magia','maldição','profecia','missão','aventura','batalha','guerra','paz','vingança','recompensa','fortuna','dívida','ideia','memória','emoção','risada','lágrima','voz','música','melodia','dança','festa','viagem','corrida','competição','simulação','realidade','dimensão','gravidade','explosão','catástrofe','epidemia','pandemia','cura','vacina','fórmula','experiência','pesquisa','teoria','conspiração','sociedade','civilização','monarquia','democracia','ditadura','economia','empresa','startup','marca','propaganda','notícia','fofoca','tendência','internet','rede social','stream','live','conta','senha','mensagem','notificação','atualização','interface','janela do jogo','fase secreta','skin lendária','moeda cósmica','relíquia','armadilha','missão impossível','pizza gigante','gelatina','panela','frigideira','vassoura','esponja','escova','toalha','cortina','fantasia','máscara','peruca','coroa','tiara','pulseira','corrente','guitarra','bateria musical','flauta','harpa','sanfona','melancia quadrada','capivara astronauta','catgirl','catgirl suprema','batata cósmica','geladeira possuída','vaca voadora','galinha de borracha','sogra','avó','tia','professora','diretora','detetive','cientista maluca','rainha','imperatriz','divindade','entidade','criatura','criatura marinha','boneca','marionete','estátua','múmia dançante','salsicha gigante','meia','chinela','pantufa','escova de dentes','pasta de dente','privada','pia','torneira','mangueira','barraca','rede','gangorra','montanha-russa','roda-gigante','casa na árvore','casa mal-assombrada','lua de queijo'
];

const masculinePlural = [
  'ovos','jardins','catboys','dragões','robôs','fantasmas','dinossauros','cachorros','gatos','peixes','planetas','vulcões','castelos','tesouros','piratas','zumbis','alienígenas','cogumelos','hambúrgueres','controles','computadores','celulares','abacaxis','pinguins','tubarões','esqueletos','unicórnios','memes','travesseiros','elevadores','ônibus','aviões','foguetes','satélites','portais','labirintos','vampiros','lobisomens','coelhos','macacos','ursos','leões','cavalos','porcos','frangos','queijos','sanduíches','bolos','sorvetes','chocolates','picolés','microfones','teclados','mouses','monitores','servidores','cartuchos','videogames','ventiladores','sofás','armários','espelhos','relógios','sapatos','chapéus','óculos','capacetes','escudos','martelos','machados','arcos','tridentes','raios','cometas','meteoros','reinos','impérios','vilarejos','mercados','hospitais','museus','parques','aquários','estádios','túneis','prédios','apartamentos','bunkers','barcos','navios','trens','caminhões','tratores','tanques','helicópteros','drones','skates','patinetes','balões','monstros','chefões','vilões','heróis','detetives','cientistas','magos','ninjas','samurais','cavaleiros','reis','imperadores','NPCs','noobs','gamers','bacons','pães','milhos','feijões','arrozes','pastéis','brigadeiros','pudins','limões','morangos','cocos','pepinos','cactos','girassóis','carvalhos','pinheiros','rios','lagos','pântanos','continentes','buracos','andares','botões','interruptores','eletrodomésticos','boletos','contratos','diplomas','troféus','prêmios','tokens','códigos','algoritmos','bugs','glitches','pixels','mods','mapas','biomas','baús','blocos','Creepers','villagers','patos','gansos','perus','morcegos','escorpiões','caranguejos','polvos','camarões','golfinhos','jacarés','crocodilos','papagaios','corvos','elefantes','rinocerontes','hipopótamos','camelos','esquilos','guaxinins','gorilas','chimpanzés','búfalos','bisões','alces','veados','javalis','lobos-guarás','cachorros-quentes','pastéis de vento','potes de sorvete','pacotes de miojo','chinelos'
];

const femininePlural = [
  'casas','luas','auras','maçãs','cidades','florestas','ilhas','montanhas','praias','estrelas','galáxias','naves','espadas','poções','varinhas','princesas','bruxas','fadas','sereias','múmias','vacas','galinhas','abelhas','borboletas','aranhas','formigas','baleias','orcas','medusas','águas-vivas','lontras','capivaras','girafas','zebras','raposas','corujas','águias','cobras','lagartixas','iguanas','rãs','sardinhas','piranhas','arraias','lagostas','ostras','pérolas','conchas','âncoras','mochilas','bolsas','carteiras','moedas','notas','chaves','portas','janelas','paredes','escadas','piscinas','camas','mesas','cadeiras','lâmpadas','geladeiras','máquinas','impressoras','câmeras','televisões','antenas','baterias','pilhas','tomadas','bicicletas','motos','estradas','pontes','estações','plataformas','fábricas','lojas','padarias','farmácias','escolas','universidades','bibliotecas','cavernas','minas','masmorras','arenas','torres','fortalezas','bases','fazendas','plantações','hortas','árvores','flores','rosas','orquídeas','tulipas','margaridas','folhas','sementes','frutas','bananas','laranjas','melancias','uvas','peras','ameixas','cerejas','cenouras','batatas','cebolas','abóboras','pipocas','pizzas','lasanhas','panquecas','tapiocas','sopas','saladas','salsichas','linguiças','geleias','tortas','bolachas','balas','paçocas','trufas','nuvens','tempestades','chuvas','nevascas','ventanias','neblinas','sombras','luzes','energias','magias','maldições','profecias','missões','aventuras','batalhas','guerras','recompensas','fortunas','dívidas','ideias','memórias','emoções','risadas','lágrimas','vozes','músicas','melodias','danças','festas','viagens','corridas','competições','simulações','dimensões','explosões','catástrofes','epidemias','curas','vacinas','fórmulas','experiências','pesquisas','teorias','conspirações','sociedades','civilizações','empresas','startups','marcas','propagandas','notícias','fofocas','tendências','redes sociais','lives','contas','senhas','mensagens','notificações','atualizações','interfaces','fases secretas','skins lendárias','moedas cósmicas','relíquias','armadilhas','panelas','frigideiras','vassouras','esponjas','escovas','toalhas','cortinas','fantasias','máscaras','perucas','coroas','tiaras','pulseiras','correntes','guitarras','flautas','harpas','melancias quadradas','capivaras astronautas','catgirls','batatas cósmicas','geladeiras possuídas','vacas voadoras','galinhas de borracha','sogras','avós','tias','professoras','diretoras','rainhas','imperatrizes','divindades','entidades','criaturas','bonecas','marionetes','estátuas','meias','pantufas','privadas','pias','torneiras','mangueiras','barracas','redes','gangorras','montanhas-russas','rodas-gigantes','casas na árvore','casas mal-assombradas'
];

// As listas podem ser ampliadas diretamente aqui.

const $ = (id) => document.getElementById(id);
const reelEls = {
  verb: { window: $('verb-window'), word: $('verb-word') },
  article: { window: $('article-window'), word: $('article-word') },
  noun: { window: $('noun-window'), word: $('noun-word') }
};
const spinButton = $('spin-button');
const spinLabel = $('spin-label');
const copyButton = $('copy-button');
const resultPhrase = $('result-phrase');
const resultHint = $('result-hint');
const historyList = $('history-list');
const clearHistoryButton = $('clear-history');
const articleMode = $('article-mode');
const toast = $('toast');

let currentResult = null;
let history = [];
let toastTimer = null;

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getAllNouns() {
  return [
    ...masculineSingular.map(word => ({ word, gender: 'm', number: 's' })),
    ...feminineSingular.map(word => ({ word, gender: 'f', number: 's' })),
    ...masculinePlural.map(word => ({ word, gender: 'm', number: 'p' })),
    ...femininePlural.map(word => ({ word, gender: 'f', number: 'p' }))
  ];
}
const allNouns = getAllNouns();

function applyPreposition(article, type, prep) {
  if (!prep) return article;
  const contractions = {
    'de': { o: 'do', a: 'da', um: 'de um', uma: 'de uma', os: 'dos', as: 'das', uns: 'de uns', umas: 'de umas' },
    'em': { o: 'no', a: 'na', um: 'em um', uma: 'em uma', os: 'nos', as: 'nas', uns: 'em uns', umas: 'em umas' },
    'para': { o: 'para o', a: 'para a', um: 'para um', uma: 'para uma', os: 'para os', as: 'para as', uns: 'para uns', umas: 'para umas' },
    'com': { o: 'com o', a: 'com a', um: 'com um', uma: 'com uma', os: 'com os', as: 'com as', uns: 'com uns', umas: 'com umas' },
    'por': { o: 'pelo', a: 'pela', um: 'por um', uma: 'por uma', os: 'pelos', as: 'pelas', uns: 'por uns', umas: 'por umas' },
    'a': { o: 'ao', a: 'à', um: 'a um', uma: 'a uma', os: 'aos', as: 'às', uns: 'a uns', umas: 'a umas' },
    'contra': { o: 'contra o', a: 'contra a', um: 'contra um', uma: 'contra uma', os: 'contra os', as: 'contra as', uns: 'contra uns', umas: 'contra umas' },
    'sobre': { o: 'sobre o', a: 'sobre a', um: 'sobre um', uma: 'sobre uma', os: 'sobre os', as: 'sobre as', uns: 'sobre uns', umas: 'sobre umas' },
    'até': { o: 'até o', a: 'até a', um: 'até um', uma: 'até uma', os: 'até os', as: 'até as', uns: 'até uns', umas: 'até umas' },
    'atrás de': { o: 'atrás do', a: 'atrás da', um: 'atrás de um', uma: 'atrás de uma', os: 'atrás dos', as: 'atrás das', uns: 'atrás de uns', umas: 'atrás de umas' }
  };
  return contractions[prep]?.[article] || `${prep} ${article}`;
}

function createResult() {
  const verb = randomItem(verbs);
  const noun = randomItem(allNouns);
  const mode = articleMode.value;
  const type = mode === 'random' ? (Math.random() < 0.5 ? 'indefinite' : 'definite') : mode;
  const isPlural = noun.number === 'p';
  const baseArticle = noun.gender === 'm'
    ? (isPlural ? (type === 'definite' ? 'os' : 'uns') : (type === 'definite' ? 'o' : 'um'))
    : (isPlural ? (type === 'definite' ? 'as' : 'umas') : (type === 'definite' ? 'a' : 'uma'));
  const article = applyPreposition(baseArticle, type, verb.prep);
  return {
    verb: verb.word,
    article,
    noun: noun.word,
    phrase: `${verb.word} ${article} ${noun.word}`.replace(/\s+/g, ' ').trim(),
    verbObject: verb
  };
}

function pickDifferentResult() {
  let result = createResult();
  if (currentResult && result.phrase === currentResult.phrase) {
    for (let tries = 0; tries < 12 && result.phrase === currentResult.phrase; tries++) result = createResult();
  }
  return result;
}

function startReel(key, finalText, duration, pool) {
  const el = reelEls[key];
  el.window.classList.add('spinning');
  el.window.classList.remove('settled');
  const interval = window.setInterval(() => {
    el.word.textContent = randomItem(pool);
  }, 65);
  return new Promise(resolve => {
    window.setTimeout(() => {
      window.clearInterval(interval);
      el.word.textContent = finalText;
      el.window.classList.remove('spinning');
      el.window.classList.add('settled');
      resolve();
    }, duration);
  });
}

function titleCase(text) {
  return text.charAt(0).toLocaleUpperCase('pt-BR') + text.slice(1);
}

function updateHistory() {
  historyList.innerHTML = '';
  if (history.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-history';
    empty.textContent = 'Suas últimas ideias vão aparecer aqui.';
    historyList.appendChild(empty);
  } else {
    history.forEach((item, index) => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'history-item';
      button.innerHTML = `<span></span><span>USAR IDEIA ↗</span>`;
      button.firstElementChild.textContent = item.phrase;
      button.addEventListener('click', () => restoreResult(item));
      li.appendChild(button);
      historyList.appendChild(li);
    });
  }
  clearHistoryButton.disabled = history.length === 0;
}

function restoreResult(item) {
  currentResult = item;
  reelEls.verb.word.textContent = item.verb;
  reelEls.article.word.textContent = item.article;
  reelEls.noun.word.textContent = item.noun;
  resultPhrase.textContent = titleCase(item.phrase);
  resultHint.textContent = 'Ideia recuperada do seu histórico.';
  copyButton.disabled = false;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2200);
}

async function spin() {
  if (spinButton.disabled) return;
  spinButton.disabled = true;
  copyButton.disabled = true;
  spinLabel.textContent = 'CONSULTANDO A SORTE...';
  resultHint.textContent = 'As palavras estão girando...';

  const result = pickDifferentResult();
  const verbPool = verbs.map(v => v.word);
  const articlePool = ['um', 'uma', 'o', 'a', 'uns', 'umas', 'os', 'as', 'do', 'da', 'no', 'na', 'para o', 'para a'];
  const nounPool = allNouns.map(n => n.word);

  await Promise.all([
    startReel('verb', result.verb, 1350, verbPool),
    startReel('article', result.article, 1770, articlePool),
    startReel('noun', result.noun, 2200, nounPool)
  ]);

  currentResult = result;
  resultPhrase.textContent = titleCase(result.phrase);
  resultHint.textContent = 'Pronto. Agora transforme essa ideia em um jogo!';
  copyButton.disabled = false;
  spinButton.disabled = false;
  spinLabel.textContent = 'SORTEAR OUTRA IDEIA';

  history = [result, ...history.filter(item => item.phrase !== result.phrase)].slice(0, 5);
  updateHistory();
}

async function copyCurrentResult() {
  if (!currentResult) return;
  const text = titleCase(currentResult.phrase);
  try {
    await navigator.clipboard.writeText(text);
    showToast('Ideia copiada para a área de transferência!');
  } catch {
    const fallback = document.createElement('textarea');
    fallback.value = text;
    fallback.setAttribute('readonly', '');
    fallback.style.position = 'fixed';
    fallback.style.opacity = '0';
    document.body.appendChild(fallback);
    fallback.select();
    const copied = document.execCommand('copy');
    fallback.remove();
    showToast(copied ? 'Ideia copiada!' : 'Não foi possível copiar automaticamente.');
  }
}

spinButton.addEventListener('click', spin);
copyButton.addEventListener('click', copyCurrentResult);
clearHistoryButton.addEventListener('click', () => {
  history = [];
  updateHistory();
  showToast('Histórico limpo.');
});

// Mostra o tamanho real do banco de palavras nesta versão.
const combinationEstimate = verbs.length * allNouns.length * 2;
$('word-count').textContent = `+ de ${combinationEstimate.toLocaleString('pt-BR')} combinações possíveis`;
