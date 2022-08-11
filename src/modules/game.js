import board from './board';
import keyboard from './keyboard';
import DOM from './DOM';
import { validWords, targetWords } from './words';

const game = (() => {
  let targetWord = targetWords[Math.floor(Math.random() * targetWords.length)];
  let currentRowIndex = 0;
  let currentTileIndex = 0;
  let gameOver = false;

  const setTargetWord = () => {
    targetWord = targetWords[Math.floor(Math.random() * targetWords.length)];
  };

  const addLetter = (letter) => {
    const currentRow = board.getRow(currentRowIndex);

    if (!currentRow.isFilled()) {
      currentRow.getTile(currentTileIndex).setValue(letter);
      currentTileIndex += 1;

      DOM.displayBoard();
      DOM.popTile(currentRowIndex, currentTileIndex - 1);
    }

    DOM.popKey(letter);
  };

  const deleteLetter = () => {
    const currentRow = board.getRow(currentRowIndex);

    if (!currentRow.isEmpty()) {
      currentTileIndex -= 1;
      currentRow.getTile(currentTileIndex).setValue(undefined);

      DOM.displayBoard();
    }

    DOM.popKey('delete');
  };

  const enterWord = () => {
    const currentRow = board.getRow(currentRowIndex);

    if (currentRow.isFilled()) {
      if (validWords.includes(currentRow.getValue())) {
        // Update status of each tile
        for (let i = 0; i < targetWord.length; i += 1) {
          const currentTile = currentRow.getTile(i);

          if (currentTile.getValue() === targetWord.charAt(i)) {
            const key = keyboard.getKeyByValue(currentTile.getValue());

            currentTile.setStatus('correct');
            key.setStatus('correct');

            // Check for any previous tiles with the same value that have a present status
            for (let j = i; j >= 0; j -= 1) {
              const previousTile = currentRow.getTile(j);

              if (
                previousTile.getValue() === currentTile.getValue() &&
                previousTile.getStatus() === 'present'
              ) {
                let newStatus = 'absent';

                // Check if the previous tile should stay present
                for (let k = 0; k < targetWord.length; k += 1) {
                  if (k !== j && k !== i) {
                    if (targetWord.charAt(k) === previousTile.getValue()) {
                      newStatus = 'present';
                      break;
                    }
                  }
                }

                previousTile.setStatus(newStatus);
                key.setStatus(newStatus);
                break;
              }
            }
          } else {
            let rowLetterCount = 1;

            // Check how many previous tiles have the same value
            for (let j = i - 1; j >= 0; j -= 1) {
              if (currentRow.getTile(j).getValue() === currentTile.getValue()) {
                rowLetterCount += 1;
              }
            }

            let targetWordLetterCount = 0;

            // Check if there are at least rowLetterCount letters in the target word
            for (let j = 0; j < targetWord.length; j += 1) {
              if (targetWord.charAt(j) === currentTile.getValue()) {
                targetWordLetterCount += 1;

                if (targetWordLetterCount === rowLetterCount) {
                  const key = keyboard.getKeyByValue(currentTile.getValue());

                  currentTile.setStatus('present');

                  if (key.getStatus() !== 'correct') {
                    key.setStatus('present');
                  }
                  break;
                }
              }
            }

            if (targetWordLetterCount < rowLetterCount) {
              const key = keyboard.getKeyByValue(currentTile.getValue());

              currentTile.setStatus('absent');
              key.setStatus('absent');

              // Check for any previous tiles with the same value that have an absent or correct status
              for (let j = i - 1; j >= 0; j -= 1) {
                const previousTile = currentRow.getTile(j);

                if (previousTile.getValue() === currentTile.getValue()) {
                  if (previousTile.getStatus() === 'correct') {
                    key.setStatus('correct');
                  } else if (previousTile.getStatus() === 'present') {
                    key.setStatus('present');
                    break;
                  }
                }
              }
            }
          }
        }

        DOM.displayBoard();
        DOM.displayKeyboard();

        DOM.popRow(currentRowIndex);

        // Check win
        if (currentRow.getValue() === targetWord) {
          // Win
          DOM.displayMessage('YOU WIN, PRESS ANY KEY', false);
          gameOver = true;
        } else if (currentRowIndex < board.getLength() - 1) {
          // Next row
          currentRowIndex += 1;
          currentTileIndex = 0;
        } else {
          // Lose
          DOM.displayMessage(`${targetWord}, PRESS ANY KEY`, false);
          gameOver = true;
        }
      } else {
        // Invalid word
        DOM.shakeRow(currentRowIndex);
        DOM.displayMessage('INVALID WORD', true);
      }
    } else {
      // Not enough letters
      DOM.shakeRow(currentRowIndex);
      DOM.displayMessage('NOT ENOUGH LETTERS', true);
    }

    DOM.popKey('enter');
  };

  const isGameOver = () => gameOver;

  const reset = () => {
    board.clear();
    keyboard.clear();
    setTargetWord();
    currentRowIndex = 0;
    currentTileIndex = 0;
    DOM.reset();
    gameOver = false;
  };

  return {
    setTargetWord,
    addLetter,
    deleteLetter,
    enterWord,
    isGameOver,
    reset,
  };
})();

export default game;
