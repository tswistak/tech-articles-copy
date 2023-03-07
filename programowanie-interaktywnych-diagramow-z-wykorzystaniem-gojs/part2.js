diagram = (function () {
  var $ = go.GraphObject.make;
  var diagram;

  var getTemplates = function () {
    return [
      {
        category: "first",
        template: $(
          go.Node,
          "Auto",
          $(go.Shape, "Circle", {
            width: 100,
            height: 100,
            fill: "white",
          }),
          $(go.Shape, "Rectangle", {
            portId: "",
            width: 20,
            height: 20,
            fill: "black",
            fromLinkable: true,
            toLinkable: true,
          })
        ),
      },
      {
        category: "second",
        template: $(
          go.Node,
          "Spot",
          $(go.Shape, {
            geometryString: "F M0 0 L100 0 Q150 50 100 100 L0 100 Q50 50 0 0z",
            fill: "white",
            alignment: go.Spot.Center,
            width: 100,
            height: 100,
          }),
          $(go.Shape, "Rectangle", {
            portId: "entry",
            width: 20,
            height: 20,
            fill: "black",
            alignment: go.Spot.Left,
            fromLinkable: false,
            toLinkable: true,
          }),
          $(go.Shape, "Rectangle", {
            portId: "exit",
            width: 20,
            height: 20,
            fill: "black",
            alignment: go.Spot.Right,
            fromLinkable: true,
            toLinkable: false,
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
            portId: "",
            fromLinkable: true,
            toLinkable: true,
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
      linkFromPortIdProperty: "fromPort",
      linkToPortIdProperty: "toPort",
      nodeDataArray: [
        {
          key: 1,
          category: "first",
        },
        {
          key: 2,
          category: "second",
        },
        {
          key: 3,
          category: "second",
        },
        {
          key: 4,
          category: "third",
        },
      ],
      linkDataArray: [
        {
          from: 1,
          to: 2,
          toPort: "entry",
        },
        {
          from: 2,
          to: 3,
          fromPort: "exit",
          toPort: "entry",
        },
        {
          from: 1,
          to: 3,
          toPort: "entry",
        },
        {
          from: 3,
          to: 4,
          fromPort: "exit",
        },
      ],
    });
  };

  return { initDiagram };
})();
