import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/login", user)
      .then((res) => {
        if (res.status) {
          history.push("/home");
          localStorage.setItem("token", res.data.data.token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Card className="my-5 container w-25 bg-light">
        <Card.Body>
          <h2 className="text-center mb-3">Login</h2>
          <Form onSubmit={onLogin}>
            <Form.Group id="email">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                onChange={onChange}
                name="email"
                value={user?.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={onChange}
                name="password"
                value={user?.password}
              />
            </Form.Group>

            <Button type="submit" className="my-3 w-100">
              Login
            </Button>
            <h6 className="text-center bg-danger ">{error.msg}</h6>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Dont have an account? <Link to={"/signup"}>SignUp</Link> here.
      </div>
    </>
  );
}
