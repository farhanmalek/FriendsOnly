import CreateMessage from '../components/CreateMessage'

function Home() {


  return (
    <div className='flex flex-col items-center gap-2'>
      <h1 className='font-bold'>Message Center</h1>
      <div className='flex flex-col gap-1'>
      <CreateMessage/>
      </div>

    </div>
  )
}

export default Home