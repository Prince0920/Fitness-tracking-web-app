export const calculateBMI = (weight, height) => {
  const bmi = (weight / (height * 0.3048) ** 2).toFixed(2); // Convert height from feet to meters
  return bmi;
};

export const calculateExpectedAge = (bmi, age) => {
  let expectedAge;
  if (bmi < 18.5) {
    expectedAge = age + 5;
  } else if (bmi >= 18.5 && bmi < 25) {
    expectedAge = age + 10;
  } else if (bmi >= 25 && bmi < 30) {
    expectedAge = age + 2;
  } else {
    expectedAge = age - 5;
  }
  return expectedAge;
};

export const calculateBMICategory = bmi => {
  let category;
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 25) {
    category = 'Normal weight';
  } else if (bmi < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }
  return category;
};
