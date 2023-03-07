diagram = (function () {
  var $ = go.GraphObject.make;
  var diagram;

  var getTemplates = function () {
    return [
      {
        category: "first",
        template: $(go.Node, "Auto", $(go.Shape, "Circle")),
      },
      {
        category: "second",
        template: $(
          go.Node,
          "Auto",
          $(go.Shape, {
            geometryString: "F M0 0 L100 0 Q150 50 100 100 L0 100 Q50 50 0 0z",
            fill: "white",
            width: 100,
            height: 100,
          })
        ),
      },
      {
        category: "third",
        template: $(
          go.Node,
          "Vertical",
          $(go.Shape, "Rectangle", {
            width: 50,
            height: 50,
            strokeWidth: 0,
            fill: "yellow",
          }),
          $(go.Shape, "Rectangle", {
            width: 100,
            height: 50,
            strokeWidth: 5,
            stroke: "red",
            fill: "green",
          })
        ),
      },
    ];
  };

  var initDiagram = function () {
    diagram = $(go.Diagram, "diagram-content", {
      initialContentAlignment: go.Spot.Center,
    });
    getTemplates().forEach((x) =>
      diagram.nodeTemplateMap.add(x.category, x.template)
    );
    diagram.model = $(go.GraphLinksModel, {
      nodeDataArray: [
        { key: 1, category: "first" },
        { key: 2, category: "second" },
        { key: 3, category: "second" },
        { key: 4, category: "third" },
      ],
      linkDataArray: [
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 1, to: 3 },
        { from: 3, to: 4 },
      ],
    });
  };
  return { initDiagram };
})();
