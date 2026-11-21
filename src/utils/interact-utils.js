import interact from "interactjs";

export const setupNoteInteractions = (
  selector = ".note",
  { onMoveEnd, onResizeEnd } = {}
) => {
  interact(selector).unset();

  interact(selector)
    .draggable({
      inertia: true,
      autoScroll: true,
      ignoreFrom: "button, textarea, input",
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
      listeners: {
        move(event) {
          const target = event.target;
          const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute("data-x", String(x));
          target.setAttribute("data-y", String(y));
        },
        end(event) {
          const target = event.target;
          const id = target.getAttribute("data-id");
          const x = parseFloat(target.getAttribute("data-x")) || 0;
          const y = parseFloat(target.getAttribute("data-y")) || 0;
          if (id && onMoveEnd) {
            onMoveEnd(id, { x, y });
          }
        },
      },
    })
    .resizable({
      inertia: true,
      edges: { left: false, right: true, bottom: true, top: false },
      modifiers: [
        interact.modifiers.restrictEdges({
          outer: "parent",
          endOnly: true,
        }),
        interact.modifiers.restrictSize({
          min: { width: 140, height: 120 },
        }),
      ],
      listeners: {
        move(event) {
          const target = event.target;
          let x = parseFloat(target.getAttribute("data-x")) || 0;
          let y = parseFloat(target.getAttribute("data-y")) || 0;

          target.style.width = `${event.rect.width}px`;
          target.style.height = `${event.rect.height}px`;

          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute("data-x", String(x));
          target.setAttribute("data-y", String(y));
        },
        end(event) {
          const target = event.target;
          const id = target.getAttribute("data-id");
          const width = event.rect.width;
          const height = event.rect.height;
          if (id && onResizeEnd) {
            onResizeEnd(id, { width, height });
          }
        },
      },
    });
};

export default {
  setupNoteInteractions,
};
