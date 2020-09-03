import interact from "interactjs";

const enableDrag = () => {
  interact(".note").draggable({
    inertia: true,
    autoScroll: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: true,
      }),
    ],
    listeners: {
      move: (event) => {
        const target = event.target;
        // keep the dragged position in the data-x/data-y attributes
        const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
        // translate the element
        target.style.webkitTransform = target.style.transform =
          "translate(" + x + "px, " + y + "px)";
        // update the posiion attributes
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      },
    },
  });
};

const enableResize = (
  element,
  edges = { left: true, right: true, bottom: true, top: true },
  wrapper = "parent"
) => {
  if (element) {
    interact(element)
      .resizable({
        inertia: true,
        edges: edges,
        modifiers: [
          interact.modifiers.restrictEdges({
            outer: wrapper,
            endOnly: true,
          }),
          interact.modifiers.restrictSize({
            min: { width: 300, height: 300 },
          }),
        ],
      })
      .on("resizemove", (e) => {
        element.style.width = `${e.rect.width}px`;
        element.style.height = `${e.rect.height}px`;
      });
  }
};

export default {
  enableDrag,
  enableResize,
};
