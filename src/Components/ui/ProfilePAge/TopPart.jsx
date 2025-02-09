import placeholderimg from '../../../assets/user_profile.jpg'
function TopPart({user}) {
  return (
    <>
    <div className='flex  items-center justify-center   px-20 h-40 w-[2000px] absolute top-0 bg-opacity-60 rounded-t-md bg-lightModelightBg dark:bg-lightBgclr'>
         {user?.user_metadata.photoURL ? <img src={user.user_metadata.photoURL || placeholderimg} className='rounded-full max-w-[150px] max-h-[150px] sm:min-w-[100px] md:min-w-[120px] sm:min-h-[100px] md:min-h-[120px] relative top-20'/>
         :<div className='flex uppercase  items-center justify-center text-6xl  rounded-full bg-amber-400 max-w-[150px] max-h-[150px] sm:min-w-[100px] md:min-w-[120px] sm:min-h-[100px] md:min-h-[120px] relative top-20'>{user?.user_metadata.email.split('')[0]}</div>}
         

    </div>
    <div className='flex flex-col font-[700] items-center gap-2 pt-56 pb-20'>
        <p className='text-center text-2xl  font-mono'>Hi, {user?.user_metadata.first_name || 'Username'}</p>
        <p className='text-center text-sm'></p>
    </div>

    </>
  )
}

export default TopPart