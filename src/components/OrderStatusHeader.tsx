import { useState, useEffect } from "react";
import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-config";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [deliveryTime, setDeliveryTime] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (order.status === "delivered" && !deliveryTime) {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setDeliveryTime(`${hours}:${paddedMinutes}`);
    }
  }, [order.status, deliveryTime]);

  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);
    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const getETA = () => {
    const created = new Date(order.createdAt);
    const expectedDelivery = new Date(created);
    expectedDelivery.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const now = currentTime;
    const diff = expectedDelivery.getTime() - now.getTime();
    const etaMinutes = Math.floor(Math.abs(diff) / 60000);
    const etaSeconds = Math.floor((Math.abs(diff) % 60000) / 1000);

    const paddedSeconds = etaSeconds < 10 ? `0${etaSeconds}` : etaSeconds;

    return diff > 0
      ? `${etaMinutes}:${paddedSeconds}`
      : `-${etaMinutes}:${paddedSeconds}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span>Order Status: {getOrderStatusInfo().label}</span>
        <div className="flex flex-col items-start md:items-end gap-2">
          <span>Expected by: {getExpectedDelivery()}</span>
          <span
            className={`text-base ${
              getETA().startsWith("-") && order.status !== "delivered"
                ? "text-limeTheme-warning_base_500"
                : ""
            }`}
          >
            {getOrderStatusInfo().progressValue === 100
              ? `Delivered at: ${deliveryTime}`
              : `ETA: ${getETA()}`}
          </span>
        </div>
      </h1>

      <Progress
        className={
          getOrderStatusInfo().progressValue === 100 ? "" : "animate-pulse"
        }
        value={getOrderStatusInfo().progressValue}
        color={getOrderStatusInfo().progressValue === 100 ? "#65a30d" : ""}
      />
    </>
  );
};

export default OrderStatusHeader;
