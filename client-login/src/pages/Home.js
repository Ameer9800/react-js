import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Table from "react-bootstrap/Table";
export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get("http://localhost:9000/all")
      .then((res) => {
        if (res.status) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div>
        <Table
          striped
          bordered
          hover
          className="container w-50 my-5 text-center"
        >
          <thead>
            <tr>
              <th>Email</th>
              <th>Full Name</th>
              <th>image</th>
            </tr>
          </thead>
          <tbody>
            {data.map((s, i) => (
              <tr key={i}>
                <td>{s.email}</td>
                <td>{s.fullName}</td>
                <td>
                  <img
                    src={`http://localhost:9000/uploads/${s.image}`}
                    style={{ borderRadius: "10%" }}
                    width={"80px"}
                    alt={"f"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
