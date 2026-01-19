export const alertError = (err) => {
  console.warn(err);
  alert(`오류가 발생했습니다.\n\n${err.message || err.code || err}`);
};
