import type { Actor } from '~/interfaces/search-complete.interface';
import Agricultural from '~/images/actors/Agricultural.png';
import Banks from '~/images/actors/Banks.png';
import Farmers from '~/images/actors/Farmers.png';
import Others from '~/images/actors/Others.png';
import Policy from '~/images/actors/Policy.png';
import Researchers from '~/images/actors/Researchers.png';
import type { ImageMetadata } from 'astro';

interface FilterGroupedActors {
  actorInfoName: string;
  actorsNames: string[];
  imgUrl: ImageMetadata;
}

const getActorsByGroup = (actors: Actor[]) => {
  if (!actors || actors.length === 0) {
    return [];
  }

  const baseActors = [...actors];

  const imgMap: Record<string, ImageMetadata> = {
    Agricultural: Agricultural,
    Banks: Banks,
    Farmers: Farmers,
    Others: Others,
    Policy: Policy,
    Researchers: Researchers
  };

  const groupedActors: Actor[] = actors.reduce((acc: Actor[], actor) => {
    const isAlreadyAdded = acc.some(a => a.actorInfo.name === actor.actorInfo.name);

    if (!isAlreadyAdded) {
      acc.push(actor);
    }
    return acc;
  }, []);

  const result: FilterGroupedActors[] = groupedActors.map(groupedActor => {
    const actorsNames = baseActors
      .filter(actor => actor.actorInfo.name === groupedActor.actorInfo.name)
      .map(actor => {
        if (actor.actorInfo.name === 'Other') {
          return actor.other || 'Others';
        } else {
          return actor.actorInfo.prmsNameEquivalent;
        }
      });

    const name = groupedActor.actorInfo.name;

    const imgUrl = imgMap[name.split(/[ /]/)[0]] || Others;

    return {
      actorInfoName: name,
      actorsNames,
      imgUrl
    };
  });

  return result;
};

export { getActorsByGroup, type FilterGroupedActors };
