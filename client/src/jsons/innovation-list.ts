export const innovationCatalog = {
  scales: [
    {
      id: 0,
      name: 'Model/Early Prototype',
      description: 'The innovation is validated for its ability to achieve a specific impact under fully-controlled conditions.',
      innovations: [
        {
          id: 'inv-001',
          country: 'Senegal',
          title: 'The Community of Practices of Institutions creates an environment',
          summary: 'Institutions collaborate to co-create and disseminate climate adaptation advisories for agro-pastoralists.',
          key_metrics: {
            geoscope: 'Senegal',
            typology: 'Research and Communication Methodologies and Tools',
            scaling_readiness: 5
          },
          expected_outcomes: 'Local radio stations and farmer organizations increase advisory coverage reaching 80k households.',
          intended_beneficiaries: 'Smallholder farmers, rural women groups, and youth cooperatives.',
          comments: [
            {
              author: 'Jhon Doe',
              date: '22 Jul 2024',
              text: 'This innovation really helped us structure our advisory channels.'
            },
            {
              author: 'Awa Diop',
              date: '01 Aug 2024',
              text: 'We adapted the methods for our region with good results.'
            }
          ]
        },
        {
          id: 'inv-002',
          country: 'Ghana',
          title: 'Climate-smart irrigation scheduling',
          summary: 'A mobile app delivers real-time irrigation guidance using weather and soil data.',
          key_metrics: {
            geoscope: 'Ghana',
            typology: 'Digital Tools',
            scaling_readiness: 5
          },
          expected_outcomes: 'Reduction of 30% in water use by pilot farmers.',
          intended_beneficiaries: 'Maize and tomato farmers in northern Ghana.',
          comments: [
            {
              author: 'Kwame Mensah',
              date: '10 Sep 2024',
              text: 'Saved us water during the last dry season.'
            }
          ]
        },
        {
          id: 'inv-003',
          country: 'Kenya',
          title: 'Drought-resistant sorghum varieties',
          summary: 'New seed lines tested for high yield under low rainfall conditions.',
          key_metrics: {
            geoscope: 'Kenya',
            typology: 'Seed Innovations',
            scaling_readiness: 5
          },
          expected_outcomes: 'Yield increase of 25% in semi-arid zones.',
          intended_beneficiaries: 'Smallholder sorghum farmers.',
          comments: []
        },
        {
          id: 'inv-004',
          country: 'Ethiopia',
          title: 'Community-based weather forecasting groups',
          summary: 'Local communities trained to interpret meteorological data and advise farmers.',
          key_metrics: {
            geoscope: 'Ethiopia',
            typology: 'Capacity Building',
            scaling_readiness: 5
          },
          expected_outcomes: 'Improved planting decisions in 50 rural districts.',
          intended_beneficiaries: 'Pastoralists and rainfed farmers.',
          comments: [
            {
              author: 'Abebe T.',
              date: '15 Aug 2024',
              text: 'Forecasts were accurate and timely this season.'
            }
          ]
        },
        {
          id: 'inv-005',
          country: 'Mali',
          title: 'Agroforestry with nitrogen-fixing trees',
          summary: 'Integration of Faidherbia albida trees into farming systems.',
          key_metrics: {
            geoscope: 'Mali',
            typology: 'Agroforestry',
            scaling_readiness: 5
          },
          expected_outcomes: 'Soil fertility improvement and 10% yield increase.',
          intended_beneficiaries: 'Millet and sorghum farmers.',
          comments: []
        },
        {
          id: 'inv-006',
          country: 'Nigeria',
          title: 'Climate insurance for smallholders',
          summary: 'Weather-index insurance products tailored for small farmers.',
          key_metrics: {
            geoscope: 'Nigeria',
            typology: 'Financial Instruments',
            scaling_readiness: 5
          },
          expected_outcomes: '10k farmers covered by insurance pilot.',
          intended_beneficiaries: 'Rice and maize producers.',
          comments: [
            {
              author: 'Ngozi U.',
              date: '03 Jul 2024',
              text: 'Farmers felt more secure planting during unpredictable rains.'
            }
          ]
        }
      ]
    },
    {
      id: 1,
      name: 'Proof of Concept',
      description: 'Innovations at the idea and feasibility testing stage.',
      innovations: [
        {
          id: 'inv-007',
          country: 'Uganda',
          title: 'Solar-powered cold storage',
          summary: 'Pilot units help reduce post-harvest losses for vegetables.',
          key_metrics: {
            geoscope: 'Uganda',
            typology: 'Post-Harvest Technology',
            scaling_readiness: 1
          },
          expected_outcomes: 'Reduce vegetable losses by 40% in pilot communities.',
          intended_beneficiaries: 'Vegetable farmers and market vendors.',
          comments: []
        },
        {
          id: 'inv-008',
          country: 'Rwanda',
          title: 'Digital soil fertility maps',
          summary: 'Maps guiding fertilizer application for maize fields.',
          key_metrics: {
            geoscope: 'Rwanda',
            typology: 'Digital Tools',
            scaling_readiness: 1
          },
          expected_outcomes: 'Optimize fertilizer use in 100 pilot farms.',
          intended_beneficiaries: 'Maize farmers in Eastern Province.',
          comments: []
        }
      ]
    },
    {
      id: 2,
      name: 'Prototype Testing',
      description: 'Innovations being tested in controlled environments.',
      innovations: [
        {
          id: 'inv-009',
          country: 'Tanzania',
          title: 'Mobile livestock health tracker',
          summary: 'Track animal diseases via SMS.',
          key_metrics: {
            geoscope: 'Tanzania',
            typology: 'Digital Tools',
            scaling_readiness: 2
          },
          expected_outcomes: 'Early disease detection in 500 livestock.',
          intended_beneficiaries: 'Pastoralists in northern regions.',
          comments: []
        },
        {
          id: 'inv-010',
          country: 'Malawi',
          title: 'Flood-resistant rice paddies',
          summary: 'Modified paddies withstand heavy rains.',
          key_metrics: {
            geoscope: 'Malawi',
            typology: 'Infrastructure',
            scaling_readiness: 2
          },
          expected_outcomes: 'Protect rice crops in flood-prone areas.',
          intended_beneficiaries: 'Rice farmers in lowland areas.',
          comments: []
        }
      ]
    },
    {
      id: 3,
      name: 'Validated Solution',
      description: 'Solutions validated in field conditions.',
      innovations: [
        {
          id: 'inv-011',
          country: 'Burkina Faso',
          title: 'Water harvesting bunds',
          summary: 'Simple structures to conserve rainwater.',
          key_metrics: {
            geoscope: 'Burkina Faso',
            typology: 'Water Management',
            scaling_readiness: 3
          },
          expected_outcomes: 'Increase water availability for 200 hectares.',
          intended_beneficiaries: 'Smallholder farmers in Sahel region.',
          comments: []
        },
        {
          id: 'inv-012',
          country: 'Cameroon',
          title: 'Mobile extension service',
          summary: 'Extension agents supported with digital tools.',
          key_metrics: {
            geoscope: 'Cameroon',
            typology: 'Digital Tools',
            scaling_readiness: 3
          },
          expected_outcomes: 'Reach 5,000 farmers with timely advice.',
          intended_beneficiaries: 'Cocoa and coffee farmers.',
          comments: []
        }
      ]
    },
    {
      id: 4,
      name: 'Adoption in Pilot Areas',
      description: 'Solutions adopted by early users.',
      innovations: [
        {
          id: 'inv-013',
          country: 'Mozambique',
          title: 'Cassava disease detection app',
          summary: 'App helps identify cassava mosaic disease.',
          key_metrics: {
            geoscope: 'Mozambique',
            typology: 'Digital Tools',
            scaling_readiness: 4
          },
          expected_outcomes: 'Early detection in 1,000 farms.',
          intended_beneficiaries: 'Cassava farmers in central provinces.',
          comments: []
        },
        {
          id: 'inv-014',
          country: 'Zambia',
          title: 'Drought-tolerant maize hybrids',
          summary: 'Seed hybrids tested in dry zones.',
          key_metrics: {
            geoscope: 'Zambia',
            typology: 'Seed Innovations',
            scaling_readiness: 4
          },
          expected_outcomes: 'Increase yields by 20% in drought conditions.',
          intended_beneficiaries: 'Maize farmers in Southern Province.',
          comments: []
        }
      ]
    }
  ]
};
