const data = {
  id: "b0126ab6-7c6d-9770-3a84-b312fe381fdb",
  name: "Taxonomy",
  type: "Taxonomy",
  children: [
    {
      id: "273c57b2-f06a-3ea9-6d40-cfc3d4d76bf9",
      name: "Digital Phenotyping",
      type: "Vocabulary",
      children: [
        {
          id: "26f6428a-b724-e601-0f4e-d636111948e2",
          name: "Data Type",
          type: "Term",
          children: [
            {
              id: "d79c3938-643c-715a-fe0a-1912e42a653e",
              name: "Face/Video Recording",
              type: "Term",
              children: [
                {
                  id: "36424611-3d48-264e-0f14-b6703a34dae6",
                  name: "Video",
                  type: "EnumField",
                  children: [
                    {
                      id: "36083d40-2abd-2f38-fa09-0d3f04477c60",
                      name: "No",
                      type: "EnumOption",
                      children: [],
                    },
                    {
                      id: "bb7cefad-75ea-e9cd-e3e5-5490d33bc313",
                      name: "Yes",
                      type: "EnumOption",
                      children: [],
                    },
                  ],
                },
                {
                  id: "604e21a0-68af-8a1f-c0a0-ae4aa0f0db50",
                  name: "Recording Software",
                  type: "EnumField",
                  children: [
                    {
                      id: "046a3e1c-1ebe-5ac3-423a-4d21347d9067",
                      name: "Zoom",
                      type: "EnumOption",
                      children: [],
                    },
                  ],
                },
                {
                  id: "3f793af0-c11e-28c9-478c-72505c7d4bae",
                  name: "Transcript",
                  type: "EnumField",
                  children: [
                    {
                      id: "ee13be57-8c38-73f4-c120-5cf08709cd28",
                      name: "Transcript Me",
                      type: "EnumOption",
                      children: [],
                    },
                    {
                      id: "1d9c3b4a-e77d-6844-b9c4-ad308ce88fdf",
                      name: "None",
                      type: "EnumOption",
                      children: [],
                    },
                  ],
                },
                {
                  id: "e4e4377f-ef31-6982-1273-4deea1149eb2",
                  name: "Setting",
                  type: "Term",
                  children: [],
                },
                {
                  id: "b4bd7c41-0d2e-9b16-1302-e49662659cc3",
                  name: "Assessment Instrument",
                  type: "Term",
                  children: [],
                },
              ],
            },
            {
              id: "ebe2da19-10c0-0892-11b4-750686996c03",
              name: "Ecological Momentary Assessment",
              type: "Term",
              children: [
                {
                  id: "57fe689d-ef38-6118-ce91-2843ad83aa8c",
                  name: "Platform",
                  type: "EnumField",
                  children: [
                    {
                      id: "a22eb76b-410c-20f4-22e6-0071b78ab31f",
                      name: "Twilio",
                      type: "EnumOption",
                      children: [],
                    },
                    {
                      id: "6d84ae0f-55a5-d019-3282-d115e946eab8",
                      name: "Iphone",
                      type: "EnumOption",
                      children: [],
                    },
                    {
                      id: "c9834bdc-10bc-e168-5d1c-323b8a06ed25",
                      name: "REDCap",
                      type: "EnumOption",
                      children: [],
                    },
                  ],
                },
                {
                  id: "ffcf9cc0-5317-5545-73a3-f5b3208f41a6",
                  name: "Assessment Instrument",
                  type: "TextField",
                  children: [],
                },
              ],
            },
            {
              id: "73c620ac-fdd0-e67b-6b9d-688f11c4bf07",
              name: "Actigraphy",
              type: "Term",
              children: [
                {
                  id: "06b13b3b-34fc-7d0b-92d6-144d5f3e0741",
                  name: "Processing Pipeline",
                  type: "EnumField",
                  children: [
                    {
                      id: "7744617d-5dc6-27cd-09ae-2a9a9d9e0c70",
                      name: "none",
                      type: "EnumOption",
                      children: [],
                    },
                    {
                      id: "9eb22164-2928-ce77-3369-739326d5e419",
                      name: "dpsleep",
                      type: "EnumOption",
                      children: [],
                    },
                  ],
                },
                {
                  id: "03dbb70a-25bb-30a7-5a44-730c1895ef1a",
                  name: "Device",
                  type: "EnumField",
                  children: [
                    {
                      id: "2e45794f-bcb4-ed66-094a-f8b7ff2a9829",
                      name: "Apple Watch",
                      type: "EnumOption",
                      children: [],
                    },
                    {
                      id: "3aa26e56-e5b7-d7f4-e214-1bfee7258f55",
                      name: "GENEActiv",
                      type: "EnumOption",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "91817e29-792d-a023-e541-bd931fcfcb0b",
          name: "Study",
          type: "Term",
          children: [
            {
              id: "1dbcf8ca-0bf8-a6f4-6573-d695d30d1e0d",
              name: "Code",
              type: "TextField",
              children: [],
            },
            {
              id: "d9a3e3b3-3a27-ea69-60bc-98a9c892cc35",
              name: "Center",
              type: "TextField",
              children: [],
            },
            {
              id: "b767ea1f-5df1-295a-a07d-39a0d8800a2c",
              name: "Extract",
              type: "Term",
              children: [
                {
                  id: "d4b8c7ab-2526-0bb3-a341-7c1b0bcb4511",
                  name: "Notes",
                  type: "TextField",
                  children: [],
                },
                {
                  id: "38c40073-1509-a062-c511-e0e9527673bb",
                  name: "Time",
                  type: "TextField",
                  children: [],
                },
                {
                  id: "d1ef49c4-78e7-744e-ef25-2642f116f3ac",
                  name: "Operator ID",
                  type: "TextField",
                  children: [],
                },
              ],
            },
            {
              id: "644c7b95-8427-c01e-076d-391cfae54c65",
              name: "Config",
              type: "Term",
              children: [
                {
                  id: "f1f12c92-740a-16dc-b9b6-e243f0cbcc90",
                  name: "Operator ID",
                  type: "TextField",
                  children: [],
                },
                {
                  id: "271e5715-9c86-fa6b-d476-643e5e95aebd",
                  name: "Notes",
                  type: "TextField",
                  children: [],
                },
                {
                  id: "f47a00fb-4fd6-b09d-3ccb-69863565103e",
                  name: "Time",
                  type: "TextField",
                  children: [],
                },
              ],
            },
            {
              id: "13991312-052a-9b0b-f6e7-dd2ded09a111",
              name: "Investigator ID",
              type: "TextField",
              children: [],
            },
          ],
        },
        {
          id: "8a2a08b6-385d-d838-f6ba-5b616cdb8fff",
          name: "Subject",
          type: "Term",
          children: [
            {
              id: "24f97d53-eec9-8430-c904-011a8514b95f",
              name: "Height",
              type: "IntegerField",
              children: [],
            },
            {
              id: "7213bd9d-e20d-fdbb-9374-a97568fc89bd",
              name: "Sex",
              type: "EnumField",
              children: [
                {
                  id: "fc6680ba-be3c-e979-bf94-9b33c79b11e1",
                  name: "Female",
                  type: "EnumOption",
                  children: [],
                },
                {
                  id: "35068c09-55c9-d634-d88d-634bc0079312",
                  name: "Other",
                  type: "EnumOption",
                  children: [],
                },
                {
                  id: "dab52028-eec9-d7fe-12e2-c46effa507dc",
                  name: "Male",
                  type: "EnumOption",
                  children: [],
                },
              ],
            },
            {
              id: "877c8cca-26bb-8522-1aad-ce6346ef29ac",
              name: "Date of Birth",
              type: "TextField",
              children: [],
            },
            {
              id: "1c260390-c770-32d8-1693-8a5cbfb42cfb",
              name: "Handedness",
              type: "EnumField",
              children: [
                {
                  id: "cfa609f8-ce03-a223-ceab-d530b08aab26",
                  name: "Right",
                  type: "EnumOption",
                  children: [],
                },
                {
                  id: "80ad8943-9709-f701-5157-766ffd320443",
                  name: "Ambidextrious",
                  type: "EnumOption",
                  children: [],
                },
                {
                  id: "49330075-7d2d-7a74-b778-34288b31adc6",
                  name: "Left",
                  type: "EnumOption",
                  children: [],
                },
              ],
            },
            {
              id: "6ab19632-217f-9d92-c7f0-c1487fcad205",
              name: "Weight",
              type: "IntegerField",
              children: [],
            },
            {
              id: "27c62295-00b8-c098-e500-3c5bde60f8fe",
              name: "Location",
              type: "TextField",
              children: [],
            },
          ],
        },
        {
          id: "589ba005-8522-7e4a-3e66-215e9b9b74b5",
          name: "Collection Time",
          type: "Term",
          children: [
            {
              id: "47c67f13-47b2-6c35-097f-9458d53614a5",
              name: "End DateTime",
              type: "TextField",
              children: [],
            },
            {
              id: "8d56c5a3-3d81-fbdc-2890-55330744d344",
              name: "Start DateTime",
              type: "TextField",
              children: [],
            },
            {
              id: "6df83c75-e4b1-3174-3153-af11d7f8c6a0",
              name: "Frequency",
              type: "TextField",
              children: [],
            },
          ],
        },
        {
          id: "a0b2b4cc-ad70-2c77-db2b-ef0e34e4d29e",
          name: "Collection Site",
          type: "Term",
          children: [
            {
              id: "9f67a75d-69b2-4bc9-fc81-e9121ee107a7",
              name: "State",
              type: "TextField",
              children: [],
            },
            {
              id: "bd443f29-cf04-c0e9-7395-c1646a7594c3",
              name: "City",
              type: "TextField",
              children: [],
            },
            {
              id: "b817d0f8-b987-d02e-40ae-331e9f90a034",
              name: "Country",
              type: "TextField",
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

export default data;
