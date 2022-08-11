import board from './board';
import keyboard from './keyboard';

const DOM = (() => {
  const displayBoard = () => {
    for (let i = 0; i < board.getLength(); i += 1) {
      const row = board.getRow(i);

      for (let j = 0; j < row.getLength(); j += 1) {
        const tile = row.getTile(j);
        const DOMTile = document.querySelector(
          `#board :nth-child(${i + 1}) :nth-child(${j + 1})`
        );

        if (tile.getValue() !== undefined) {
          DOMTile.textContent = tile.getValue();
          DOMTile.classList.add('filled');
        } else {
          DOMTile.textContent = '';
          DOMTile.classList.remove('filled');
        }

        if (tile.getStatus() !== undefined) {
          DOMTile.classList.add(tile.getStatus());
        }
      }
    }
  };

  const displayKeyboard = () => {
    for (let i = 0; i < keyboard.getLength(); i += 1) {
      const key = keyboard.getKeyByIndex(i);
      const DOMKey = document.querySelector(`#keyboard .key.${key.getValue()}`);

      if (key.getStatus() !== undefined) {
        DOMKey.classList.remove('absent', 'present', 'correct');
        DOMKey.classList.add(key.getStatus());
      }
    }
  };

  const displayMessage = (text, isFade) => {
    const messageContainer = document.getElementById('message-container');
    const message = document.createElement('div');

    message.classList.add('message');
    message.textContent = text;

    messageContainer.innerHTML = '';
    messageContainer.appendChild(message);

    if (isFade) {
      const fade = [{ opacity: 1 }, { opacity: 0 }];
      const fadeTiming = {
        delay: 1500,
        duration: 500,
        iterations: 1,
      };

      message.animate(fade, fadeTiming);
      message.getAnimations()[0].finished.then(() => message.remove());
    }
  };

  const reset = () => {
    // Reset board
    for (let i = 0; i < board.getLength(); i += 1) {
      for (let j = 0; j < board.getRow(i).getLength(); j += 1) {
        const tile = document.querySelector(
          `#board :nth-child(${i + 1}) :nth-child(${j + 1})`
        );

        tile.textContent = '';
        tile.classList.remove('filled', 'absent', 'present', 'correct');
      }
    }

    // Reset keyboard
    for (let i = 0; i < keyboard.getLength(); i += 1) {
      const key = document.querySelector(
        `#keyboard .key.${keyboard.getKeyByIndex(i).getValue()}`
      );

      key.classList.remove('absent', 'present', 'correct');
    }

    // Reset message container
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = '';
  };

  const popTile = (row, col) => {
    const tile = document.querySelector(
      `#board :nth-child(${row + 1}) :nth-child(${col + 1})`
    );
    const pop = [
      { transform: 'scale(1)' },
      { transform: 'scale(1.2)' },
      { transform: 'scale(1)' },
    ];
    const popTiming = {
      duration: 100,
      iterations: 1,
    };

    tile.animate(pop, popTiming);
  };

  const popRow = (index) => {
    const row = document.querySelector(`#board > :nth-child(${index + 1})`);
    const pop = [
      { transform: 'scale(1)' },
      { transform: 'scale(1.1)' },
      { transform: 'scale(1)' },
    ];
    const popTiming = {
      duration: 100,
      iterations: 1,
    };

    row.animate(pop, popTiming);
  };

  const shakeRow = (index) => {
    const row = document.querySelector(`#board > :nth-child(${index + 1})`);
    const shake = [
      { transform: 'translateX(0)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(0)' },
    ];
    const shakeTiming = {
      duration: 200,
      iterations: 1,
    };

    row.animate(shake, shakeTiming);
  };

  const popKey = (value) => {
    const key = document.querySelector(`#keyboard .key.${value}`);
    const pop = [
      { transform: 'scale(1)' },
      { transform: 'scale(1.2)' },
      { transform: 'scale(1)' },
    ];
    const popTiming = {
      duration: 100,
      iterations: 1,
    };

    key.animate(pop, popTiming);
  };

  return {
    displayBoard,
    displayKeyboard,
    displayMessage,
    reset,
    popTile,
    popRow,
    shakeRow,
    popKey,
  };
})();

export default DOM;
