import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  username: string;
  email: string;
};

interface Data {
  access: boolean;
  payload: User;
}

const profile = () => {
  const navigate = useNavigate();
  const [loaing, setLoading] = useState(true);
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
  });

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");

    const getAuth = async (url: string, token: string | null) => {
      if (!accessToken) {
        return navigate("/");
      }
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json; charset=utf-8",
          authorization: "Bearer " + token,
        },
      });
      const { access, payload } = (await res.json()) as Data;
      if (!access) {
        return navigate("/");
      }
      setUser(payload);
      setLoading(false);
    };

    getAuth("http://localhost:8080/user/profile", accessToken);
  }, []);

  return loaing ? (
    <div className="text-lg text-center text-blue-700 font-medium">
      Loading...
    </div>
  ) : (
    <div className="flex flex-col items-center gap-y-8">
      <h1 className="text-blue-700 text-4xl font-bold">
        Profile of {user.username}
      </h1>
      <h2 className="text-3xl font-medium">Email: {user.email}</h2>
    </div>
  );
};

export default profile;
