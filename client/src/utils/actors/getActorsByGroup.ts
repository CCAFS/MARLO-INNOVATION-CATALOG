import type { Actor } from '~/interfaces/search-complete.interface';
import Agricultural from '~/images/actors/Agricultural.png';
import Banks from '~/images/actors/Banks.png';
import Farmers from '~/images/actors/Farmers.png';
import Others from '~/images/actors/Others.png';
import Policy from '~/images/actors/Policy.png';
import Researchers from '~/images/actors/Researchers.png';
import type { ImageMetadata } from 'astro';

interface FilterGroupedActors {
  actorInfoName: string | string[];
  imgUrl: ImageMetadata;
}

const getActorsByGroup = (actors: Actor[]) => {
  if (!actors || actors.length === 0) {
    return [];
  }

  // Filter out actors with null or undefined actorInfo
  const validActors = actors.filter(actor => actor?.actorInfo);

  if (validActors.length === 0) {
    return [];
  }

  const baseActors = [...validActors];

  const imgMap: Record<string, ImageMetadata> = {
    Agricultural: Agricultural,
    Banks: Banks,
    Farmers: Farmers,
    Others: Others,
    Policy: Policy,
    Researchers: Researchers
  };

  const groupedActors: Actor[] = validActors.reduce((acc: Actor[], actor) => {
    const isAlreadyAdded = acc.some(a => a.actorInfo && a.actorInfo.name === actor.actorInfo.name);

    if (!isAlreadyAdded) {
      acc.push(actor);
    }
    return acc;
  }, []);

  const result: FilterGroupedActors[] = groupedActors.map(groupedActor => {
    // Extract the name from actorInfo
    const name = groupedActor.actorInfo.name;

    const nameParts = name.split('/').map(part => part.trim());

    const finalName: string | string[] = nameParts.length > 1 ? nameParts : nameParts[0];

    // Get image URL based on the first part of the name
    const imgUrl = imgMap[name.split(/[ /]/)[0]] || Others;

    return {
      actorInfoName: finalName,
      imgUrl
    };
  });

  return result;
};

export { getActorsByGroup, type FilterGroupedActors };
