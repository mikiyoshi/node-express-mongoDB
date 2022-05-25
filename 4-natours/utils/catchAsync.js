// Implement
// ESLint Error
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
// arrow-body-style Error
// https://eslint.org/docs/rules/arrow-body-style
// { "requireReturnForObjectLiteral": true } // add at .eslintrc.json
// or
// module.exports = (fn) => (req, res, next) => {
//   fn(req, res, next).catch(next);
// };
