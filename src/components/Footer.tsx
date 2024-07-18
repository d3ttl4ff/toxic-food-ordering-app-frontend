import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='bg-limeTheme-base_500 py-10'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <span className='text-3xl text-white font-bold tracking-tight'>
                ToxicEats
            </span>
            <span className='text-white font-bold tracking-tight flex gap-4'>
                <Link to="/">Privacy Policy</Link>
                <Link to="/">Terms of Service</Link>
            </span>
        </div>
    </div>
  )
}
