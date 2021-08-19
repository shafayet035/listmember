import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../Firebase";

const SingleMember = () => {
  const [userData, setUserData] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    db.collection("members")
      .doc(id)
      .get()
      .then((result) => setUserData(result.data()));
  }, []);

  return (
    <>
      {userData ? (
        <div className="profile">
          <div className="profile__info">
            <img src={userData.profileImg} alt="" />
            <h2>
              {userData.firstName} {userData.lastName} ({userData.infix})
            </h2>
            <h4>{userData.jobTitle}</h4>
          </div>
          <div className="company__info">
            <h3>{userData.companyName}</h3>
            <img src={userData.companyImg} alt="" />
          </div>
        </div>
      ) : (
        <p className="loading">Loading</p>
      )}
    </>
  );
};

export default SingleMember;
