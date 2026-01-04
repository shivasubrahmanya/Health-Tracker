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

      <div className="mood-section">
        <h4 className="section-header">Today's Mood</h4>
        <div className="mood-content">
          <div className="mood-emoji-animated">{moodEmoji}</div>
          <div className="mood-status">{moodStatus}</div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="meals-section">
        <h4 className="section-header">Meals Log</h4>
        <div className="meals-chips-container">
          {meals ? (
            meals.split(/,|\n/).map((m, i) => (
              m.trim() && <span key={i} className="meal-chip">{m.trim()}</span>
            ))
          ) : (
            <span className="no-data-text">No meals recorded yet.</span>
          )}
        </div>
      </div>

    </div>
  );
};

export default MoodMealsCard;
