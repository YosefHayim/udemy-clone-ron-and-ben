import BubbleBtn from "./BubbleBtn/BubbleBtn";

const ExploreTopics: React.FC<{
  category: string;
  subCategory: string;
  topic: string;
}> = ({ category, subCategory, topic }) => {
  return (
    <div>
      <h2 className="font-bold text-[1.5em] mb-[0.5em]">
        Explore related topics
      </h2>
      <div className="flex flex-row gap-[0.5em]">
        <BubbleBtn similarTopicName={topic} />
        <BubbleBtn similarTopicName={subCategory} />
        <BubbleBtn similarTopicName={category} />
      </div>
    </div>
  );
};

export default ExploreTopics;
