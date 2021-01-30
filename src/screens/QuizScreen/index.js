/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
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

const ResultsWidget = ({ results }) => (
  <Widget>
    <Widget.Header>
      Resultados
    </Widget.Header>

    <Widget.Content>
      <p>
        {`Você acertou ${results.filter((result) => result).length} perguntas!`}
      </p>
      <ul>
        {results.map((result, key) => (
          <li>
            {`Pergunta ${key + 1}: ${result === true ? 'Correta' : 'Incorreta'}`}
          </li>
        ))}
      </ul>
    </Widget.Content>
  </Widget>
);

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
            }, 3 * 1000);
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
  const totalQuestions = database.questions.length;
  const questionIndex = currentQuestion;
  const question = database.questions[questionIndex];

  const addResult = (result) => { setResults([...results, result]); };

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 2 * 1000);
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

        {screenState === screenStates.RESULT && <ResultsWidget results={results} />}

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/isaacpontes" />
    </QuizBackground>
  );
}
