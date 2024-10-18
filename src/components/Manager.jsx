/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  let [form, setform] = useState({
    site: "",
    password: "",
    url: "",
  });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPassword = async () => {
    // eslint-disable-next-line no-unused-vars
    let req = await fetch("http://localhost:3000/");

    let passwords = await req.json();

    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPassword();
  }, []);

  const ShowPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/hidden.png";
      passwordRef.current.type = "text";
    }
  };

  const SavePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      // if any such id exists in the database , delete it .

      await fetch("http://localhost:3000/", {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: form.id } )
      });
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      setform({ site: "", username: "", password: "" });
      console.log([...passwordArray, form]);
    } else {
      alert("Error : password length should be greater than 3");
    }
  };
  const DeletePassword = async (id) => {
    console.log("Deleting Password ", id);
    let c = confirm("Are you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));

      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    }
  };
  const EditPassword = (id) => {
    console.log("Editing Password ", id);

    setform({ ...passwordArray.filter(item => item.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const handleChange = (event) => {
    setform({ ...form, [event.target.name]: event.target.value });
  };

  const CopyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-3  md:mycontainer min-h-[82.5vh]">
        <h1 className="text-3xl font-bold text-center">
          <span className="text-green-600">&lt;</span>
          <span className="text-emerald-950  ">Pass</span>
          <span className="text-green-600">OP</span>
          <span className="text-green-600">/&gt;</span>{" "}
        </h1>
        <p className="text-center font-bold text-green-950  text-2xl">
          Your own password manager
        </p>

        <div className=" flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-600 w-full p-3 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col   md:flex-row  gap-8 w-full justify-between">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-600 w-full p-3 py-1"
              type="text "
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-600 w-full p-3 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className=" absolute  right-0 my-1 cursor-pointer "
                onClick={ShowPassword}
              >
                <img
                  ref={ref}
                  style={{ paddingRight: "5px" }}
                  width={33}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={SavePassword}
            className="flex 
          justify-center items-center bg-green-500 p-3 rounded-full px-8 py-2 w-fit hover:bg-green-300 gap-2 border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-2xl font-bold text-center text-green-900">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && <div> No Passwords</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full  rounded-md overflow-hidden mb-10 ">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2">Website</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 ">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center  py-2 border border-white ">
                        <div className=" flex items-center justify-center gap-2 ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="size-4 "
                            onClick={() => {
                              CopyText(item.site);
                            }}
                          >
                            <img
                              className={"cursor-pointer"}
                              src="icons/copy.png"
                              alt="copy"
                            />
                          </div>
                        </div>
                      </td>
                      <td
                        className=" 
                           text-center  py-2 border border-white"
                      >
                        <div className=" flex items-center justify-center gap-2">
                          <span>{item.username}</span>
                          <div
                            className="size-4 "
                            onClick={() => {
                              CopyText(item.username);
                            }}
                          >
                            <img
                              className={"cursor-pointer"}
                              src="icons/copy.png"
                              alt="copy"
                            />
                          </div>
                        </div>
                      </td>
                      <td
                        className="   
                           text-center  py-3 border border-white "
                      >
                        <div className=" flex items-center justify-center gap-2">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="size-4 "
                            onClick={() => {
                              CopyText(item.password);
                            }}
                          >
                            <img
                              className={"cursor-pointer"}
                              src="icons/copy.png"
                              alt="copy"
                            />
                          </div>
                        </div>
                      </td>
                      <td
                        className="  
                           text-center  py-2 border border-white "
                      >
                        <span
                          className="cursor-pointer mx-1 "
                          onClick={() => {
                            EditPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            DeletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
