import React from "react";
function useFirestoreStateCount() {
  const countFirestoreState = React.useRef(0);
  React.useEffect(() => {
    countFirestoreState.current = countFirestoreState.current + 1;
  });
  return countFirestoreState.current;
}
export default useFirestoreStateCount;
