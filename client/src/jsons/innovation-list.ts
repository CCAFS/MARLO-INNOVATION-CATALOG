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
            scaling_readiness: 0
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
            scaling_readiness: 0
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
    },
    {
      id: 5,
      name: 'Scaling in Progress',
      description: 'Innovations being scaled to reach more users and regions.',
      innovations: [
        {
          id: 'inv-015',
          country: 'Ghana',
          title: 'Climate-smart cocoa farming practices',
          summary: 'Training programs for sustainable cocoa production under climate stress.',
          key_metrics: {
            geoscope: 'Ghana',
            typology: 'Capacity Building',
            scaling_readiness: 5
          },
          expected_outcomes: 'Train 10,000 cocoa farmers in climate adaptation.',
          intended_beneficiaries: 'Cocoa farmers in Ashanti and Western regions.',
          comments: []
        },
        {
          id: 'inv-016',
          country: 'Kenya',
          title: 'Mobile money for agricultural inputs',
          summary: 'Digital payment system for seeds and fertilizers.',
          key_metrics: {
            geoscope: 'Kenya',
            typology: 'Financial Instruments',
            scaling_readiness: 5
          },
          expected_outcomes: 'Enable 50,000 farmers to access inputs on credit.',
          intended_beneficiaries: 'Smallholder farmers across Kenya.',
          comments: []
        }
      ]
    },
    {
      id: 6,
      name: 'Widespread Adoption',
      description: 'Innovations adopted at scale across multiple regions.',
      innovations: [
        {
          id: 'inv-017',
          country: 'Ethiopia',
          title: 'Index-based livestock insurance',
          summary: 'Insurance protecting pastoralists against drought-related livestock losses.',
          key_metrics: {
            geoscope: 'Ethiopia',
            typology: 'Financial Instruments',
            scaling_readiness: 6
          },
          expected_outcomes: 'Cover 100,000 livestock across pastoral regions.',
          intended_beneficiaries: 'Pastoralist communities in Somali and Afar regions.',
          comments: []
        },
        {
          id: 'inv-018',
          country: 'Tanzania',
          title: 'Improved storage facilities network',
          summary: 'Network of warehouses reducing post-harvest losses.',
          key_metrics: {
            geoscope: 'Tanzania',
            typology: 'Infrastructure',
            scaling_readiness: 6
          },
          expected_outcomes: 'Reduce grain losses by 30% for 200,000 farmers.',
          intended_beneficiaries: 'Maize and rice farmers nationwide.',
          comments: []
        }
      ]
    },
    {
      id: 7,
      name: 'Systemic Change',
      description: 'Innovations creating systemic changes in agricultural systems.',
      innovations: [
        {
          id: 'inv-019',
          country: 'Rwanda',
          title: 'National agricultural advisory system',
          summary: 'Integrated digital and field-based extension services.',
          key_metrics: {
            geoscope: 'Rwanda',
            typology: 'Institutional Innovation',
            scaling_readiness: 7
          },
          expected_outcomes: 'Reach 90% of farming households with timely advice.',
          intended_beneficiaries: 'All farming households in Rwanda.',
          comments: []
        },
        {
          id: 'inv-020',
          country: 'Senegal',
          title: 'Climate information services platform',
          summary: 'National platform integrating weather, market, and advisory services.',
          key_metrics: {
            geoscope: 'Senegal',
            typology: 'Digital Tools',
            scaling_readiness: 7
          },
          expected_outcomes: 'Provide climate services to 500,000 farmers.',
          intended_beneficiaries: 'Farmers, pastoralists, and fishers nationwide.',
          comments: []
        }
      ]
    },
    {
      id: 8,
      name: 'Institutionalized',
      description: 'Innovations embedded in policies and institutional frameworks.',
      innovations: [
        {
          id: 'inv-021',
          country: 'Nigeria',
          title: 'National climate-smart agriculture policy',
          summary: 'Policy framework promoting climate adaptation in agriculture.',
          key_metrics: {
            geoscope: 'Nigeria',
            typology: 'Policy Innovation',
            scaling_readiness: 8
          },
          expected_outcomes: 'Guide climate adaptation for 10 million farmers.',
          intended_beneficiaries: 'All agricultural stakeholders in Nigeria.',
          comments: []
        },
        {
          id: 'inv-022',
          country: 'Uganda',
          title: 'Agricultural insurance regulatory framework',
          summary: 'National framework enabling agricultural insurance products.',
          key_metrics: {
            geoscope: 'Uganda',
            typology: 'Policy Innovation',
            scaling_readiness: 8
          },
          expected_outcomes: 'Enable insurance coverage for 2 million farmers.',
          intended_beneficiaries: 'Farmers and insurance providers nationwide.',
          comments: []
        }
      ]
    },
    {
      id: 9,
      name: 'Transformative Impact',
      description: 'Innovations achieving transformative impact at national or regional scale.',
      innovations: [
        {
          id: 'inv-023',
          country: 'Multi-country',
          title: 'Regional climate services network',
          summary: 'Cross-border platform for climate information sharing.',
          key_metrics: {
            geoscope: 'West Africa',
            typology: 'Institutional Innovation',
            scaling_readiness: 9
          },
          expected_outcomes: 'Serve 15 countries with harmonized climate services.',
          intended_beneficiaries: 'Farmers and policymakers across West Africa.',
          comments: []
        },
        {
          id: 'inv-024',
          country: 'Multi-country',
          title: 'African agricultural transformation initiative',
          summary: 'Continental program for sustainable agricultural development.',
          key_metrics: {
            geoscope: 'Africa',
            typology: 'Institutional Innovation',
            scaling_readiness: 9
          },
          expected_outcomes: 'Transform agriculture for 50 million households.',
          intended_beneficiaries: 'Farming communities across Africa.',
          comments: []
        }
      ]
    }
  ]
};
