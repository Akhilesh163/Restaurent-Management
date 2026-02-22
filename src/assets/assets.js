


import cake from './cake.jpg'
import desert from './desert.jpg'
import images from './images.jpg'
import past from './past.jpg'
import roll from './roll.jpg'
import Sandwich from './Sandwich.jpg'

import greeksalad from './greeksalad.jpeg'
import vegsalad from './vegsalad.webp'
import chickensalad from './chickensalad.jpeg'
import cloversalad from './cloversalad.jpeg'
import lasganaroll from './lasrolls.jpg'
import chickenroll from './chickenroll.jpg'
import vegroll from './vegroll.jpg'
import periroll from './periroll.jpg'
import plus from './plus.svg'
import cut from './cut.svg'
import play from './play.png'
import apple from './apple.png'
import profile from './profile.svg'
import logout from './logout.svg'
import bag from './bag.svg'
export const assets = {
  plus,
  cut,
  play,
  apple,
  profile,
  logout,
  bag
}

export const food_list = [
  {
    _id: "1",
    name: "Greek Salad",
    image: greeksalad,
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being.",
    category: "Salad",
  },
  {
    _id: "2",
    name: "Veg Salad",
    image: vegsalad,
    price: 10,
    description: "A fresh and nutritious vegetable salad rich in fiber and vitamins.",
    category: "Salad",
  },
  {
    _id: "3",
    name: "Chicken Salad",
    image: chickensalad,
    price: 14,
    description: "Grilled chicken served with mixed greens and house dressing.",
    category: "Salad",
  },
  {
    _id: "4",
    name: "Clover Salad",
    image: cloversalad,
    price: 11,
    description: "A light, refreshing salad with clover sprouts and tangy vinaigrette.",
    category: "Salad",
  },
  {
    _id: "5",
    name: "Lasagna Roll",
    image: lasganaroll,
    price: 16,
    description: "Classic lasagna rolled with cheese, herbs, and hearty meat sauce.",
    category: "Roll",
  },
  {
    _id: "6",
    name: "Chicken Roll",
    image: chickenroll,
    price: 13,
    description: "Juicy chicken wrapped in a warm roll with spicy mayo.",
    category: "Pasta",
  },
  {
    _id: "7",
    name: "Veg Roll",
    image: vegroll,
    price: 11,
    description: "A wholesome roll packed with fresh vegetables and sauces.",
    category: "Roll",
  },
  {
    _id: "8",
    name: "Peri Peri Roll",
    image: periroll,
    price: 14,
    description: "Spicy peri peri flavored roll with grilled fillings and herbs.",
    category: "Roll",
  }
];

export const menu_list=[
    {
        menu_name:"Cakes",
       menu_image:cake
    },
    {
       menu_name:"Desert",
       menu_image:desert 
    },
    {
       menu_name:"Salad",
       menu_image:images 
    },
    {
       menu_name:"Desert",
       menu_image:desert 
    },
    {
       menu_name:"Pasta",
       menu_image:past 
    },
    {
       menu_name:"Roll",
       menu_image:roll
    },
    {
       menu_name:"Sandwich",
       menu_image:Sandwich
    },
 ]