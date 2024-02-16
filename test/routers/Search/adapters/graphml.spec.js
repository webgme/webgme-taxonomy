describe("graphml", function () {
  const { toGraph } = require(
    "../../../../build/routers/Search/adapters/graphml",
  );

  it.only("should convert term to node connected to vocabulary", function () {
    const metadata = {
      displayName: "someContent",
      tags: { "vocab": { "term1": { "f1": "hello!" } } },
    };
    const graph = toGraph(metadata);
    console.log(graph.toGraphMl());
  });
});
