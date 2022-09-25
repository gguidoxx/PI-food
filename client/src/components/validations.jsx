export const Validations = (input) => {
  let errors = {};

  if (!input.title) {
    errors.title = "WE NEED TO KNOW WHAT IS THE NAME";
  }

  if (input.title >= 50) {
    errors.title = "MAX 50 CHARACTERS";
  }

  if (input.title.search(/^[a-zA-Zñáéíóúü]*$/)) {
    errors.title = "ONLY LETTERS";
  }

  if (!input.summary) {
    errors.summary = "TELL US ABOUT YOUR CREATION";
  }

  if (input.summary.length >= 500) {
    errors.summary = "TOO MUCH: MAX 500 CHARACTERS";
  }

  if (!input.healthScore) {
    errors.healthScore = "UR RECIPE IS HEALTHY? PLEASE SELECT HOW HEALTHY IS";
  }
  if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = "WOW! REALLY? SELECT BETWEEN 1 - 100";
  }

  if (!input.steps.length) {
    errors.steps = "HOW TO COCK THIS MEAL";
  }

  if (input.steps.length >= 200) {
    errors.steps = "SO COMPLICATE? PLEASE SUMMARIZES THIS";
  }

  if (input.diets.length === 0) {
    errors.diets =
      "U DONT KNOW WHAT TYPE DIETS HAVE YOUR CREATION? SO BAD, PLEASE SELECT ONE OR MORE";
  }
  console.log("INPUT DIETS VALIDACION",input.diets)
  return errors;
};
