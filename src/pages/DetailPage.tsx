import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItemType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";

import beans from "../assets/cuisineImages/beansLime.webp";
import book from "../assets/cuisineImages/bookLime.webp";
import cauldron from "../assets/cuisineImages/cauldronLime.webp";
import cookies from "../assets/cuisineImages/cookiesLime.webp";
import gem from "../assets/cuisineImages/gemLime.webp";
import herbs from "../assets/cuisineImages/herbsLime.webp";
import owl from "../assets/cuisineImages/owlLime.webp";
import potion from "../assets/cuisineImages/potionLime.webp";
import puff from "../assets/cuisineImages/puffLime.webp";
import rose from "../assets/cuisineImages/roseLime.webp";
import staff from "../assets/cuisineImages/staffLime.webp";
import tea from "../assets/cuisineImages/teaLime.webp";
import toffee from "../assets/cuisineImages/toffeeLime.webp";
import windowvamp from "../assets/cuisineImages/windowLime.webp";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

// const cuisineImageMapping: { [key: string]: string } = {
//   "Beastial": owl,
//   "Fleshborne": cauldron,
//   "Bloodborne": cauldron,
//   "Nibbles": cookies,
//   "Celestial": book,
//   "Shadowroot": rose,
//   "Eldritch": staff,
//   "Mystic": herbs,
//   "Arcane": staff,
//   "Infernal": book,
//   "Cursed": potion,
//   "Draconic": beans,
//   "Abyssal": cookies,
//   "Spectral": puff,
//   "Haunted": book,
//   "Necrotic": gem,
//   "Wraithfare": puff,
//   "Phantasmal": puff,
//   "Lich": gem,
//   "Revenant": owl,
//   "Forbidden": beans,
//   "Vampire": windowvamp,
//   "Vittles": cookies,
//   "Enchanted": rose,
//   "Hexed": cauldron,
//   "Twilight": gem,
//   "DoomDew": tea,
//   "Fiendish": book,
//   "Delights": toffee,
//   "Darkling": cookies,
//   "NightDew": potion,
//   "Elixir": potion,
//   "Spellbound": staff,
//   "Moonshine": potion,
//   "Soul": herbs,
//   "DragonBreath": owl,
//   "Witch's": cauldron,
//   "Sorcerer's": staff,
//   "BloodySweets": toffee,
//   "Rotten": herbs,
//   "Blood": cauldron,
// };

const cuisineImageMapping2: { [key: string]: string } = {
  Meat: cauldron,
  Soup: cauldron,
  Tart: cookies,
  Elixir: potion,
  Chili: beans,
  Salad: herbs,
  Sushi: gem,
  Noodles: cauldron,
  Waffles: cookies,
  Pastry: puff,
  Lollipop: toffee,
  Roast: rose,
  Vinaigrette: tea,
  Empanadas: cookies,
  Pie: cookies,
  Truffle: cookies,
  Dumplings: toffee,
  Fajitas: cauldron,
  Nectar: potion,
  Morsels: staff,
  Bites: toffee,
  "Stir-fry": cauldron,
  Wontons: cookies,
  Stew: cauldron,
  Bonbons: toffee,
  Ratatouille: owl,
  Biscuits: cookies,
  Fillet: book,
  Burger: cookies,
  Nether: windowvamp,
  Crisps: herbs,
  Muffins: cookies,
  Apples: herbs,
  Curry: cauldron,
  Delicacy: toffee,
  Haggis: herbs,
  Void: windowvamp,
  Tacos: herbs,
  Fondue: tea,
  Pancakes: tea,
  Goulash: herbs,
  Pudding: toffee,
  Sorbet: toffee,
  Pasta: cauldron,
  Rice: cauldron,
  Crackers: cookies,
  Brew: potion,
  Candy: toffee,
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);

    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeCartItem = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isLoading || !restaurant) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SpinnerDotted color="84cc16" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          alt="restaurant image"
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] lg:px-32 md:px-8 gap-5">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => {
            const words = menuItem.name.split(" ");
            const getWord = words[words.length - 1];
            const imageUrl = cuisineImageMapping2[getWord];

            return (
              <div className="flex items-center justify-between gap-5">
                <MenuItem
                  menuItem={menuItem}
                  addToCart={() => addToCart(menuItem)}
                />
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={`${getWord} cuisine image`}
                    className="w-20 h-20 object-cover"
                  />
                )}
              </div>
            );
          })}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeCartItem}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
