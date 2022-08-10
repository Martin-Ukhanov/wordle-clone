import createRow from './row';

const board = (() => {
  const rows = [
    createRow(),
    createRow(),
    createRow(),
    createRow(),
    createRow(),
    createRow(),
  ];

  const getLength = () => rows.length;

  const getRow = (index) => rows[index];

  const clear = () => {
    for (let i = 0; i < rows.length; i += 1) {
      rows[i].clear();
    }
  };

  return { getLength, getRow, clear };
})();

export default board;
