import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./noticeboardadmin.css";

function CreateNotice() {
  const [notice, setNotice] = useState({
    title: " ",
    date: " ",
    content: " "
  });

  // const [errorPopUp, setErrorPopUp] = useState("");
  // const [successPopUp, setSuccessPopUp] = useState("");

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setNotice({
      ...notice,
      [name]: value
    });
    console.log(notice);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!notice.title.trim() || !notice.date.trim() || !notice.content.trim()) {
      toast.error("Kindly fill in all the fields");
    } else {
      toast.success("Notice Created Successfully!");
      console.log(notice);
      setNotice({
        title: " ",
        date: " ",
        content: " "
      });
  
    }
  }

  return (
    <div className="notice-container">
      <h1 className="notice-heading1">CodeTogether Admin</h1>
      <h2 className="notice-heading2">Create Notice</h2>
      <form className="notice-form">
        <div className="sub-container">
          <label className="notice-label">Title: </label>
          <input
            className="notice-input"
            type="text"
            id="title"
            name="title"
            value={notice.title}
            onChange={handleChange}
          />
        </div>
        <div className="sub-container">
          <label className="notice-label">Date: </label>
          <input
            className="notice-input"
            type="text"
            id="date"
            name="date"
            value={notice.date}
            onChange={handleChange}
          />
        </div>
        <div className="sub-container">
          <label className="notice-label">Body: </label>
          <textarea
            className="notice-body"
            rows="15"
            type="text"
            id="body"
            name="content"
            value={notice.content}
            onChange={handleChange}
          />
        </div>
        <button className="notice-button" onClick={handleSubmit} type="submit">
          Create Notice
        </button>
      </form>
      
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
export default CreateNotice;