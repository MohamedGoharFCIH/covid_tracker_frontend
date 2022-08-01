import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../services/UserContext';
import UserService from '../services/user.service';
import { useNavigate } from 'react-router-dom';


const Medicines = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true)

  const closeModal = () => {
    console.log("from close")
    navigate("/");
    window.location.reload();
  }
  useEffect(() => {

    const getMedicines = async () => {
      if (currentUser) {
        try {
          let result = await UserService.getMedicines();
          if (result) {
            console.log("result", result)
            let data = result.data.data
            setMedicines(data)
            setLoading(false)
          }
        } catch (e) {
          console.log(e)
          setLoading(false)
        }

      }
    }

    getMedicines();


  }, [])

  console.log(medicines)
  console.log(loading)

  if (!loading) return (
    <Modal
      show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Suggested medicine for You
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(medicines && medicines.length > 0) ?
          medicines.map(medicine => {
            return <div key={medicine._id.$oid}>

              <h4>{medicine.name}</h4>
              {medicine.description ? <p>{medicine.description}</p> : null}
            </div>
          })
          : "You dont have any suggested  medicines"}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Medicines