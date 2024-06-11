// declaração de variáveis
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
  {
    question: 'O que caracteriza a ética profissional?',
    answers: [
      {
        answer: 'Um conjunto de princípios morais que guiam o comportamento no ambiente de trabalho',
        correct: true,
      },
      {
        answer: 'Um conjunto de regras impostas por superiores',
        correct: false,
      },
      {
        answer: 'A busca pelo lucro a qualquer custo',
        correct: false,
      },
    ],
  },
  {
    question: 'Por que é importante promover a diversidade no local de trabalho?',
    answers: [
      {
        answer: 'Para criar um ambiente monótono',
        correct: false,
      },
      {
        answer: 'Para aumentar a competição entre os funcionários',
        correct: false,
      },
      {
        answer: 'Para obter diferentes perspectivas e experiências, promovendo a inovação e a criatividade',
        correct: true,
      },
    ],
  },
  {
    question: 'O que é assédio moral no ambiente de trabalho?',
    answers: [
      {
        answer: 'Uma forma de elogio constante aos colegas',
        correct: false,
      },
      {
        answer: 'Um comportamento abusivo, humilhante ou intimidador que afeta negativamente a dignidade e integridade emocional dos trabalhadores',
        correct: true,
      },
      {
        answer: 'Uma estratégia de liderança eficaz',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é o papel das habilidades interpessoais no ambiente profissional?',
    answers: [
      {
        answer: 'Promover a competição entre os colegas',
        correct: false,
      },
      {
        answer: 'Hyperlink Text Transfer Protocol',
        correct: false,
      },
      {
        answer: 'Hypertext Transfer Protocol',
        correct: true,
      },
    ],
  },
  {
    question: 'O que é um "firewall" em relação à segurança da informação?',
    answers: [
      {
        answer: 'Um tipo de software de edição de imagens',
        correct: false,
      },
      {
        answer: 'Uma medida de segurança de rede',
        correct: true,
      },
      {
        answer: 'Um tipo de hardware de armazenamento',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual dos seguintes NÃO é um tipo de armazenamento de dados?',
    answers: [
      {
        answer: 'Disco rígido (Hard Disk Drive - HDD)',
        correct: false,
      },
      {
        answer: 'Memória ROM (Read-Only Memory)',
        correct: false,
      },
      {
        answer: 'Processador (CPU)',
        correct: true,
      },
    ],
  },
  {
    question: 'O que é um "spam" em relação ao correio eletrônico?',
    answers: [
      {
        answer: 'Um tipo de mensagem indesejada',
        correct: true,
      },
      {
        answer: 'Um tipo de vírus',
        correct: false,
      },
      {
        answer: 'Um tipo de protocolo de segurança',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é a função principal de um navegador da web?',
    answers: [
      {
        answer: 'Criar apresentações de slides',
        correct: false,
      },
      {
        answer: 'Navegar na Internet e exibir páginas da web',
        correct: true,
      },
      {
        answer: 'Reproduzir vídeos e imagens',
        correct: false,
      },
    ],
  },
  {
    question: 'O que é a "nuvem" (cloud computing) em computação?',
    answers: [
      {
        answer: 'Um modelo de computação que permite acesso remoto a recursos de computação e armazenamento',
        correct: true,
      },
      {
        answer: 'Um tipo de software que pode ser instalado em computadores e celulares',
        correct: false,
      },
      {
        answer: 'Um modelo de computação que permite apenas o acesso remoto a recursos de armazenamento',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual dos seguintes NÃO é um tipo de arquivo de imagem comum?',
    answers: [
      {
        answer: '.GIF',
        correct: false,
      },
      {
        answer: '.JPEG',
        correct: false,
      },
      {
        answer: '.PDF',
        correct: true,
      },
    ],
  },
];

// substituição do quizz para a primeira pergunta
function init() {
  // criar primeira pergunta
  createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
  // limpar questão anterior
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  // alterar texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // inserir alternativas
  questions[i].answers.forEach((answer, i) => {
    // cria template botão quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    // inserir evento click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  // incrementar o número da questão
  actualQuestion++;
}

// verificar resposta do usuário
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answerBox.querySelectorAll('button');

  // verifica se resposta correta e add classe
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      // checa se usuário acertou a pergunta
      if (btn === button) {
        // incremento dos pontos
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  // exibir próxima pergunta
  nextQuestion();
}

// exibe a pŕoxima pergunta no quizz
function nextQuestion() {
  // timer para usuário ver as respostas
  setTimeout(function () {
    // verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1200);
}

// exibe a tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // trocar dados tela de sucesso
  // calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  //alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

// mostra ou esonde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// reiniciar quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  //zerar jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// inicialização do quizz
init();
