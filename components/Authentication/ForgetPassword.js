import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
  Spinner,
} from "reactstrap";

import Link from "next/link";

// import images
// import profile from "../../assets/images/bg.png";
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

import { patchChangePassword } from "@/helpers/backend_request";

const ForgetPasswordPage = (props) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await patchChangePassword({ email });
    response.data?.success
      ? setStatus(response.data.success)
      : setError(response.data?.error);
    setLoading(false);
  };

  return (
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
                    <h5 className="text-primary">Forgot Password?</h5>
                    <p className="text-muted">Reset password with velzon</p>

                    <lord-icon
                      src="https://cdn.lordicon.com/rhvddzym.json"
                      trigger="loop"
                      colors="primary:#0ab39c"
                      className="avatar-xl"
                      style={{ width: "120px", height: "120px" }}
                    ></lord-icon>
                  </div>

                  {status ? (
                    <Alert
                      className="alert-borderless alert-warning text-center mb-2 mx-2"
                      role="alert"
                    >
                      Please check your email !
                    </Alert>
                  ) : error != null ? (
                    <Alert
                      className="alert-borderless alert-warning text-center mb-2 mx-2"
                      role="alert"
                    >
                      {error}
                    </Alert>
                  ) : (
                    <Alert
                      className="alert-borderless alert-warning text-center mb-2 mx-2"
                      role="alert"
                    >
                      Enter your email and instructions will be sent to you!
                    </Alert>
                  )}
                  <div className="p-2">
                    <Form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          value={email}
                          onChange={({ target }) => setEmail(target.value)}
                        />
                      </div>

                      <div className="text-center mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          {loading ? <Spinner /> : "Send Reset Link"}
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  Wait, I remember my password...{" "}
                  <Link
                    href="/auth/login"
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    {" "}
                    Click here{" "}
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

export default ForgetPasswordPage;
