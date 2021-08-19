import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";

const ViewMember = () => {
  const [member, setMember] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("members").onSnapshot((snapshot) => {
      const arr = [];
      snapshot.docs.map((doc) => arr.push({ id: doc.id, data: doc.data() }));
      setMember(arr);
    });

    return () => unsubscribe();
  }, []);

  const deleteUserHandler = (id) => {
    db.collection("members").doc(id).delete();
  };

  return (
    <div className="view__member">
      <table className="view__member__table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Infix</th>
            <th>Job Title</th>
            <th>Company Name</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {member.map(({ id, data }, i) => (
            <tr key={id}>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.infix}</td>
              <td>{data.jobTitle}</td>
              <td>{data.companyName}</td>
              <td>
                <Link to={`/member/${id}`}>
                  <button className="btn btn__view">View Detail</button>
                </Link>
              </td>
              <td>
                <Link to={`/add-member/${id}`}>
                  <button className="btn btn__view">Edit </button>
                </Link>
              </td>
              <td>
                <button
                  onClick={() => deleteUserHandler(id)}
                  className="btn btn__delete"
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewMember;
