import React, { useEffect, useState } from "react";
import { Table, Image } from "antd";
import axios from "axios";
import { showAllRegistration } from "./api/dartachalani.api";

const ListComponent = () => {
  const [data, setData] = useState([]);

  // Fetch data from the API using Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await showAllRegistration();

        setData(
          response.data.map((item) => ({
            key: item.id,
            name: item.name,
            description: item.description,
            image: `data:image/jpeg;base64,${item.imageString}`,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Define columns for the table
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image.PreviewGroup>
          <Image
            src={image}
            alt="preview"
            width={50}
            style={{ cursor: "pointer" }}
          />
        </Image.PreviewGroup>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name), // Sort by name alphabetically
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{ pageSize: 5 }}
      bordered
    />
  );
};

export default ListComponent;
