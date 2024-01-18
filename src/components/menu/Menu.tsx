import { Link } from "react-router-dom";
import "./menu.scss";
import { menu } from "../../data";
import { useState, useEffect } from "react";

const Menu = () => {
  const [UserType, SetUserType] = useState("");

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      SetUserType(storedUser.userType);
    }
  }, []);

  return UserType != "customer" ? (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} className="listItem" key={listItem.id}>
              <img src={listItem.icon} alt="" style={{ width: "20px" }} />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  ) : (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) =>
            listItem.title == "Devices" ? (
              <Link to={listItem.url} className="listItem" key={listItem.id}>
                <img src={listItem.icon} alt="" style={{ width: "20px" }} />
                <span className="listItemTitle">{listItem.title}</span>
              </Link>
            ) : null
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
