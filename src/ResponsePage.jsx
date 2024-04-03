import React from "react";

function ResponsePage(props) {
  // Check if props.location or props.location.state are undefined
  if (!props.location || !props.location.state) {
    // If either is undefined, render an error message

    console.log("Props Location State:", props.location.state);
    return (
      <div>
        <h1>Error</h1>
        <p>Unexpected Application Error! Unable to retrieve response data.</p>
      </div>
    );
  }

  // Destructure response from props
  const { response } = props.location.state;

  console.log("Props Location State:", props.location.state);


  return (
    <div>
      <h1>JSON Response</h1>
      <div>
        <p>ID: {response.id}</p>
        <p>Username: {response.username}</p>
        <p>Email: {response.email}</p>
        <p>First Name: {response.firstName}</p>
        <p>Last Name: {response.lastName}</p>
        <p>Gender: {response.gender}</p>
        <p>
          Image: <img src={response.image} alt="Profile" />
        </p>
        <p>Token: {response.token}</p>
      </div>
    </div>
  );
}

export default ResponsePage;
