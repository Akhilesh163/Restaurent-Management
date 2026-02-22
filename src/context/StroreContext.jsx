
import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";
const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
                              const [cartitems, setcartitems] = useState({});
      const [token,setToken]=useState("")
      const url="http://localhost:4000";
      const [ food_list, setfood_list]=useState([])
      const addToCart = async (itemid) => {
            if (!cartitems[itemid]) {
                  setcartitems((prev) => ({ ...prev, [itemid]: 1 }));
            } else {
                  setcartitems((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }));
            }
            if(token){
              await axios.post(url + "/api/cart/add", { itemId: itemid },   {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              // Fetch latest cart from backend
              await loadCartData(token);
            }
      };

                  const removeFromCart = async(itemid) => {
                        setcartitems((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));
                        if(token){
                          await axios.post(url+"/api/cart/remove",{itemId:itemid},  {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          });
                          // Fetch latest cart from backend
                          await loadCartData(token);
                        }
                  };

      

       const getTotalCartAmount=()=>{
            let totalAmount=0;
            for(const item in cartitems){
             if(cartitems[item]>0){
                  let itemInfo= food_list.find((product)=>product._id===item);
                  totalAmount+= (itemInfo.price * cartitems[item]);
             }
       }
       return totalAmount;
      };


       const fetchFoodList=async()=>{
            const reponse=await axios.get(url+"/api/food/list")
             setfood_list(reponse.data.data)
       }
       const loadCartData=async(token)=>{
                   try {
                         const response = await axios.post(
                               url + "/api/cart/get",
                               {},
                               { headers: { Authorization: `Bearer ${token}` } }
                         );
                         setcartitems(response.data.cartData);
                   } catch (error) {
                         console.error("Failed to fetch cart data:", error);
                         setcartitems([]); // Optionally clear cart on error
                   }
              }
 useEffect(() => {
       async function loadData() {
                  await fetchFoodList();
                  if(localStorage.getItem("token")){
                        setToken(localStorage.getItem("token"))
                        await loadCartData(localStorage.getItem("token"));
                  }
       }
       loadData();
 }, []);

      const contextValue = {
            food_list,
            cartitems,
            setcartitems,
            addToCart,
            removeFromCart,
            getTotalCartAmount,
            url,
            token,
            setToken
      };

      return (
            <StoreContext.Provider value={contextValue}>
                  {props.children}
            </StoreContext.Provider>
      );
};

export { StoreContext };
export default StoreContextProvider;