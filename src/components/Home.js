import { Link } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../services/UserContext"

const Home = () => {
    const { currentUser } = useContext(UserContext);
    if (!currentUser) {
        return (
            <div className="text-center">
                <p>Welcome to tracking COVID-19 patients web site .</p>
                <div><Link to="/login"> Login </Link> or <Link to="/signup">Sign Up</Link>  </div>

            </div>
        )
    }
    return (
        <div>
            <h4 className="text-center text-primary">
                Welcome {currentUser.name}
            </h4>            
        </div>
    )
}

export default Home