import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";

const ViewMember = () => {
  const [member, setMember] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const sorthandler = (value) => {
    const arr = [...member];
    console.log(value);
    arr.sort((a, b) => {
      if (a.data[value].toLowerCase() < b.data[value].toLowerCase()) {
        return -1;
      }
      if (a.data[value].toLowerCase() > b.data[value].toLowerCase()) {
        return 1;
      }
      return 0;
    });
    setMember(arr);
  };

  const searchHandler = (array) => {
    if (searchTerm === "") return array;

    const keys = array[0] && Object.keys(array[0].data);
    return array.filter(({ data }) =>
      keys.some(
        (key) => data[key].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      )
    );
  };

  return (
    <div className="view__member">
      <div className="search__box">
        <input
          type="text"
          placeholder="Search by First Name, Last Name, Job title, Company Name"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="view__member__table">
        <thead>
          <tr>
            <th onClick={() => sorthandler("firstName")}>First Name</th>
            <th onClick={() => sorthandler("lastName")}>Last Name</th>
            <th onClick={() => sorthandler("infix")}>Infix</th>
            <th onClick={() => sorthandler("jobTitle")}>Job Title</th>
            <th onClick={() => sorthandler("companyName")}>Company Name</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {searchHandler(member).map(({ id, data }, i) => (
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
