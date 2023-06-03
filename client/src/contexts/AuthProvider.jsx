import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loginCheck = async () => {
      const res = await fetch("/api/sessions");
      const user = await res.json();
      if (res.status === 200) setUser(user);

        setIsLoadingUser(false)
    };
    setIsLoadingUser(true)
    loginCheck();
  }, []);

  const register = async (fields) =>{
    const res = await fetch("/api/users" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    })
    const data = await res.json();
    if (res.status !== 201) {
      throw {
        status: res.status,
        message: data.message,
      };
    }
    console.log(data)
    setUser(data);
    navigate('/login')
  };

  const login = async (fields) => {
    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const data = await res.json();
    if (res.status !== 200) {
      throw {
        status: res.status,
        message: data.message,
      };
    }
    console.log(data)
    setUser(data);
    setIsLoadingUser(false)
    navigate('/')
  };


  const logout = async (id) => {
    const res = await fetch("api/sessions",{
      method: "DELETE"
    })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoadingUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
