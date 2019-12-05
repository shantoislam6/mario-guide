import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

export default (id)=>{
  useFirestoreConnect({
    collection: `projects`,
    doc: id
  });
  return useSelector(state => {
    const projects = state.firestore.ordered.projects;
    if (projects !== undefined) {
      if (projects.length > 0) {
        if (projects[0].id === id) {
          return projects[0];
        }
      } else {
        return null;
      }
    }
  });
}