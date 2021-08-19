import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { useParams } from "react-router";

const AddMember = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [infix, setInfix] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [companyImg, setCompanyImg] = useState("");
  const [message, setMessage] = useState("");

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      db.collection("members")
        .doc(id)
        .get()
        .then((result) => {
          const {
            firstName,
            lastName,
            infix,
            companyName,
            jobTitle,
            profileImg,
            companyImg,
          } = result.data();
          setFirstName(firstName);
          setLastName(lastName);
          setInfix(infix);
          setCompanyName(companyName);
          setJobTitle(jobTitle);
          setProfileImg(profileImg);
          setCompanyImg(companyImg);
          setIsEdit(true);
        });
    }
  }, [id]);

  const uploadHandler = (e) => {
    e.preventDefault();

    if (isEdit) {
      db.collection("members")
        .doc(id)
        .update({
          firstName,
          lastName,
          infix,
          companyName,
          jobTitle,
          profileImg,
          companyImg,
        })
        .then((res) => {
          setMessage("Successfully Updated!");
          clearField();
        })
        .catch((err) => {
          clearField();
          setMessage("Update Failed!");
        });
    } else {
      db.collection("members")
        .add({
          firstName,
          lastName,
          infix,
          companyName,
          jobTitle,
          profileImg,
          companyImg,
        })
        .then((res) => setMessage("Successfully Uploaded!"))
        .catch((err) => setMessage("Upload Failed!"));
      clearField();
    }
  };

  const clearField = () => {
    setFirstName("");
    setLastName("");
    setInfix("");
    setCompanyName("");
    setJobTitle("");
    setProfileImg("");
    setCompanyImg("");
  };

  return (
    <div className="add__member">
      {message && <div className="message"> {message} </div>}
      <form className="add__member__form" onSubmit={(e) => uploadHandler(e)}>
        <input
          type="text"
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <input
          type="text"
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <input
          type="text"
          placeholder="Infix"
          onChange={(e) => setInfix(e.target.value)}
          value={infix}
        />
        <input
          type="text"
          placeholder="Company Name"
          onChange={(e) => setCompanyName(e.target.value)}
          value={companyName}
        />
        <input
          type="text"
          placeholder="Job Title"
          onChange={(e) => setJobTitle(e.target.value)}
          value={jobTitle}
        />
        <input
          type="text"
          placeholder="Profile Picture URL"
          onChange={(e) => setProfileImg(e.target.value)}
          value={profileImg}
        />
        <input
          type="text"
          placeholder="Company Picture URL"
          onChange={(e) => setCompanyImg(e.target.value)}
          value={companyImg}
        />
        <button className="btn btn__primary">Submit</button>
      </form>
    </div>
  );
};

export default AddMember;
