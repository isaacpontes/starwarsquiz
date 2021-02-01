import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>
          {db.title}
        </title>
      </Head>
      <QuizContainer>
        <QuizLogo />
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
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}&level=${level}`);
            }}
            >
              <Widget.Input
                id="name"
                placeholder="Me diz aí seu nome :)"
                onChange={(event) => {
                  document.getElementById('name').style.borderColor = db.theme.colors.primary;
                  setName(event.target.value);
                }}
              />
              <Widget.Select
                id="level"
                onChange={(event) => setLevel(event.target.value)}
              >
                <option value="">Em qual nível quer jogar?</option>
                <option value="0">Padawan</option>
                <option value="1">Cavaleiro Jedi</option>
                <option value="2">Mestre Jedi</option>
              </Widget.Select>
              <Widget.Button type="submit" disabled={name.length === 0 || level === ''}>
                Jogar
              </Widget.Button>
            </form>
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
            <h1>Quizes da Galera</h1>

            <ul>
              {db.external.map((externalLink) => {
                const [projectName, githubUser] = externalLink
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={externalLink}>
                    <Widget.Topic
                      href={`/quiz/${projectName}___${githubUser}?name=${name}`}
                      onClick={(event) => {
                        if (name === '') {
                          event.preventDefault();
                          const nameInput = document.getElementById('name');
                          nameInput.placeholder = 'Diz aí seu nome, por favor :)';
                          nameInput.style.borderColor = db.theme.colors.wrong;
                          window.scrollTo(0, 0);
                          document.getElementById('name').focus();
                        }
                      }}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/isaacpontes" />
    </QuizBackground>
  );
}
