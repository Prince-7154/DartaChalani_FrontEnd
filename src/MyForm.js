import React from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { addNewRegistration } from "./api/dartachalani.api";

const MyForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // console.log("Values", values);
      const file = values.image[0]?.originFileObj; // Access the first file in the fileList
      // if (!file) {
      //   console.error("No file selected.");
      //   return;
      // }
      // console.log("File object:", file);

      // Create a FormData object for file and input data
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("image", file);

      // Submit data to Spring Boot API
      // const response = await addNewRegistration(formData);

      await addNewRegistration(formData);

      message.success("Form submitted successfully!");
      form.resetFields();
      // console.log("Response:", response.data);
    } catch (error) {
      message.error("Failed to submit the form!");
      console.error("Error:", error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 500, margin: "50px auto" }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter your name!" }]}
      >
        <Input placeholder="Enter your name" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter a description!" }]}
      >
        <Input.TextArea placeholder="Enter description" rows={4} />
      </Form.Item>

      <Form.Item
        label="Upload Image"
        name="image"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "Please upload an image!" }]}
      >
        <Upload beforeUpload={() => false} maxCount={1} accept="image/*">
          <Button icon={<UploadOutlined />}>Click to Upload Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;
