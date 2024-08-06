import {
    Select
} from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
const SelectCity = ({ city = "", setCity = () => {} }) => {
  const [listProvince, setListProvince] = useState([]);

  const getListProvince = async () => {
    fetch(
      "https://raw.githubusercontent.com/phuockaito/KaitoShop.cf/master/src/data.json"
    ).then((res) =>
      res.json().then((city) => {
        setListProvince(
          city.map((ct) => {
            if (ct?.name?.indexOf("Tỉnh") >= 0) {
              ct.name = ct.name.substring(5);
            } else if (ct?.name?.indexOf("Thành Phố") >= 0) {
              ct.name = ct.name.substring(10);
            }
            return ct;
          })
        );
      })
    );
  };

  useEffect(() => {
    getListProvince();
  }, []);

  return (
    <>
      <Select
        placeholder=""
        value={city}
        onChange={(v) => {
            console.log(v)
            setCity(v?.target?.value)
        }}
        style={{ width: "100%" }}
      >
        <option value={""}>{"Tất cả thành phố"}</option>
        {listProvince.map((item) => (
          <option value={item.name}>{item.name}</option>
        ))}
      </Select>
    </>
  );
};
export default SelectCity;
