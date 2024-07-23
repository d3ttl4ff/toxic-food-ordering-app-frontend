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
  "Beastial": "/src/assets/cuisineImages/cauldron.webp",
  "Fleshborne": "/src/assets/cuisineImages/potion.webp",
  "Bloodborne": "/src/assets/cuisineImages/potion.webp",
  "Nibbles": "/src/assets/cuisineImages/cookies.webp",
  "Celestial": "/src/assets/cuisineImages/gem.webp",
  "Shadowroot": "/src/assets/cuisineImages/herbs.webp",
  "Eldritch": "/src/assets/cuisineImages/owl.webp",
  "Mystic": "/src/assets/cuisineImages/potion.webp",
  "Arcane": "/src/assets/cuisineImages/book.webp",
  "Infernal": "/src/assets/cuisineImages/cauldron.webp",
  "Cursed": "/src/assets/cuisineImages/window.webp",
  "Draconic": "/src/assets/cuisineImages/staff.webp",
  "Abyssal": "/src/assets/cuisineImages/cauldron.webp",
  "Spectral": "/src/assets/cuisineImages/window.webp",
  "Haunted": "/src/assets/cuisineImages/window.webp",
  "Necrotic": "/src/assets/cuisineImages/cauldron.webp",
  "Wraithfare": "/src/assets/cuisineImages/cauldron.webp",
  "Phantasmal": "/src/assets/cuisineImages/window.webp",
  "Lich": "/src/assets/cuisineImages/window.webp",
  "Revenant": "/src/assets/cuisineImages/window.webp",
  "Forbidden": "/src/assets/cuisineImages/book.webp",
  "Vampire": "/src/assets/cuisineImages/potion.webp",
  "Vittles": "/src/assets/cuisineImages/cookies.webp",
  "Enchanted": "/src/assets/cuisineImages/gem.webp",
  "Hexed": "/src/assets/cuisineImages/window.webp",
  "Twilight": "/src/assets/cuisineImages/window.webp",
  "DoomDew": "/src/assets/cuisineImages/potion.webp",
  "Fiendish": "/src/assets/cuisineImages/cauldron.webp",
  "Delights": "/src/assets/cuisineImages/cookies.webp",
  "Darkling": "/src/assets/cuisineImages/window.webp",
  "NightDew": "/src/assets/cuisineImages/tea.webp",
  "Elixir": "/src/assets/cuisineImages/potion.webp",
  "Spellbound": "/src/assets/cuisineImages/book.webp",
  "Moonshine": "/src/assets/cuisineImages/tea.webp",
  "Soul": "/src/assets/cuisineImages/puff.webp",
  "DragonBreath": "/src/assets/cuisineImages/cauldron.webp",
  "Witch's": "/src/assets/cuisineImages/cauldron.webp",
  "Sorcerer's": "/src/assets/cuisineImages/cauldron.webp",
  "BloodySweets": "/src/assets/cuisineImages/toffee.webp",
  "Rotten": "/src/assets/cuisineImages/herbs.webp",
  "Blood": "/src/assets/cuisineImages/potion.webp"
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
