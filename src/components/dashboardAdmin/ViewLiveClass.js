import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
export default class ViewLiveClass extends Component {
    constructor() {
        super();
        this.state = {
            liveClasses: [],
            price: "",
            fakeprice: ""
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }

    async onSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`/api/admin/setprice/${e.target.value}`)
            console.log(data)
        } catch (error) {
            console.log(error)
        }

    }

    componentDidMount() {
        axios.get('/api/admin/allliveclass')
            .then(res => {
                this.setState({ liveClasses: res.data })
            })
            .catch(err => {
                console.log(err)
            });
        M.Modal.init(this.Modal);
    }
    onApproveClick = (liveId) => e => {
        e.preventDefault();
        axios.post(`/api/admin/approvelive/${liveId}`, {
            price: this.state.price,
            fake_price: this.state.fakeprice
        })
            .then(res => {
                if (res.data.message === 'success') {
                    this.setState(state => {
                        state.liveClasses.find(live => live._id === liveId).approved = true;
                        return state
                    });
                } else {
                    throw Error({ message: "failed" })
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
    render() {
        const liveClasses = this.state.liveClasses.map(liveClass => (
            <li className="collection-item" key={liveClass._id}>
                <div className="row secondary-content">
                    <p className="col">Approval Status :<br />
                        {liveClass.approved ? <span> Approved</span> : <span className="red-text"> Waiting Approval<br /><br /><button onClick={this.onApproveClick(liveClass._id)} className="btn btn-small waves-effect waves-light hoverable black">Approve</button></span>}
                    </p>
                    <Link to={`/liveclass/${liveClass._id}`} className=" btn btn-small blue col">View Details</Link>
                </div>
                <h6>Topic : {liveClass.topic}</h6>
                {/* <div dangerouslySetInnerHTML={{ __html: liveClass.description }} /> */}
                <p>Start Time: {new Date(liveClass.start_time).toLocaleDateString() + " " + new Date(liveClass.start_time).toLocaleTimeString()} </p>
                <p>Duration : {liveClass.duration}</p>
                <p>Type: {liveClass.class_type}</p>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input name="price" onChange={this.onChange} id="price" type="number" min="0" className="validate" />
                            <label htmlFor="price">Price</label>
                        </div>
                        <div className="input-field col s6">
                            <input name="fakeprice" onChange={this.onChange} id="fakeprice" id="price" type="number" min="0" className="validate" />
                            <label htmlFor="fakeprice">Discount price</label>
                        </div>
                    </div>
                    <button type="submit" value={liveClass._id} className="blue btn btn-small">Set Price</button>
                </form>
            </li>
        ));
        return (
            <div style={{ width: "100%", margin: "50px" }}>
                <Link to="/admin/dashboard" className="btn-flat waves-effect red ">
                    <i className="material-icons left">keyboard_backspace</i>Go Back
                </Link>
                <h4 style={{ margin: "50px" }}>Scheduled Classes</h4>
                <ul style={{ textAlign: "left", margin: "30px" }} className="collection">{liveClasses.reverse()}</ul>
                <Link to="/admin/dashboard" className="btn-flat waves-effect red">
                    <i className="material-icons left">keyboard_backspace</i>Go Back
                </Link>
            </div>
        )
    }
}
