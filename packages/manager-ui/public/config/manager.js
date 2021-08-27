window.SPAship = {
  env:
  {
    managerPath: "http://localhost:3000/api/v1",
  },
  configs: [
    {
      name: "one.redhat.com",
      isPreset: true,
      environments: [
        {
          name: "Dev",
          api: "http://localhost:2345/api/v1",
          domain: "http://localhost:8765",
        },
      ],
    },
  ],
};
