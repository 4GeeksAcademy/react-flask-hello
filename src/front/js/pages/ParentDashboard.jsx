import React, { useContext, useState, useEffect } from "react";
import ParentSideBar from "../component/leftMenuParent/ParentSideBar.jsx";
import MainDashboard from "../component/leftMenuParent/MainDashboard.jsx";
import styled from "styled-components";
import img from "./../../img/background.jpg";
import { Context } from "../store/appContext.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProfileForm from "../component/ProfileForm.jsx";
import ChatComponent from "../component/chatComponent";


const Content = styled.div`
  flex: 1;
  padding: 1rem;
  background-image: url(${img});
  background-size: cover;
  overflow-y: auto;
  aspect-ratio: 16 / 9;
`;

const ParentDashboard = () => {
  const [activeKey, setActiveKey] = useState("home");
  const { store, actions } = useContext(Context);
  const [infoEventos, setInfoEventos] = useState([]);
  const [infoEstudiantes, setInfoEstudiantes] = useState([]);
  const navigate = useNavigate();
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const handleSelect = key => {
    navigate(key);
  };


  useEffect(() => {
    const fetchPersonalInfo = async () => {
      if (!store.personalInfo) {
        await actions.getParentInfo();
      }
    };

    fetchPersonalInfo();
  }, [store.personalInfo]);

  useEffect(() => {
    if (store.personalInfo) {
      setInfoEventos(store.personalInfo.calendario);
      setInfoEstudiantes(store.personalInfo.statusResume);
    }
  }, [store.personalInfo]);

  const handleContentRender = key => {
    switch (key) {
      case "materias":
        break;

      default:
        return (
          <MainDashboard
            dataEvents={infoEventos}
            estudiantes={infoEstudiantes}
          />
        );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        paddingTop: "100px",
      }}>
      <ParentSideBar
        items={menuItems}
        activeKey={activeKey}
        onSelect={handleSelect}
      />


      <Content>
        <Routes>
          <Route
            path="/"
            element={
              <MainDashboard
                dataEvents={infoEventos}
                estudiantes={infoEstudiantes}
              />
            }
          />
          <Route
            path="/profile"
            element={<ProfileForm user={store.personalInfo ?? {}} />}
          />
        </Routes>
        <div>{store.isChatVisible && <ChatComponent />}</div>
      </Content>
    </div>
  );
};

export default ParentDashboard;

const menuItems = [
  {
    key: "/dashboard/parent",
    label: "Dashboard",
    icon: <i className="bi bi-speedometer2"></i>,
  },
  {
    key: "/dashboard/parent/",
    label: "Revisar",
    icon: <i className="bi bi-journal-check"></i>,
  },
  {
    key: "/dashboard/parent/",
    label: "Settings",
    icon: <i className="bi bi-journal-text"></i>,
  },
  {
    key: "/dashboard/parent/",
    label: "Mensajes",
    icon: <i className="bi bi-chat-left-text"></i>,
  },
  {
    key: "/dashboard/parent/profile",
    label: "Perfil",
    icon: <i className="bi bi-chat-left-text"></i>,
  },
];