"use client";

import { useCallback, useEffect, useState } from "react";
import "./style.css";
import { useTelegram } from "../../hooks/useTelegram";

export function Form() {
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    personType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      ...formData,
    };

    tg.sendData(JSON.stringify(data));
  }, []);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);

    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Відправити данні",
      color: "#171717",
      text_color: "#ffffff",
    });
  }, []);

  useEffect(() => {
    if (!formData.name || !formData.personType || !formData.street) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [formData]);

  return (
    <form className="form">
      <h2 className="form__title">Введіть ваші дані</h2>

      <div className="form__fields">
        <input
          className="form__input"
          type="text"
          name="name"
          placeholder="Ім'я"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          className="form__input"
          type="text"
          name="street"
          placeholder="Вулиця"
          value={formData.street}
          onChange={handleChange}
        />

        <select
          className="form__select"
          name="personType"
          value={formData.personType}
          onChange={handleChange}
        >
          <option value="" disabled>
            Оберіть тип особи
          </option>

          <option value="individual">Фіз. особа</option>
          <option value="company">Юр. особа</option>
        </select>
      </div>
    </form>
  );
}
