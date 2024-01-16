import "./single.scss";

const Single = ({ userData }: { userData: any }) => {
  function separateDateAndTime(dateTimeString: any) {
    let dateTime = new Date(dateTimeString);

    if (isNaN(dateTime.getTime())) {
      // Handle invalid date-time string
      return null;
    }

    let date = dateTime.toISOString().split("T")[0];
    let time = dateTime.toISOString().split("T")[1].split(".")[0];

    return {
      date: date,
      time: time,
    };
  }

  return (
    <div className="single">
      {userData.fullName ? (
        <div className="view">
          <div className="info">
            <div className="topInfo">
              <img src="/noavatar.png" alt="" />
              <h1>{userData.fullName}</h1>
              {/* <button>Update</button> */}
            </div>
            <div className="details">
              <div className="item">
                <span className="itemTitle">ID : </span>
                <span className="itemValue">{userData._id}</span>
              </div>
              <div className="item">
                <span className="itemTitle">Email Address : </span>
                <span className="itemValue">{userData.emailAddress}</span>
              </div>
              <div className="item">
                <span className="itemTitle">Phone Number : </span>
                <span className="itemValue">{userData.phoneNumber}</span>
              </div>
              <div className="item">
                <span className="itemTitle">User Type : </span>
                <span className="itemValue">{userData.userType}</span>
              </div>
              <div className="item">
                <span className="itemTitle">Created Date : </span>
                <span className="itemValue">
                  {separateDateAndTime(userData.createdAt)?.date}
                </span>
              </div>
              <div className="item">
                <span className="itemTitle">Created Time : </span>
                <span className="itemValue">
                  {separateDateAndTime(userData.createdAt)?.time}
                </span>
              </div>
              <div className="item">
                <span className="itemTitle">Updated Date : </span>
                <span className="itemValue">
                  {separateDateAndTime(userData.updatedAt)?.date}
                </span>
              </div>
              <div className="item">
                <span className="itemTitle">Updated Time : </span>
                <span className="itemValue">
                  {separateDateAndTime(userData.updatedAt)?.time}
                </span>
              </div>
            </div>
          </div>
          <hr />
        </div>
      ) : (
        <p>No Data Available...</p>
      )}
    </div>
  );
};

export default Single;
