/* eslint-disable no-useless-assignment */
import { useCallback, useEffect, useState } from "react";
import { ProductItem } from "../ProductItem/ProductItem";
import "./style.css";
import { useTelegram } from "../../hooks/useTelegram";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
}

const products: IProduct[] = [
  {
    id: 1,
    title: "Джинсы",
    price: 5000,
    description: "Синего цвета, прямые",
  },
  {
    id: 2,
    title: "Куртка",
    price: 12000,
    description: "Зеленого цвета, теплая",
  },
  {
    id: 3,
    title: "Кроссовки",
    price: 8000,
    description: "Белые, спортивные",
  },
  {
    id: 4,
    title: "Футболка",
    price: 2000,
    description: "Черная, базовая",
  },
];

const getTotalPrice = (items: IProduct[] = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

export function ProductList() {
  const [addedItems, setAddedItems] = useState<IProduct[]>([]);
  const { tg , queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId
    };

    fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, [addedItems]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);

    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  const onAdd = (product: IProduct) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems: IProduct[] = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(addedItems)}`,
      });
    }
  };

  return (
    <div className="list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
}
