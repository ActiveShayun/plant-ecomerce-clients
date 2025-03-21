import Card from './Card'
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../Shared/LoadingSpinner'


const Plants = () => {
  const axiosSecure = useAxiosSecure()

  const { data: allPlant = [], isLoading } = useQuery({
    queryKey: ['plant'],
    queryFn: async () => {
      const res = await axiosSecure.get('/allPlant')
      console.log('allPlant', res.data);
      return res.data
    }
  })

  if (isLoading) {
    return <LoadingSpinner />
  }


  return (
    <Container>
      {
        allPlant.length === 0 ? <p className='text-2xl font-bold text-center'>No Data Available</p>
          :
          <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {
              allPlant?.map(plant => <Card key={plant._id} plant={plant} />)
            }

          </div>
      }

    </Container>
  )
}

export default Plants
