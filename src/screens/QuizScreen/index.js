/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import animationData from './animations/loading.json';
import QuizBackground from '../../components/QuizBackground';
import QuizLogo from '../../components/QuizLogo';
import Widget from '../../components/Widget';
import AlternativesForm from '../../components/AlternativesForm';
import QuizContainer from '../../components/QuizContainer';
import GitHubCorner from '../../components/GitHubCorner';

const LoadingWidget = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  return (
    <Widget
      as={motion.section}
      transition={{ delay: 0.4, duration: 0.3 }}
      variants={{
        show: { opacity: 1, y: '0' },
        hidden: { opacity: 0, y: '100%' },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <Lottie
          options={defaultOptions}
          width="200px"
          height="200px"
          className="lottie-container basic"
        />
      </Widget.Content>
    </Widget>
  );
};

const ResultsWidget = ({ results, database }) => {
  const router = useRouter();
  const queryParams = router.query;
  const finalResult = results.filter((result) => result).length;
  let resultImage = 'https://media.giphy.com/media/xHMIDAy1qkzNS/giphy.gif';
  let resultMessage = `Parabéns, ${queryParams.name}! Você chegou até o fim.`;
  switch (queryParams.level) {
    case '0':
      if (finalResult > results.length * 0.6) {
        resultImage = 'https://media.giphy.com/media/l1AsPDzmgSdwDG7v2/giphy.gif';
        resultMessage = `Parabéns, ${queryParams.name}! Parece que você já pode se considerar um jovem padawan.\nAchou este nível fácil demais? Tente então o próximo e veja se seus conhecimentos estão mesmo afiados.`;
      } else {
        resultImage = 'https://media.giphy.com/media/3h2lUwrZKilQKbAK6f/giphy.gif';
        resultMessage = `${queryParams.name}, parece que você ainda tem muito o que aprender antes de se considerar um padawan. Volte quando estiver mais preparado.`;
      }
      break;
    case '1':
      if (finalResult > results.length * 0.6) {
        resultImage = 'https://media.giphy.com/media/xT0xeCRM2c9inORk8E/giphy.gif';
        resultMessage = `Parabéns, ${queryParams.name}! Parece que você já é um verdadeiro cavaleiro jedi.\nSe acha que está preparado, por que não tenta o próximo nível?`;
      } else {
        resultImage = 'https://media.giphy.com/media/3h2lUwrZKilQKbAK6f/giphy.gif';
        resultMessage = `Vejo que você é valente, ${queryParams.name}. Mas infelizmente ainda cedo para que você possa se considerar um cavaleiro jedi.`;
      }
      break;
    default:
      break;
  }

  function refreshPage() {
    window.location.reload(false);
  }

  function goHome() {
    window.location.href = '/';
  }

  return (
    <>
      <Widget
        as={motion.section}
        transition={{ delay: 0.4, duration: 0.3 }}
        variants={{
          show: { opacity: 1, y: '0' },
          hidden: { opacity: 0, y: '100%' },
        }}
        initial="hidden"
        animate="show"
      >
        <Widget.Header>
          <h1>
            {`Seus Resultados, ${queryParams.name}! =D`}
          </h1>
        </Widget.Header>

        <Widget.Image src={resultImage} alt="Imagem de parabéns" />

        <Widget.Content>
          <h3>
            {`Pontuação Final: ${finalResult * 20} pontos`}
          </h3>
          <p>
            {`${resultMessage}`}
          </p>
          <p>
            {`Você acertou ${finalResult} perguntas.`}
          </p>
          <ul>
            {results.map((result, key) => (
              <li>
                {`Pergunta ${key + 1}: ${result === true ? 'Correta' : 'Incorreta'}`}
              </li>
            ))}
          </ul>
          <hr />
          <Widget.Button
            onClick={goHome}
          >
            Voltar ao Início
          </Widget.Button>
          <Widget.Button
            onClick={refreshPage}
          >
            Tentar Novamente
          </Widget.Button>
        </Widget.Content>
      </Widget>
      <Widget
        as={motion.section}
        transition={{ delay: 0.8, duration: 0.3 }}
        variants={{
          show: { opacity: 1, y: '0' },
          hidden: { opacity: 0, y: '100%' },
        }}
        initial="hidden"
        animate="show"
      >
        <Widget.Content>
          <h1>Quer continuar jogando? Dá uma olhada nos quizes da galera :)</h1>

          <ul>
            {database.external.map((externalLink) => {
              const [projectName, githubUser] = externalLink
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('.vercel.app', '')
                .split('.');

              return (
                <li key={externalLink}>
                  <Widget.Topic
                    href={`/quiz/${projectName}___${githubUser}?name=${queryParams.name}`}
                  >
                    {`${githubUser}/${projectName}`}
                  </Widget.Topic>
                </li>
              );
            })}
          </ul>
        </Widget.Content>
      </Widget>
    </>
  );
};

const QuestionWidget = ({
  questionIndex, question, totalQuestions, onSubmit, addResult,
}) => {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasSelectedAlternative = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h1>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h1>
      </Widget.Header>

      <Widget.Image src={question.image} alt="Question Cover" />

      <Widget.Content>
        <h1>
          {question.title}
        </h1>

        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              setIsQuestionSubmited(false);
              addResult(isCorrect);
              onSubmit();
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  checked={isSelected}
                  style={{ display: 'none' }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Widget.Button type="submit" disabled={!hasSelectedAlternative}>
            Confirmar
          </Widget.Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
};

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizScreen({ database }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [results, setResults] = React.useState([]);

  const router = useRouter();
  const queryParams = router.query;

  const questionIndex = currentQuestion;
  let totalQuestions = database.questions.length;
  let question = database.questions[questionIndex];

  if (queryParams.level) {
    totalQuestions = database.questions[queryParams.level].length;
    question = database.questions[queryParams.level][questionIndex];
  }

  const addResult = (result) => { setResults([...results, result]); };

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 3 * 1000);
  }, []);

  const handleQuizSubmit = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  };

  return (
    <QuizBackground backgroundImage={database.bg}>
      <Head>
        <title>Alura Quiz - Pergunta 1</title>
      </Head>
      <QuizContainer>
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <QuizLogo />
          </a>
        </Link>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            questionIndex={questionIndex}
            question={question}
            totalQuestions={totalQuestions}
            onSubmit={handleQuizSubmit}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT
          && <ResultsWidget results={results} database={database} />}

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/isaacpontes" />
    </QuizBackground>
  );
}
