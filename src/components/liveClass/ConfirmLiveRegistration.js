import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import M from "materialize-css";

export const ConfirmLiveRegistration = ({ auth, match }) => {
  const [liveClass, setLiveClass] = useState();
  const [loading, setLoading] = useState(false);
  const [useCoupon, setUseCoupon] = useState(false);
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState(0);
  const [discountprice, setDiscountprice] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [agree, setAgree] = useState(false);

  const onRegisterClick = async () => {
    if (!auth.isAuthenticated || auth.user.type !== "student") {
      M.toast({ html: "Please login as a student" });
      return;
    }
    if (liveClass.class_type === "Free") {
      try {
        const { data } = await axios.post(
          `/api/registerliveclass/${auth.user.id}/${liveClass._id}`
        );
        M.toast({ html: data.message });
      } catch (error) {
        M.toast({ html: "Server Error" });
        console.log(error);
      }
    } else if (liveClass.class_type === "Paid") {
      try {
        const { data } = await axios.post(
          `/api/registerliveclass/${auth.user.id}/${liveClass._id}`,
          {
            discountprice: discountprice,
          }
        );
        if (data.status === "success") {
          window.open(data.data);
        } else {
          M.toast({ html: "Server Error" });
          console.log(data.message);
        }
      } catch (error) {
        M.toast({ html: "Server Error" });
        console.log(error);
      }
    }
  };

  const getLiveClass = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/liveclassdetails/${match.params.id}`
      );
      setLiveClass(data);
      setPrice(data.price);
      setDiscountprice(data.price);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const handleDiscound = (coupon) => {
    let disc, discprice;
    if (coupon.discounttype === "percentage") {
      disc = (price / 100) * coupon.discount;
      discprice = price - (price / 100) * disc;
      setDiscount(disc);
      setDiscountprice(discprice);
    } else if (coupon.discounttype === "fixed") {
      disc = (price / 100) * coupon.discount;
      discprice = price - disc;
      setDiscount(disc);
      setDiscountprice(discprice);
    }
  };

  const checkCoupon = async () => {
    try {
      const { data } = await axios.post(`/api/checkcoupon/${auth.user.id}`, {
        coupon: coupon,
      });
      M.toast({ html: data.message });
      if (data.success) {
        handleDiscound(data.coupon);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    getLiveClass();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="section">loading</div>
      ) : (
        <div className="section">
          <h4> Checkout : </h4>
          <table className="centered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{liveClass?.topic}</td>
                <td>
                  {liveClass?.price}৳{" "}
                  <del style={{ color: "red" }}>{liveClass?.fake_price}৳</del>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Total</td>
                <td>{liveClass?.price}৳</td>
              </tr>
            </tbody>
            {discount !== 0 ? (
              <tbody>
                <tr>
                  <td>Coupon : {coupon} applied</td>
                  <td>- {discount.toFixed(2)}৳</td>
                </tr>
              </tbody>
            ) : null}
            <tbody>
              <tr>
                <td>Grand Total</td>
                <td>{discountprice}৳</td>
              </tr>
            </tbody>
          </table>
          <p>
            <label>
              <input
                type="checkbox"
                onChange={() => setUseCoupon(!useCoupon)}
              />
              <span style={{ color: "black" }}>I have a coupon</span>
            </label>
          </p>
          {useCoupon ? (
            <div className="input-field inline row">
              <input
                type="text"
                className="col s6"
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button className="btn btn-small col s6" onClick={checkCoupon}>
                Apply Coupon
              </button>
            </div>
          ) : null}
          <p>
            <label>
              <input type="checkbox" onChange={() => setAgree(!agree)} />
              <span>
                I agree with the{" "}
                <a
                  className="red-text"
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </a>
                ,{" "}
                <a
                  className="red-text"
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  className="red-text"
                  href="/returnRefund"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Return Refund Policy
                </a>
                .
              </span>
            </label>
          </p>

          {agree ? (
            <button className="btn-large blue" onClick={onRegisterClick}>
              {liveClass?.class_type === "Paid" ? (
                <>
                  Confirm payment {discountprice}{" "}
                  <del>{liveClass?.fake_price}</del>
                </>
              ) : (
                <>Confirm Registration</>
              )}
            </button>
          ) : (
            <p>
              You must agree with the Terms and Conditions, Privacy Policy and
              Return Refund Policy{" "}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

ConfirmLiveRegistration.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ConfirmLiveRegistration);
