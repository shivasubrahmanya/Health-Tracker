interface Props {
  moodEmoji?: string;
  moodStatus?: string;
  meals?: string;
}

const MoodMealsCard = ({
  moodEmoji = "😊",
  moodStatus = "Happy",
  meals = "No meals logged"
}: Props) => {
  return (
    <div className="glass-card mood-card">
      <div className="mood-title">Mood & Meals</div>
      <div className="mood-emoji">{moodEmoji}</div>
      <div className="mood-status">{moodStatus}</div>

      <div className="mood-meals-box">
        {meals.split(/,|\n/).map((m, i) => (
          <div key={i} className="mood-meals-line">{m.trim()}</div>
        ))}
      </div>
    </div>
  );
};

export default MoodMealsCard;
