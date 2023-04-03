import React, { useState, useEffect } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";

function UserPage() {
  // Post Data
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [departureTimeValue, setDepartureTimeValue] = useState("");
  const [landingTimeValue, setLandingTimeValue] = useState("");
  const [priceValue, setPriceValue] = useState("");

  const handleFromValue = (e) => {
    const from = e.target.value;
    setFromValue(from);
  };
  const handleToValue = (e) => {
    const to = e.target.value;
    setToValue(to);
  };
  const handleDepartureTimeValue = (e) => {
    const fromTime = e.target.value;
    setDepartureTimeValue(fromTime);
  };
  const handleLandingTimeValue = (e) => {
    const toTime = e.target.value;
    setLandingTimeValue(toTime);
  };
  const handlePriceValue = (e) => {
    const price = e.target.value;
    setPriceValue(price);
  };

  const postFlight = async (e) => {
    try {
      const response = await fetch("https://flights-2iu9.onrender.com:10000/list", {
        method: "POST",
        body: JSON.stringify({
          from: fromValue,
          to: toValue,
          departureTime: departureTimeValue,
          landingTime: landingTimeValue,
          price: priceValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log("Success:", JSON.stringify(json));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Flights List
  const [items, setItems] = useState([]);
  useEffect(() => {
    (async () => {
      const list = await fetch("https://flights-2iu9.onrender.com:10000/list");
      const data = await list.json();
      setItems(data);
    })();
  }, []);

  // Search flights
  const result = items.length !== 0 ? items : [];
  const [searchTerm, setSearchTerm] = useState("");
  const r = searchTerm
    .trim()
    .replace(/ +(?= )/g, "")
    .trim();

  const resultLength =
    result !== [] &&
    result.filter((val) => {
      if (searchTerm.trim().length !== 0) {
        return (
          val.from.toLowerCase().includes(r.toLowerCase()) ||
          val.to.toLowerCase().includes(r.toLowerCase())
        );
      } else {
        return false;
      }
    });

  return (
    <div className="user-page mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-6 d-flex justify-content-start">
          <h2 className="first-title-page">FLIGHT APP</h2>
        </div>

        <div className="col-6 d-flex justify-content-end">
          <input
            className="search"
            type="text"
            placeholder="Search flights"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>

        <div className="col-12 text-center">
          <form onSubmit={postFlight} className="form-submit">
            <label>
              <p>From</p>
              <input onChange={handleFromValue} type="text" required />
            </label>
            <label>
              <p>To</p>
              <input onChange={handleToValue} type="text" required />
            </label>

            <label>
              <p>Departure Time</p>
              <input onChange={handleDepartureTimeValue} type="text" required />
            </label>

            <label>
              <p>Landing Time</p>
              <input onChange={handleLandingTimeValue} type="text" required />
            </label>

            <label>
              <p>Price Value ( USD )</p>
              <input onChange={handlePriceValue} type="text" required />
            </label>
            <div className="col-12 d-flex justify-content-center">
              <button className="btn-form" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-12">
          <Table className="table" responsive="lg" striped bordered hover>
            <thead>
              <tr>
                <th width="25%">FROM</th>
                <th width="25%">TO</th>
                <th width="20%">DEPARTURE TIME</th>
                <th width="20%">LANDING TIME</th>
                <th width="10%">PRICE</th>
              </tr>
            </thead>
            <tbody>
              <tr>{items.length === 0 && <td>'No flights listed'</td>}</tr>
              {(resultLength.length === 0 ? items : resultLength).map(
                (item) => (
                  <tr key={item.id}>
                    <td>{item.from}</td>
                    <td>{item.to}</td>
                    <td>{item.departureTime}</td>
                    <td>{item.landingTime}</td>
                    <td>{item.price} USD</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
