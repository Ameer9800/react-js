import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [error, setError] = useState("");
  const [file, setFile] = useState("");

  const [user, setUser] = useState({
    email: "",
    fullName: "",
    password: "",
    image: file.name,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let obj = new FormData();
    obj.append("image", file);
    obj.append("email", user.email);
    obj.append("fullName", user.fullName);
    obj.append("password", user.password);

    debugger;
    axios
      .post("http://localhost:9000/register", obj)
      .then((res) => {
        if (res.status) {
          setError(res.data);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
        console.log(res);
      })
      .catch((err) => {
        setError(err);
      });

    setUser({
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <Card className="my-5 container w-25 bg-light">
        <Card.Body>
          <h2 className="text-center mb-3">Sign Up</h2>
          <Form onSubmit={onSubmit}>
            <input
              name="image"
              value={user?.image}
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
            />
            <Form.Group id="email">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                onChange={onChange}
                name="email"
                value={user?.email}
              />
            </Form.Group>

            <Form.Group id="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                onChange={onChange}
                name="fullName"
                value={user?.fullName}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                autoComplete="false"
                type="password"
                onChange={onChange}
                name="password"
                value={user?.password}
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control autoComplete="false" type="password" />
            </Form.Group>
            <Button type="submit" className="my-3 w-100">
              SignUp
            </Button>
            <h6 className="text-center bg-danger ">{error.msg}</h6>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to={"/login"}>Login</Link> here.
      </div>
    </>
  );
}
