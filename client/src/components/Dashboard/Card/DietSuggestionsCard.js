import './DietSuggestionsCard.css';

export const DietSuggestionsCard = ({ category }) => {
  const getDietSuggestions = category => {
    switch (category) {
      case 'Underweight':
        return 'Eat a balanced diet with sufficient calories to gain weight. Include nutrient-rich foods and focus on strength-building exercises.';
      case 'Normal weight':
        return 'Maintain a balanced diet with a mix of all essential nutrients. Regular exercise and portion control are recommended.';
      case 'Overweight':
        return 'Focus on a calorie-controlled diet with reduced intake of high-fat and sugary foods. Incorporate regular physical activity for weight management.';
      case 'Obese':
        return 'Consult a healthcare professional for a personalized diet and exercise plan to achieve healthy weight loss.';
      default:
        return '';
    }
  };

  const dietSuggestions = getDietSuggestions(category);

  return (
    <div className='card diet-suggestions-card'>
      <div className='diet-card-header'>
        <h3 className='card-title'>Diet Suggestions</h3>
      </div>
      <div className='diet-card-body'>
        <p>{dietSuggestions}</p>
      </div>
    </div>
  );
};
