import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getData } from "../../staticData.slice";
import { store } from "../../store";

export const useStaticData = (
  type: "texts" | "data" = "data"
): { loading: boolean; texts?: { [key: string]: string }; data?: unknown } => {
  const { loading, data } = useSelector((state) => state.staticData);

  useEffect(() => {
    const fetchData = async () => {
      if (!loading && !data) {
        await store.dispatch(getData()).then(() => {});
      }
    };
    fetchData();
  }, [loading, data]);

  if (type && data?.[type]) {
    return {
      [type]: data[type],
      loading
    };
  }

  return {
    data,
    loading
  };
};

export default {};
