module.exports = {
  "tag": "table", "children": [
    {
      "tag": "tbody", "children": [
      {
        "tag": "tr", "children": [
        {
          "tag": "td", "children": [
          {"tag": "b", "html": "Description"}
        ]
        },
        {"tag": "td", "html": " ${description}"}
      ]
      },
      {
        "tag": "tr", "children": [
        {
          "tag": "td", "children": [
          {"tag": "b", "html": "Usage"}
        ]
        },
        {"tag": "td", "html": "${usage}"}
      ]
      },
      {
        "tag": "tr", "children": [
        {
          "tag": "td", "children": [
          {"tag": "b", "html": "Returns"}
        ]
        },
        {"tag": "td", "html": "${returns}"}
      ]
      }
    ]
    }
  ]
};
