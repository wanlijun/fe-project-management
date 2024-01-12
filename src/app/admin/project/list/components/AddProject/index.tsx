"use client"
import React from 'react';
import { Modal } from 'antd';
import { useState } from 'react';

interface IAddProject {
  children: React.ReactNode
}

const AddProject: React.FC<IAddProject> = ({
  children
}) => {
  const [visible, setVisible] = useState(false);
  const handleOk = () => {
    setVisible(false)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const openModal = () => {
    setVisible(true)
  }
  return (
    <>
      <div onClick={openModal}>
        {children}
      </div>
      <Modal title="Basic Modal" open={visible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}
export default AddProject;