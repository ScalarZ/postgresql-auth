import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface Data {
  message: string;
  code: number;
  accessToken: string;
}

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [isSinged, setIsSigned] = useState({ message: "", code: 0 });
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-4xl text-center text-blue-700 font-medium">
        Sing in
      </h1>
      <h2 className="my-4 text-2xl text-center font-medium">
        {isSinged.code === 200 && isSinged.message}
      </h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(8, "Must be at least 8 characters")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          const res = await fetch("http://localhost:8080/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(values),
          });
          const { message, code, accessToken } = (await res.json()) as Data;
          if (code === 200 && accessToken) {
            console.log(message, code, accessToken);
            window.localStorage.setItem("accessToken", accessToken);
            return navigate("/profile");
          }

          setIsSigned({ message, code });
          setLoading(false);
          setSubmitting(false);
        }}
      >
        <Form className="grid place-content-center gap-y-2">
          <label htmlFor="email">Email</label>
          <Field name="email" type="email" />
          <span className="text-xs text-red-600">
            <ErrorMessage name="email" />
            <p className="text-red-600">
              {isSinged.code === 403 && isSinged.message}
            </p>
          </span>

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <span className="text-xs text-red-600">
            <ErrorMessage name="password" />
          </span>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <div className="mt-4 text-sm text-center">{loading && "Loading..."}</div>
    </div>
  );
};

export default Signin;
