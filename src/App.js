import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MyForm from "./MyForm";
import ListComponent from "./List";
import { Layout, Button } from "antd";

const { Header, Content } = Layout;

const App = () => {
  const navigate = useNavigate();
  const [initialLoad, setInitialLoad] = useState(true); // Track first load

  // Only redirect to /chalani on the first load
  useEffect(() => {
    if (initialLoad) {
      navigate("/chalani");
      setInitialLoad(false); // Set it to false after redirect
    }
  }, [initialLoad, navigate]);

  return (
    <Layout>
      <Header style={{ backgroundColor: "#D4F7F3", padding: "10px" }}>
        <Button
          type="primary"
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/chalani")}
        >
          Chalani
        </Button>
        <Button type="default" onClick={() => navigate("/list")}>
          List
        </Button>
      </Header>
      <Content style={{ padding: "20px", backgroundColor: "#F5F5DC" }}>
        <Routes>
          <Route path="/chalani" element={<MyForm />} />
          <Route path="/list" element={<ListComponent />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
