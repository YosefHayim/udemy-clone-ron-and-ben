import Filter from '@/components/Filter/Filter';
import { languages } from '@/utils/languages';
import { useState } from 'react';
import { useContext } from 'react';
import { filterContext } from '@/routes/AppRoutes';

const Subtitles = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const [filterData, setFilterData] = useContext(filterContext);

  return (
    <div>
      <Filter
        filterTitle={'Subtitles'}
        filterItems={languages}
        chosenHeight={'h-[50px]'}
        display={display}
        setDisplay={setDisplay}
        useForSection={false}
        showLine={true}
        hideIcons={false}
      />
    </div>
  );
};

export default Subtitles;
