/**
 * Handles mousedown event on a scroll container.
 * It sets up event listeners for mousemove and mouseup events.
 * When mousemove event is triggered, it updates the scrollLeft of the container.
 * When mouseup event is triggered, it removes event listeners.
 * @param {React.MouseEvent<HTMLDivElement>} e - Mouse down event.
 */
export const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  const scrollContainer = e.currentTarget;
  if (!scrollContainer) return;

  const startX = e.clientX;
  const scrollLeft = scrollContainer.scrollLeft;

  const handleMouseMove = (e: MouseEvent) => {
    const x = e.clientX - startX;
    scrollContainer.scrollLeft = scrollLeft - x;
  };

  const handleMouseUp = () => {
    scrollContainer.removeEventListener("mousemove", handleMouseMove);
    scrollContainer.removeEventListener("mouseup", handleMouseUp);
  };

  scrollContainer.addEventListener("mousemove", handleMouseMove);
  scrollContainer.addEventListener("mouseup", handleMouseUp);
};
