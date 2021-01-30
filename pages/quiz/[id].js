import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/QuizScreen';

export default function QuizPage({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen database={externalDb} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');

  try {
    const externalDb = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((serverResponse) => {
        if (serverResponse.ok) {
          return serverResponse.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((convertedResponse) => convertedResponse);

    return {
      props: {
        externalDb,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
