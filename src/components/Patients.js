import { useEffect, useState, useContext, useRef } from "react";
import UserService from "../services/user.service";
import UserContext from "../services/UserContext";
import { Map, ZoomControl, Marker } from "pigeon-maps";

const Patients = () => {
    const [loading, setLoading] = useState(true)
    const [places, setPlaces] = useState([])
    const [patients, setPatients] = useState([])
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [count, setCount] = useState(null)
    const didMount = useRef(false);
    useEffect(() => {

        const getPatients = async () => {
            if (currentUser) {
                // try {
                let result = await UserService.getPatients();

                if (result) {
                    console.log("result", result)
                    let data = result.data
                    setCount(data.count)
                    setPatients(data.users)
                }
                // } catch (e) {
                //     setLoading(false)
                //     console.log(e)

                // }
                console.log("current", currentUser)
            }
        }
        getPatients()
    }, [])

    useEffect(() => {

        if (didMount.current) {

            const getPlaces = (data) => {
                if (data) {
                    const result = data.
                        filter(x => x.lat && x.lng)
                        .map(x => {
                            return { position: [x.lat, x.lng], id: x._id.$oid }

                        })
                    setPlaces(result)
                }

            }
            getPlaces(patients);

        }
    }, [patients])


    useEffect(() => {

        if (didMount.current) {

            setLoading(false)

        } else {
            didMount.current = true;
        }

    }, [places])


    if (!loading) {
        return <div>
            <h2 className="text-center">  patients Map </h2>
            <hr/>
            <h4> Patients count : {count} </h4>
            <h4> patients with avalilable Location : {places.length}</h4>
            <Map height={400} defaultCenter={[10, 10]} defaultZoom={1}>
                <ZoomControl />
                {
                    places.map(place => {
                        return <Marker
                            key={place.id}
                            width={20}
                            anchor={place.position}
                            color="red"
                        />
                    })
                }

            </Map>
        </div>
    }
}



export default Patients;