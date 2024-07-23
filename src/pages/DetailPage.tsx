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

import beans from "../assets/cuisineImages/beans.webp";
import book from "../assets/cuisineImages/book.webp";
import cauldron from "../assets/cuisineImages/cauldron.webp";
import cookies from "../assets/cuisineImages/cookies.webp";
import gem from "../assets/cuisineImages/gem.webp";
import herbs from "../assets/cuisineImages/herbs.webp";
import owl from "../assets/cuisineImages/owl.webp";
import potion from "../assets/cuisineImages/potion.webp";
import puff from "../assets/cuisineImages/puff.webp";
import rose from "../assets/cuisineImages/rose.webp";
import staff from "../assets/cuisineImages/staff.webp";
import tea from "../assets/cuisineImages/tea.webp";
import toffee from "../assets/cuisineImages/toffee.webp";
import window from "../assets/cuisineImages/window.webp";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const cuisineImageMapping: { [key: string]: string } = {
  "Beastial": owl,
  "Fleshborne": cauldron,
  "Bloodborne": cauldron,
  "Nibbles": cookies,
  "Celestial": book,
  "Shadowroot": rose,
  "Eldritch": staff,
  "Mystic": herbs,
  "Arcane": staff,
  "Infernal": book,
  "Cursed": potion,
  "Draconic": beans,
  "Abyssal": cookies,
  "Spectral": puff,
  "Haunted": book,
  "Necrotic": gem,
  "Wraithfare": puff,
  "Phantasmal": puff,
  "Lich": gem,
  "Revenant": owl,
  "Forbidden": beans,
  "Vampire": window,
  "Vittles": cookies,
  "Enchanted": rose,
  "Hexed": cauldron,
  "Twilight": gem,
  "DoomDew": tea,
  "Fiendish": book,
  "Delights": toffee,
  "Darkling": cookies,
  "NightDew": potion,
  "Elixir": potion,
  "Spellbound": staff,
  "Moonshine": potion,
  "Soul": herbs,
  "DragonBreath": owl,
  "Witch's": cauldron,
  "Sorcerer's": staff,
  "BloodySweets": toffee,
  "Rotten": herbs,
  "Blood": cauldron, 
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
            const firstWord = menuItem.name.split(" ")[0];
            const imageUrl = cuisineImageMapping[firstWord];

            return (
              <div className="flex items-center justify-between gap-5">
                <MenuItem
                  menuItem={menuItem}
                  addToCart={() => addToCart(menuItem)}
                />
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={`${firstWord} cuisine image`}
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
