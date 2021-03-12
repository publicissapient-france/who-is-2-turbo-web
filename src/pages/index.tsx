import * as React from 'react';
import { useState } from 'react';
import { Question } from '../components/Question/Question';
import { navigate } from 'gatsby';

const game = [
  {
    picture: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80',
    answers: ['Camron Duggan', 'August Handley', 'Nathan Blackmore', 'Taryn Perry']
  },
  {
    picture: 'https://images.unsplash.com/photo-1500649297466-74794c70acfc?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80',
    answers: ['King Connolly', 'Moses Mccallum', 'Eliot Cartwright', 'Sunil Phelps']
  },
  {
    picture: 'https://images.unsplash.com/photo-1542973748-658653fb3d12?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=666&q=80',
    answers: ['Luis Goff', 'Kelise Hanna', 'Jobe Mata', 'Aimie Navarro']
  },
  {
    picture: 'https://images.unsplash.com/photo-1549068106-b024baf5062d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    answers: ['Huseyin Halliday', 'Cayson Barrera', 'Junior Cherry', 'Derren Howe']
  },
  {
    picture: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=596&q=80',
    answers: ['Latisha Howard', 'Sami Allan', 'Sami Allan', 'Ariadne Lynn']
  }
];

const IndexPage = () => {
  const [position, setPosition] = useState(0);

  const onAnswer = () => {
    if (position < game.length - 1) {
      setPosition(position + 1);
    } else {
      navigate('/end');
    }
  };

  return (
    <main className="p-4 container mx-auto md:max-w-screen-md">
      <Question {...game[position]} onAnswer={onAnswer}/>
    </main>
  );
};

export default IndexPage;
