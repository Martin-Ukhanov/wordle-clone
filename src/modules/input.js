import game from './game';

const initInput = () => {
  const deleteKey = document.querySelector('#keyboard .key.delete');
  const enterKey = document.querySelector('#keyboard .key.enter');
  const letterKeys = document.querySelectorAll('#keyboard .key.letter');

  document.addEventListener('keydown', (e) => {
    if (!game.isGameOver()) {
      if (e.key === 'Backspace') {
        game.deleteLetter();
      } else if (e.key === 'Enter') {
        game.enterWord();
      } else if (/^[a-zA-Z]{1}$/.test(e.key)) {
        game.addLetter(e.key.toUpperCase());
      }
    } else {
      game.reset();
    }
  });

  deleteKey.addEventListener('click', () => {
    if (!game.isGameOver()) {
      game.deleteLetter();
    } else {
      game.reset();
    }

    deleteKey.blur();
  });

  enterKey.addEventListener('click', () => {
    if (!game.isGameOver()) {
      game.enterWord();
    } else {
      game.reset();
    }

    enterKey.blur();
  });

  letterKeys.forEach((letterKey) => {
    letterKey.addEventListener('click', () => {
      if (!game.isGameOver()) {
        game.addLetter(letterKey.textContent);
      } else {
        game.reset();
      }

      letterKey.blur();
    });
  });
};

export default initInput;
