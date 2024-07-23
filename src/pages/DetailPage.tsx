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

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const cuisineImageMapping: { [key: string]: string } = {
  "Beastial": "@/assets/cuisine images/cauldron.webp",
  "Fleshborne": "@/assets/cuisine images/potion.webp",
  "Bloodborne": "@/assets/cuisine images/potion.webp",
  "Nibbles": "@/assets/cuisine images/cookies.webp",
  "Celestial": "@/assets/cuisine images/gem.webp",
  "Shadowroot": "@/assets/cuisine images/herbs.webp",
  "Eldritch": "@/assets/cuisine images/owl.webp",
  "Mystic": "@/assets/cuisine images/potion.webp",
  "Arcane": "@/assets/cuisine images/book.webp",
  "Infernal": "@/assets/cuisine images/cauldron.webp",
  "Cursed": "@/assets/cuisine images/window.webp",
  "Draconic": "@/assets/cuisine images/staff.webp",
  "Abyssal": "@/assets/cuisine images/cauldron.webp",
  "Spectral": "@/assets/cuisine images/window.webp",
  "Haunted": "@/assets/cuisine images/window.webp",
  "Necrotic": "@/assets/cuisine images/cauldron.webp",
  "Wraithfare": "@/assets/cuisine images/cauldron.webp",
  "Phantasmal": "@/assets/cuisine images/window.webp",
  "Lich": "@/assets/cuisine images/window.webp",
  "Revenant": "@/assets/cuisine images/window.webp",
  "Forbidden": "@/assets/cuisine images/book.webp",
  "Vampire": "@/assets/cuisine images/potion.webp",
  "Vittles": "@/assets/cuisine images/cookies.webp",
  "Enchanted": "@/assets/cuisine images/gem.webp",
  "Hexed": "@/assets/cuisine images/window.webp",
  "Twilight": "@/assets/cuisine images/window.webp",
  "DoomDew": "@/assets/cuisine images/potion.webp",
  "Fiendish": "@/assets/cuisine images/cauldron.webp",
  "Delights": "@/assets/cuisine images/cookies.webp",
  "Darkling": "@/assets/cuisine images/window.webp",
  "NightDew": "@/assets/cuisine images/tea.webp",
  "Elixir": "@/assets/cuisine images/potion.webp",
  "Spellbound": "@/assets/cuisine images/book.webp",
  "Moonshine": "@/assets/cuisine images/tea.webp",
  "Soul": "@/assets/cuisine images/puff.webp",
  "DragonBreath": "@/assets/cuisine images/cauldron.webp",
  "Witch's": "@/assets/cuisine images/cauldron.webp",
  "Sorcerer's": "@/assets/cuisine images/cauldron.webp",
  "BloodySweets": "@/assets/cuisine images/toffee.webp",
  "Rotten": "@/assets/cuisine images/herbs.webp",
  "Blood": "@/assets/cuisine images/potion.webp"
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
