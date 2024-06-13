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
        answer: 'Ignorar as diferenças entre os colegas',
        correct: false,
      },
      {
        answer: 'Facilitar a comunicação, a colaboração e o relacionamento positivo entre os membros da equipe',
        correct: true,
      },
    ],
  },
  {
    question: 'Por que a pontualidade é valorizada no ambiente de trabalho?',
    answers: [
      {
        answer: 'Porque demonstra respeito pelo tempo dos outros e contribui para a eficiência e produtividade',
        correct: true,
      },
      {
        answer: 'Porque permite aos funcionários sair mais cedo',
        correct: false,
      },
      {
        answer: 'Porque é uma prática ultrapassada',
        correct: false,
      },
    ],
  },
  {
    question: 'O que é ética corporativa?',
    answers: [
      {
        answer: 'Um conjunto de normas de conduta pessoal',
        correct: false,
      },
      {
        answer: 'A ausência de regras no ambiente de trabalho',
        correct: false,
      },
      {
        answer: 'Um código de conduta estabelecido por uma empresa para orientar o comportamento dos funcionários',
        correct: true,
      },
    ],
  },
  {
    question: 'Qual é a importância do respeito no ambiente profissional?',
    answers: [
      {
        answer: 'Promove um ambiente de trabalho harmonioso, onde as diferenças são valorizadas e os colegas são tratados com dignidade',
        correct: true,
      },
      {
        answer: 'Não tem importância',
        correct: false,
      },
      {
        answer: 'Cria um ambiente competitivo entre os colegas',
        correct: false,
      },
    ],
  },
  {
    question: 'Por que é crucial manter a confidencialidade das informações no local de trabalho?',
    answers: [
      {
        answer: 'Para fofocar sobre os colegas',
        correct: false,
      },
      {
        answer: 'Para proteger a privacidade dos funcionários e a segurança das informações sensíveis da empresa',
        correct: true,
      },
      {
        answer: 'Para aumentar a transparência na organização',
        correct: false,
      },
    ],
  },
  {
    question: 'O que é cultura organizacional?',
    answers: [
      {
        answer: 'A cultura de um país',
        correct: false,
      },
      {
        answer: 'O conjunto de normas de conduta estabelecido pelos funcionários',
        correct: false,
      },
      {
        answer: 'O conjunto de valores, crenças, comportamentos e práticas compartilhadas dentro de uma organização',
        correct: true,
      },
    ],
  },
  {
    question: 'Qual é a importância da comunicação eficaz no ambiente de trabalho?',
    answers: [
      {
        answer: 'Para aumentar a competição entre os funcionários',
        correct: false,
      },
      {
        answer: 'Para manter os colegas desinformados',
        correct: false,
      },
      {
        answer: 'Para evitar conflitos e mal-entendidos, promover a colaboração e a eficiência',
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
