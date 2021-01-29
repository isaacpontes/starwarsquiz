/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import db from '../db.json';
import AlternativesForm from '../src/components/AlternativesForm';
import QuizContainer from '../src/components/QuizContainer';
import GitHubCorner from '../src/components/GitHubCorner';

const LoadingWidget = () => (
  <Widget>
    <Widget.Header>
      Carregando...
    </Widget.Header>

    <Widget.Content>
      [Desafio do Loading]
    </Widget.Content>
  </Widget>
);

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
        <h1>{question.title}</h1>
        <p>{question.description}</p>
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
                  style={{ display: 'none' }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Widget.Button type="submit" disabled={!hasSelectedAlternative}>
            Confirmar
          </Widget.Button>
          {isQuestionSubmited && isCorrect && <p>CORRETO!</p>}
          {isQuestionSubmited && !isCorrect && <p>INCORRETO!</p>}
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

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  const addResult = (result) => { setResults([...results, result]); };

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
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
    <QuizBackground backgroundImage={db.bg}>
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
