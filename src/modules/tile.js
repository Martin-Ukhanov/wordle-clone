const createTile = () => {
  let value;
  let status;

  const getValue = () => value;
  const setValue = (newValue) => {
    value = newValue;
  };

  const getStatus = () => status;
  const setStatus = (newStatus) => {
    status = newStatus;
  };

  return { getValue, setValue, getStatus, setStatus };
};

export default createTile;
