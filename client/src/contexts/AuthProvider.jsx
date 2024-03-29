import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const navigate = useNavigate();

  
// check if a user is logged in when the component loads.
  useEffect(() => {
    const loginCheck = async () => {
      const res = await fetch("/api/sessions");
      const user = await res.json();
      if (res.status === 200) setUser(user);

      setIsLoadingUser(false);
    };
    setIsLoadingUser(true);
    loginCheck();
  }, []);


  // register user  logic to api
  const register = async (fields) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    const data = await res.json();
     if (!res.ok) {
      throw {
        status: res.status,
        message: data.error,
      };
    }
    setUser(data);
   
  };

  // loging user logic to api
  const login = async (fields) => {
    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const data = await res.json();
    if (!res.ok) {
      throw {
        status: res.status,
        message: data.error,
      };
    }
    setUser(data);
    setIsLoadingUser(false);
    
  };

  const updateUser = async (newFields) => {
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFields),
    });
    const updatedUser = await res.json();
    if (!res.ok) {
      throw {
        status: res.status,
        message: data.error,
      };
    }
    setUser({ ...user, ...updatedUser });
    
  };

  const logout = async (id) => {
    const res = await fetch("api/sessions", {
      method: "DELETE",
    });
    setUser(null);
    navigate("/landing");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoadingUser,
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
