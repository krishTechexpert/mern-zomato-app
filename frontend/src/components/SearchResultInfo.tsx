import { Link } from 'react-router-dom';

type Props ={
  total:number;
  city:string;
}

export default function SearchResultInfo({total,city}:Props) {
  return (
    <div className='text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row'>
      <span>
        {total} Restaurants found in {city}
        <Link to="/" className='font-sm pl-2 font-semibold cursor-pointer underline text-blue-500'>Change location</Link>
      </span>
    </div>
  )
}
