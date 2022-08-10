import createKey from './key';

const keyboard = (() => {
  const keys = [
    createKey('Q'),
    createKey('W'),
    createKey('E'),
    createKey('R'),
    createKey('T'),
    createKey('Y'),
    createKey('U'),
    createKey('I'),
    createKey('O'),
    createKey('P'),
    createKey('A'),
    createKey('S'),
    createKey('D'),
    createKey('F'),
    createKey('G'),
    createKey('H'),
    createKey('J'),
    createKey('K'),
    createKey('L'),
    createKey('Z'),
    createKey('X'),
    createKey('C'),
    createKey('V'),
    createKey('B'),
    createKey('N'),
    createKey('M'),
  ];

  const getLength = () => keys.length;

  const getKeyByIndex = (index) => keys[index];
  const getKeyByValue = (value) => keys.find((key) => key.getValue() === value);

  const clear = () => {
    for (let i = 0; i < keys.length; i += 1) {
      keys[i].setStatus('');
    }
  };

  return { getLength, getKeyByIndex, getKeyByValue, clear };
})();

export default keyboard;
