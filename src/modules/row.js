import createTile from './tile';

const createRow = () => {
  const tiles = [
    createTile(),
    createTile(),
    createTile(),
    createTile(),
    createTile(),
  ];

  const getLength = () => tiles.length;

  const getTile = (index) => tiles[index];

  const getValue = () => {
    let value = '';
    for (let i = 0; i < tiles.length; i += 1) {
      value += tiles[i].getValue();
    }
    return value;
  };

  const isEmpty = () => {
    for (let i = 0; i < tiles.length; i += 1) {
      if (tiles[i].getValue() !== '') return false;
    }
    return true;
  };

  const isFilled = () => {
    for (let i = 0; i < tiles.length; i += 1) {
      if (tiles[i].getValue() === '') return false;
    }
    return true;
  };

  const clear = () => {
    for (let i = 0; i < tiles.length; i += 1) {
      tiles[i].setValue('');
      tiles[i].setStatus('');
    }
  };

  return {
    getLength,
    getTile,
    getValue,
    isEmpty,
    isFilled,
    clear,
  };
};

export default createRow;
