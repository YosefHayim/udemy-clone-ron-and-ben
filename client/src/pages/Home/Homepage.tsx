import Menu from '@/components/Menu/Menu';
import Banner from './Banner/Banner';
import TrustedBySection from './TrustedBySection/TrustedBySection';
import LearnersAreViewing from './LearnersAreViewing/LearnersAreViewing';
import SearchResult from './SearchResult/SearchResult';
import LearningGoals from './LearningGoals/LearningGoals';
import PlansSection from './PansSection/PansSection';
import Testimonials from './Testimonials/Testimonials';
import TrendsReport from './TopTrends/TopTrends';
import TrendingNow from './TrendingNow/TrendingNow';
import Carousel from './Carousel/Carousel';
import Sections from './Sections/Sections';
import Welcome from '@/components/LoggedInHome/Welcome';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useMediaQuery } from 'react-responsive';
import { searchAlgoLocalStorage } from '@/utils/searchesOfUser';
import LetsStartLearning from './LetsStartLearning/LetsStartLearning';

const Homepage = () => {
  const isMobile = useMediaQuery({ maxWidth: 800 });
  searchAlgoLocalStorage('');

  document.title = 'Online Courses - Learn Anything, On Your Schedule | Udemy';
  const cookie = useSelector((state: RootState) => state.user.cookie);

  useEffect(() => {}, [cookie]);

  return (
    <div>
      {!isMobile && cookie && <Menu />}
      <div className="font-[lifeLtstd]">
        {!cookie ? (
          <div className="w-full">
            <Banner isLogin={false} />
            <div>
              <Sections />
              <TrustedBySection />
              <LearnersAreViewing />
              <SearchResult />
              <LearningGoals />
              <PlansSection />
              <Testimonials />
              <TrendsReport />
              <TrendingNow />
              <Carousel />
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex flex-col  gap-4 px-24 py-8">
              <Welcome />
              <Banner isLogin={true} />
              <LetsStartLearning />
              <h1 className="pl-4 font-extrabold">What to learn next</h1>
              <SearchResult />
              <SearchResult />
              <LearnersAreViewing />
              <SearchResult title="Short and sweet courses for you" />
              <SearchResult title="Top courses in Design" />
              <SearchResult title="Top courses in Development" />
              <SearchResult title="Top courses in IT & Software" />
              <SearchResult title="Top courses in Personal Development" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
