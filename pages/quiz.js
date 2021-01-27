import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import db from '../db.json';
import QuizContainer from '../src/components/QuizContainer';
import GitHubCorner from '../src/components/GitHubCorner';

export default function QuizPage() {
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
        <Widget>
          <Widget.Header>
            <h1>
              {`Pergunta 1 de ${db.questions.length}`}
            </h1>
          </Widget.Header>
          <Widget.Content>
            <h1>{db.questions[0].title}</h1>
            <p>{db.questions[0].description}</p>
            <Widget.Button>
              Confirmar
            </Widget.Button>
          </Widget.Content>
        </Widget>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/isaacpontes" />
    </QuizBackground>
  );
}
