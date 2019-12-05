import React from "react";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../store/actions/projectActions";
import { useModal } from "../../providers/ModalProvider";
import { DeteteButton } from "../childs/button";

export default props => {
  const dispatch = useDispatch();
  const modal = useModal();
  function deleteProjectHandler(id) {
    modal("Are You Sure To Delete?", function(){
      return function() {
        // action for yes
        dispatch(deleteProject(id, props.uid));
      };
    });
  }
  return (
    <DeteteButton
      {...props}
      onClick={() => {
        deleteProjectHandler(props.id);
      }}
    />
  );
};
