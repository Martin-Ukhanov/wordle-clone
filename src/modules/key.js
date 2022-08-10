const createKey = (value) => {
  let status;

  const getValue = () => value;

  const getStatus = () => status;
  const setStatus = (newStatus) => {
    status = newStatus;
  };

  return { getValue, getStatus, setStatus };
};

export default createKey;
