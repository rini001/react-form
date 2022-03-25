import React, { useState, useEffect } from "react";
import styles from "./Form.module.css";
export const Form = () => {
  const [data, setData] = useState({});
  const [employees, setEmployees] = useState([]);
  const handleData = (e) => {
    const { name, value, type, checked } = e.currentTarget;
    let update = type === "checkbox" ? checked : value;
    setData({
      ...data,
      [name]: update,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      username: data.username,
      age: data.age,
      address: data.address,
      department: data.department,
      salary: data.salary,
      isMarried: data.isMarried,
    };

    fetch("http://localhost:8000/posts", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        display();
      })
      .catch((err) => {
        console.log(err);
      });
    setData({
      username: "",
      age: "",
      address: "",
      department: "",
      salary: "",
      isMarried: "",
    });
  };

  useEffect(() => {
    display();
  }, []);

  function display() {
    fetch(`http://localhost:8000/posts`, {
      method: "GET",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setEmployees(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
        <h1>Employee Details</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.div1}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleData}
          />
        </div>
        <div className={styles.div1}>
          <label>Age</label>
          <input
            type="text"
            name="age"
            value={data.age}
            onChange={handleData}
          />
        </div>
        <div className={styles.div1}>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={data.address}
            onChange={handleData}
          />
        </div>
        <div className={styles.div1}>
          <label>Department</label>
          <select name="department" onChange={handleData}>
            <option value="">--</option>
            <option value="dep 1">Department 1</option>
            <option value="dep 2">Department 2</option>
            <option value="dep 3">Department 3</option>
          </select>
        </div>
        <div className={styles.div1}>
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={data.salary}
            onChange={handleData}
          />
        </div>

        <div className={styles.div1}>
          <label>isMarried</label>
          <input
            type="checkbox"
            name="isMarried"
            checked={data.isMarried}
            onChange={handleData}
          />
        </div>
        <div>
          <button>submit</button>
        </div>
      </form>
      <div className={styles.div2}>
        <div className={styles.table} style={{fontWeight:"bolder"}}>
          <div>USERNAME</div>
          <div>AGE</div>
          <div>ADDRESS</div>
          <div>SALARY</div>
          <div>DEPARTMENT</div>
          <div>IS MARRIED</div>
          <div>ID</div>
        </div>
        <div>
          {employees.map((elem) => (
            <div key={elem.id} className={styles.table}>
              <div>{elem.username}</div>
              <div>{elem.age}</div>
              <div>{elem.address}</div>
              <div>₹{elem.salary}</div>
              <div>{elem.department}</div>
              <div>{elem.isMarried ? "Yes" : "No"}</div>
              <div>{elem.id}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
