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
    question: 'O que é a farmacologia?',
    answers: [
      {
        answer: 'Estudo dos processos biológicos',
        correct: false,
      },
      {
        answer: 'Estudo dos efeitos dos medicamentos no organismo',
        correct: true,
      },
      {
        answer: 'Estudo das técnicas de diagnóstico médico',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é o principal objetivo da farmacologia clínica?',
    answers: [
      {
        answer: 'Desenvolver novos medicamentos',
        correct: false,
      },
      {
        answer: 'Estudar os efeitos colaterais dos medicamentos',
        correct: false,
      },
      {
        answer: 'Estudar a segurança e eficácia dos medicamentos em pacientes',
        correct: true,
      },
    ],
  },
  {
    question: 'O que é um fármaco?',
    answers: [
      {
        answer: 'Um medicamento',
        correct: true,
      },
      {
        answer: 'Uma substância usada para diagnóstico médico',
        correct: false,
      },
      {
        answer: 'Um dispositivo médico',
        correct: false,
      },
    ],
  },
  {
    question: 'O que é a farmacocinética de um medicamento?',
    answers: [
      {
        answer: 'Estudo dos efeitos colaterais',
        correct: false,
      },
      {
        answer: 'Estudo da interação entre medicamentos',
        correct: false,
      },
      {
        answer: 'Estudo dos processos de absorção, distribuição, metabolismo e excreção de um medicamento no organismo',
        correct: true,
      },
    ],
  },
  {
    question: 'O que são medicamentos de venda livre (OTC)?',
    answers: [
      {
        answer: 'Medicamentos exclusivos para uso hospitalar',
        correct: false,
      },
      {
        answer: 'Medicamentos que podem ser adquiridos sem prescrição médica',
        correct: true,
      },
      {
        answer: 'Medicamentos que exigem prescrição médica',
        correct: false,
      },
    ],
  },
  {
    question: 'O que é um medicamento genérico?',
    answers: [
      {
        answer: 'Um medicamento que não possui marca registrada',
        correct: true,
      },
      {
        answer: 'Um medicamento que contém apenas ingredientes naturais',
        correct: false,
      },
      {
        answer: 'Um medicamento com um nome comercial exclusivo',
        correct: false,
      },
    ],
  },
  {
    question: 'O que é a posologia de um medicamento?',
    answers: [
      {
        answer: 'Estudo dos efeitos terapêuticos',
        correct: false,
      },
      {
        answer: 'Dosagem recomendada e intervalo entre as doses de um medicamento',
        correct: true,
      },
      {
        answer: 'Estudo dos efeitos colaterais de um medicamento',
        correct: false,
      },
    ],
  },
  {
    question: 'O que são interações medicamentosas?',
    answers: [
      {
        answer: 'Reações alérgicas a um medicamento',
        correct: false,
      },
      {
        answer: 'Efeitos secundários de um medicamento',
        correct: false,
      },
      {
        answer: 'Efeitos que ocorrem quando dois ou mais medicamentos são administrados simultaneamente',
        correct: true,
      },
    ],
  },
  {
    question: 'Qual é a via de administração de um medicamento que envolve a introdução do medicamento diretamente no músculo?',
    answers: [
      {
        answer: 'Intravenosa',
        correct: false,
      },
      {
        answer: 'Intramuscular',
        correct: true,
      },
      {
        answer: 'Subcutânea',
        correct: false,
      },
    ],
  },
  {
    question: 'O que é uma reação adversa a um medicamento?',
    answers: [
      {
        answer: 'Uma reação que ocorre em doses terapêuticas e não é desejada',
        correct: true,
      },
      {
        answer: 'Uma reação terapêutica desejada',
        correct: false,
      },
      {
        answer: 'Uma reação alérgica',
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
