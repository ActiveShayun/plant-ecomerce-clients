import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { imgBbUpload } from '../../../api/utility'
import axios from 'axios'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import toast from 'react-hot-toast'

const AddPlant = () => {
  const { user } = useContext(AuthContext)

  const axiosSecure = useAxiosSecure()
  const [imageData, setImageData] = useState([])
  const [imagePreview, setImagePreview] = useState(null);
  const [fileType, setFileType] = useState(""); // Store file type

  const handleImageChance = (e) => {
    const file = e.target.files[0]
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload a valid image file (JPG, PNG, etc.)");
      return;
    }

    setFileType(file.type)

    const render = new FileReader();
    render.onload = (e) => {
      setImagePreview(e.target.result) // Set image preview URL
    }
    render.readAsDataURL(file)  // Convert file to Data URL
  }

  const handleAddPlanet = async e => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const description = form.description.value;
    const quantity = form.quantity.value;
    const price = parseInt(form.price.value)
    const image = form.image.files[0]

    const img_url = await imgBbUpload(image)
    console.log(img_url);

    const seller = {
      name: user?.displayName,
      photo: user?.photoURL,
      email: user?.email
    }

    const planets = {
      name, category, description, quantity, price, image: img_url, seller
    }
    console.log(planets);

    const res = await axiosSecure.post('/add-planet', planets)
    console.log('add planet', res);
    if (res.data.acknowledged) {
      toast.success('Plant Add SuccessFul')
    }
  }


  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleAddPlanet={handleAddPlanet}
        setImageData={setImageData}
        imageData={imageData}
        imagePreview={imagePreview}
        handleImageChance={handleImageChance}
        fileType={fileType}
      />

    </div>
  )
}

export default AddPlant
