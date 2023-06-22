import './DietSuggestionsCard.css';

export const DietSuggestionsCard = ({ category }) => {
  const getDietSuggestions = category => {
    switch (category) {
      case 'Underweight':
        return (
          <div>
            <div class='tips-container'>
              <h2>Quick Health Tips for Underweight Individuals:</h2>
              <p>1. Increase calorie intake by consuming nutrient-dense foods.</p>
              <p>
                2. Include protein-rich foods like lean meats, poultry, fish, eggs, legumes, and
                dairy products.
              </p>
              <p>3. Add healthy fats to your diet, such as avocados, nuts, seeds, and olive oil.</p>
              <p>4. Eat frequent small meals and snacks throughout the day.</p>
              <p>5. Focus on strength training exercises to build muscle mass.</p>
              <p>6. Stay hydrated by drinking enough water throughout the day.</p>
              <p>7. Get quality sleep to support proper weight gain and overall health.</p>
              <p>
                8. Consult with a healthcare professional or dietitian for personalized guidance.
              </p>
            </div>
            <div class='food-limit-container'>
              <h2>Food items to limit for underweight individuals:</h2>
              <ul>
                <li>Whole Eggs</li>
                <li>Leafy Greens</li>
                <li>Salmon</li>
                <li>Cruciferous Vegetables</li>
                <li>Lean Beef and Chicken Breast</li>
                <li>Boiled Potatoes</li>
                <li>Tuna</li>
                <li>Beans and Legumes</li>
              </ul>
            </div>
          </div>
        );
      case 'Normal weight':
        return 'Maintain a balanced diet with a mix of all essential nutrients. Regular exercise and portion control are recommended.';
      case 'Overweight':
        return 'Focus on a calorie-controlled diet with reduced intake of high-fat and sugary foods. Incorporate regular physical activity for weight management.';
      case 'Obese':
        return (
          <div class='tips-container'>
            <h2>Do's And Dont's While following Diet Plan for Obesity</h2>
            <h3>Avoid these food items if you are following an obesity diet plan:</h3>
            <ul>
              <li>
                Rely on soft drinks, sweetened cereals, cookies and cakes, donuts and pastries,
                chips, and confectionery to get you through the day.
              </li>
              <li>
                Don't skip meals. This will tempt you to snack and DO NOT snack between meals.
              </li>
              <li>Avoid eating quickly. Sit and chew each bite. Try using chopsticks!</li>
              <li>Don't food shop when you're hungry.</li>
              <li>Don't eat more than two or three pieces of fruit per day.</li>
            </ul>

            <h3>Add these food items if you are following an obesity diet plan:</h3>
            <ul>
              <li>Eat more vegetables - add them at every meal.</li>
              <li>Drink plenty of water - you can become hungry when thirsty.</li>
              <li>Try eating off smaller plates so as to eat smaller portions.</li>
              <li>
                Exercise between 30 minutes to one hour each day with moderate exercise - brisk
                walking, team sport, cycling or swimming.
              </li>
              <li>Be mindful of what you put in your mouth and your shopping trolley.</li>
            </ul>
          </div>
        );
      default:
        return '';
    }
  };

  const dietSuggestions = getDietSuggestions(category);

  return (
    <div className='card diet-suggestions-card'>
      <div className='diet-card-container'>
        <h2 className='diet-card-header'>Diet Suggestions</h2>
      </div>

      <div className='diet-card-body'>
        <p>{dietSuggestions}</p>
      </div>
    </div>
  );
};
