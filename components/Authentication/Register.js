import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
} from "reactstrap";

import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import Router from "next/router";

//import images
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

import { postRegister } from "@/helpers/backend_request";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: "",
    birthday: "1999-01-01",
  });
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    // validate your userinfo
    e.preventDefault();

    console.log("post data");
    const response = await postRegister(userInfo);
    if (response.data?.success) {
      alert("Register success !!!");
    } else {
      alert("Something wrong !!!");
    }
  };

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link href="/" className="d-inline-block auth-logo">
                      <img src={logoLight} alt="" height="20" />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">
                    Premium Admin & Dashboard Template
                  </p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Create New Account</h5>
                      <p className="text-muted">
                        Get your free velzon account now
                      </p>
                    </div>
                    <div className="p-2 mt-4">
                      <Form
                        onSubmit={handleSubmit}
                        className="needs-validation"
                        action="#"
                      >
                        <div className="mb-3">
                          <Label htmlFor="useremail" className="form-label">
                            Email <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email address"
                            type="email"
                            value={userInfo.email}
                            onChange={({ target }) =>
                              setUserInfo({ ...userInfo, email: target.value })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="username" className="form-label">
                            Name <span className="text-danger">*</span>
                          </Label>
                          <Input
                            value={userInfo.name}
                            onChange={({ target }) =>
                              setUserInfo({ ...userInfo, name: target.value })
                            }
                            name="first_name"
                            type="text"
                            placeholder="Enter your name"
                          />
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="userpassword" className="form-label">
                            Password <span className="text-danger">*</span>
                          </Label>
                          <Input
                            value={userInfo.password}
                            onChange={({ target }) =>
                              setUserInfo({
                                ...userInfo,
                                password: target.value,
                              })
                            }
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                          />
                        </div>

                        <div className="mb-2">
                          <Label
                            htmlFor="confirmPassword"
                            className="form-label"
                          >
                            Birthday <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="birthday"
                            type="date"
                            onChange={({ target }) =>
                              setUserInfo({
                                ...userInfo,
                                birthday: target.value,
                              })
                            }
                            value={userInfo.birthday}
                          />
                        </div>

                        <div className="mb-4">
                          <p className="mb-0 fs-12 text-muted fst-italic">
                            By registering you agree to the Velzon
                            <Link
                              href="#"
                              className="text-primary text-decoration-underline fst-normal fw-medium"
                            >
                              Terms of Use
                            </Link>
                          </p>
                        </div>

                        <div className="mt-4">
                          <button
                            className="btn btn-success w-100"
                            type="submit"
                          >
                            Sign Up
                          </button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Already have an account ?{" "}
                    <Link
                      href="/auth/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Signin{" "}
                    </Link>{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default Register;
