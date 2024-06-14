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
    question: 'Questão: Qual é o nome da estrutura anatômica que conecta o músculo ao osso?',
    answers: [
      {
        answer: 'Tendão',
        correct: true,
      },
      {
        answer: 'Ligamento',
        correct: false,
      },
      {
        answer: 'Cartilagem',
        correct: false,
      },
    ],
  },
  {
    question: 'Onde ocorre a absorção primária de nutrientes no sistema digestivo?',
    answers: [
      {
        answer: 'Estômago',
        correct: false,
      },
      {
        answer: 'Intestino grosso',
        correct: false,
      },
      {
        answer: 'Intestino delgado',
        correct: true,
      },
    ],
  },
  {
    question: 'Onde são produzidos os glóbulos vermelhos?',
    answers: [
      {
        answer: 'Medula óssea',
        correct: true,
      },
      {
        answer: 'Fígado',
        correct: false,
      },
      {
        answer: 'Baço',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é o nome da estrutura anatômica que conecta a faringe à traquéia?',
    answers: [
      {
        answer: 'Laringe',
        correct: false,
      },
      {
        answer: 'Esôfago',
        correct: true,
      },
      {
        answer: 'Epiglote',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é a função principal do sistema cardiovascular?',
    answers: [
      {
        answer: 'Produção de hormônios.',
        correct: false,
      },
      {
        answer: 'Transporte de nutrientes e oxigênio para as células',
        correct: true,
      },
      {
        answer: 'Controle do equilíbrio ácido-base',
        correct: false,
      },
    ],
  },
  {
    question: 'Onde estão localizados os rins no corpo humano?',
    answers: [
      {
        answer: 'No abdômen, abaixo do diafragma',
        correct: false,
      },
      {
        answer: 'Na cavidade torácica, atrás dos pulmões',
        correct: false,
      },
      {
        answer: 'No abdômen, ao lado da coluna vertebral',
        correct: true,
      },
    ],
  },
  {
    question: 'Qual é a função principal do sistema nervoso autônomo?',
    answers: [
      {
        answer: 'Controlar os movimentos voluntários do corpo',
        correct: false,
      },
      {
        answer: 'Regular funções involuntárias, como respiração e frequência cardíaca',
        correct: true,
      },
      {
        answer: 'Transmitir informações sensoriais ao cérebro',
        correct: false,
      },
    ],
  },
  {
    question: 'O que é a diabetes mellitus tipo 2?',
    answers: [
      {
        answer: 'Uma condição na qual o corpo não produz insulina suficiente',
        correct: false,
      },
      {
        answer: 'Uma condição na qual o corpo não responde adequadamente à insulina',
        correct: true,
      },
      {
        answer: 'Uma condição na qual o corpo produz insulina em excesso',
        correct: false,
      },
    ],
  },
  {
    question: 'Onde estão localizados os principais órgãos do sistema respiratório?',
    answers: [
      {
        answer: 'No abdômen',
        correct: false,
      },
      {
        answer: 'Na cabeça',
        correct: false,
      },
      {
        answer: 'No tórax',
        correct: true,
      },
    ],
  },
  {
    question: 'Qual é a função principal do sistema respiratório humano?',
    answers: [
      {
        answer: 'Troca de gases',
        correct: true,
      },
      {
        answer: 'Produção de hormônios',
        correct: false,
      },
      {
        answer: 'Transporte de nutrientes',
        correct: false,
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
