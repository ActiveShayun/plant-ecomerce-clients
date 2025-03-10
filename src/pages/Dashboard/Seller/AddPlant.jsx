import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { imgBbUpload } from '../../../api/utility'
import axios from 'axios'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const AddPlant = () => {
  const axiosSecure = useAxiosSecure()

  const handleAddPlanet = async e => {
  
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const description = form.description.value;
    const price = form.price.value;
    const image = form.image.files[0]

    const img_url = await imgBbUpload(image)
    console.log(img_url);

    const planets = {
      name, category, description, price, image: img_url
    }
    console.log(planets);

    const res = await axiosSecure.post('/add-planet', planets)
    console.log('add planet', res);
  }
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleAddPlanet={handleAddPlanet} />
    </div>
  )
}

export default AddPlant
