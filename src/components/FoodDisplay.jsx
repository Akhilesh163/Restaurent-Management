import React, { useContext } from 'react'

 import {StoreContext} from '../context/StroreContext' 
import Fooditem from '../Fooditem/Fooditem'
const FoodDisplay = ({category}) => {
  
   const { food_list } = useContext(StoreContext);
   let filteredList;
   if (category === "All") {
     filteredList = food_list;
   } else {
     filteredList = food_list.filter(item => item.category === category);
   }

    return (
             <div className='flex flex-col gap-7 overflow-x-scroll items-center justify-center'>
             <h1 className='mt-2   text-5xl font-bold'>Top dishes near you</h1>
                 <div className="flex flex-row justify-start flex-wrap gap-5 ">
                  {filteredList.map((item, index) => (
              <Fooditem  key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
            ))}
          </div>
        </div>
    );
}

export default FoodDisplay