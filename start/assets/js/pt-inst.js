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
    question: 'Por que é importante uma comunicação clara entre os profissionais  de saúde em um ambiente hospitalar?',
    answers: [
      {
        answer: 'Para evitar o contato com pacientes',
        correct: false,
      },
      {
        answer: 'Para garantir a segurança e o bem-estar dos pacientes',
        correct: true,
      },
      {
        answer: 'Para reduzir o tempo gasto nas reuniões de equipe',
        correct: false,
      },
    ],
  },
  {
    question: 'Quais são os elementos essenciais de um relatório de enfermagem?',
    answers: [
      {
        answer: 'Identificação do paciente, diagnóstico médico, plano de tratamento',
        correct: false,
      },
      {
        answer: 'Evolução do quadro clínico, medicações administradas, horário das visitas',
        correct: true,
      },
      {
        answer: 'N.D.A',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é o propósito principal da linguagem técnica em relatórios de enfermagem?',
    answers: [
      {
        answer: 'Simplificar a comunicação entre profissionais de saúde',
        correct: true,
      },
      {
        answer: 'Cumprir formalidades burocráticas',
        correct: false,
      },
      {
        answer: 'Dificultar o acesso às informações para leigos',
        correct: false,
      },
    ],
  },
  {
    question: 'Por que a compreensão de terminologia médica é crucial para a     interpretação precisa de documentos técnicos em enfermagem?',
    answers: [
      {
        answer: 'Para garantir a confidencialidade das informações',
        correct: false,
      },
      {
        answer: 'Para evitar a necessidade de consultas adicionais',
        correct: false,
      },
      {
        answer: 'Para evitar erros de interpretação que possam afetar o tratamento do paciente',
        correct: true,
      },
    ],
  },
  {
    question: 'Qual é a função dos apêndices em um prontuário médico?',
    answers: [
      {
        answer: 'Fornecer informações adicionais sobre o medicamento',
        correct: false,
      },
      {
        answer: 'Armazenar dados irrelevantes para a prática clínica',
        correct: false,
      },
      {
        answer: 'N. D. A.',
        correct: true,
      },
    ],
  },
  {
    question: 'Por que a revisão cuidadosa de abreviações e siglas é essencial na interpretação de documentos médicos?',
    answers: [
      {
        answer: 'Para aumentar o volume de informações',
        correct: false,
      },
      {
        answer: 'Para facilitar a compreensão em diferentes contextos',
        correct: false,
      },
      {
        answer: 'Para evitar equívocos que possam comprometer o tratamento do paciente',
        correct: true,
      },
    ],
  },
  {
    question: 'Como a estruturação adequada de um relatório de enfermagem pode influenciar a eficiência da equipe médica?',
    answers: [
      {
        answer: 'Aumentando o número de páginas para incluir mais detalhes',
        correct: false,
      },
      {
        answer: 'Facilitando a localização rápida de informações essenciais',
        correct: true,
      },
      {
        answer: 'Limitando o acesso aos dados apenas aos membros da equipe de enfermagem',
        correct: false,
      },
    ],
  },
  {
    question: 'Durante a assistência ao paciente em estado crítico, o técnico em enfermagem priorizou a verificação ____ para avaliar a eficácia da intervenção terapêutica.',
    answers: [
      {
        answer: 'do nível de glicose no sangue',
        correct: false,
      },
      {
        answer: 'da saturação de oxigênio',
        correct: true,
      },
      {
        answer: 'da pressão parcial de dióxido de carbono no sangue arterial',
        correct: false,
      },
    ],
  },
  {
    question: 'Após a realização da coleta de sangue, o técnico em enfermagem seguiu os protocolos de biossegurança e descartou corretamente as ____ utilizadas.',
    answers: [
      {
        answer: 'seringas e agulhas',
        correct: true,
      },
      {
        answer: 'luvas e algodão',
        correct: false,
      },
      {
        answer: 'toucas e aventais',
        correct: false,
      },
    ],
  },
  {
    question: 'Ao preparar o paciente para a cirurgia, o técnico em enfermagem auxiliou na ____ do local da incisão, seguindo as orientações do cirurgião.',
    answers: [
      {
        answer: 'dricotomia',
        correct: false,
      },
      {
        answer: 'desinfecção',
        correct: false,
      },
      {
        answer: 'N. D. A.',
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
