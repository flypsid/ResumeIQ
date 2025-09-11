import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 49
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="resume-summary mb-4">
      <div className="category flex flex-col sm:flex-row sm:gap-2 items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex flex-row gap-2 items-center justify-center mb-2 sm:mb-0">
          <p className="text-lg sm:text-2xl font-medium">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-xl sm:text-2xl font-bold">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full p-4 sm:p-6">
      {/* Title and description section */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          Your Resume Score
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          This score is calculated based on the variables listed below.
        </p>
      </div>

      {/* Score gauge section */}
      <div className="flex justify-center mb-6">
        <ScoreGauge score={feedback.overallScore} />
      </div>

      {/* Categories section */}
      <div className="space-y-3">
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </div>
    </div>
  );
};
export default Summary;
