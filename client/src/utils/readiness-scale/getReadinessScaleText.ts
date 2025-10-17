interface ReadinessScale {
  text: string;
  number: string;
  textComplet: string;
  description: string;
}

export default function getReadinessScaleText(readinessScale: number | null | undefined): ReadinessScale {
  const readinessArray: ReadinessScale[] = [
    {
      text: 'No defined',
      number: 'N/A',
      textComplet: 'No defined',
      description: 'No defined readiness scale information available.'
    },
    {
      text: 'Idea',
      number: '0',
      textComplet: '0 - Idea',
      description: 'The innovation is at idea stage.'
    },
    {
      text: 'Basic Research',
      number: '1',
      textComplet: '1 - Basic Research',
      description: 'The innovation’s basic principles are being researched for their ability to achieve a specific impact.'
    },
    {
      text: 'Formulation',
      number: '2',
      textComplet: '2 - Formulation',
      description: 'The innovation’s key concepts are being formulated or designed.'
    },
    {
      text: 'Proof of Concept',
      number: '3',
      textComplet: '3 - Proof of Concept',
      description: "The innovation's key concepts have been validated for their ability to achieve a specific impact."
    },
    {
      text: 'Controlled Testing',
      number: '4',
      textComplet: '4 - Controlled Testing',
      description: 'The innovation is being tested for its ability to achieve a specific impact under fully-controlled conditions.'
    },
    {
      text: 'Model/Early Prototype',
      number: '5',
      textComplet: '5 - Model/Early Prototype',
      description: 'The innovation is validated for its ability to achieve a specific impact under fully controlled conditions.'
    },
    {
      text: 'Semi-Controlled Testing',
      number: '6',
      textComplet: '6 - Semi-Controlled Testing',
      description: 'The innovation is being tested for its ability to achieve a specific impact under semi-controlled conditions.'
    },
    {
      text: 'Prototype',
      number: '7',
      textComplet: '7 - Prototype',
      description: 'The innovation is validated for its ability to achieve a specific impact under semi-controlled conditions.'
    },
    {
      text: 'Uncontrolled Testing',
      number: '8',
      textComplet: '8 - Uncontrolled Testing',
      description: 'The innovation is being tested for its ability to achieve a specific impact under uncontrolled conditions.'
    },
    {
      text: 'Proven Innovation',
      number: '9',
      textComplet: '9 - Proven Innovation',
      description: 'The innovation is validated for its ability to achieve a specific innovation.'
    }
  ];

  return readinessArray[readinessScale ?? 0];
}
