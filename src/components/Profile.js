import { useContext, useEffect, useState, useRef } from "react"
import UserService from "../services/user.service"
import UserContext from "../services/UserContext"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { required } from "./helper/validation-functions";



const Profile = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [message, setMessage] = useState("");
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [locatingStatus, setLocatingStatus] = useState(null);
    const [success, setSuccess] = useState(null)
    const [formLoading, setFormLoading] = useState(false)
    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name)
    };

    const onChangeAge = (e) => {
        const age = e.target.value;
        setAge(age);
    };

    const onChangeTemperature = (e) => {
        const temperature = e.target.value;
        setTemperature(temperature);
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        setFormLoading(true)
        setMessage("");
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            UserService.updateUser({
                name,
                age,
                lat,
                lng,
                temperature
            }).then(
                (response) => {
                    setSuccess(true)
                    setMessage("Your data is updated")
                    setFormLoading(false)
                }
            ).catch(e => {
                setFormLoading(false)
                setSuccess(false)
                console.log(e)
                if (e.response && e.response.data) {
                    setMessage(e.response.data.message);
                    return;
                }
                console.log("error from sing up ", e)
                setMessage("Something Wrong");
            })
        }
    };

    const getLocation = async () => {
        if (!navigator.geolocation) {
            setLocatingStatus('not supported by your browser');
        } else {
            setLocatingStatus('Locating...');
            navigator.geolocation.getCurrentPosition(async (position) => {
                setLocatingStatus("done");
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            }, () => {
                setLocatingStatus('Unable to retrieve your location');
            });
        }
        console.log("lat", lat)
    }

    useEffect(() => {

        const getUser = async () => {
            if (currentUser) {
                try {
                    let result = await UserService.getUser();
                    if (result) {
                        console.log("result", result)
                        let data = result.data.data
                        setUser(data)
                        setName(data.name)
                        setTemperature(data.temperature)
                        if (data.lat && data.lng) {
                            setLat(data.lat)
                            setLng(data.lng)
                        }
                        getLocation();
                        setAge(data.age)
                        setLoading(false)
                        console.log("lat", lat)
                    }
                } catch (e) {
                    setLoading(false)
                    console.log(e)

                }
                console.log("current", currentUser)
            }
        }

        getUser();

    }, [])

    if (!loading) {
        return <div className="container bootstrap snippets bootdey">
            <h1 className="text-center text-primary">Edit Profile</h1>
            <hr />
            <div className="row">
                {success !== null ?
                    <div
                        className={success ?
                            "alert alert-success text-center"
                            :
                            "alert alert-danger text-center"}
                        role="alert">
                        {message}
                    </div> : ""
                }
                {((!lat || !lng) && navigator.geolocation && locatingStatus != "done") ?
                    <div className="text-center alert alert-warning" role="alert">
                        We need to access your loaction, please enable it
                    </div>

                    :
                    null}
                <div className="col-md-3"></div>


                <div className="col-md-9 personal-info">
                    <h3>Personal info</h3>

                    <Form className="form-horizontal" onSubmit={handleUpdate} ref={form}>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">name:</label>
                            <div className="col-lg-8">
                                <Input
                                    className="form-control"
                                    type="text"
                                    value={name}
                                    onChange={onChangeName}
                                    placeholder="Enter Your name"
                                    validations={[required]}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Age:</label>
                            <div className="col-lg-8">
                                <Input
                                    className="form-control"
                                    type="number"
                                    placeholder="Enter your Age"
                                    value={age}
                                    onChange={onChangeAge}
                                    validations={[required]}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Your Temperature:</label>
                            <div className="col-lg-8">
                                <Input
                                    className="form-control"
                                    type="number"
                                    value={temperature}
                                    validations={[required]}
                                    onChange={onChangeTemperature}
                                    placeholder="log your Temperature"
                                />
                            </div>
                            <div className="">
                                <br />
                                <button className="btn btn-primary">
                                    {formLoading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Update</span>
                                </button>

                            </div>
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </div>


                    </Form>
                </div>
            </div>
        </div>
    }

}
export default Profile