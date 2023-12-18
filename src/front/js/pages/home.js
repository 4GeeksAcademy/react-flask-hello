import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import ProgramDivs from "../component/programDivs";
import { UpdateLink } from "../component/updateLink";

import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.programs.length > 0 && store.programs.length <= 6) {
      actions.addTotalHours();
    }
  }, [store.programs]);
  return (
    <div className="text-center mx-auto my-3 parentDiv ">
      <UpdateLink
        pt="pt-3"
        title="Update Programs"
        link="/input"
        rotate={false}
        width="40%"
        icon={faCircleUser}
      />

      <ProgramDivs />
    </div>
  );
};