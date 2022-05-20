/* eslint-disable react/jsx-props-no-spreading */
import axios, { AxiosError } from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";

type Data = { [key: string]: string } | null;
type Isloading = boolean;
type TextsError = string | null;
export type Texts = { data: Data; isLoading: Isloading; error: TextsError };

export const withStaticDataProp = <T,>(
  Component: React.ComponentType<T>,
  staticDataEndpoint: string
) => {
  return (props: T) => {
    const [data, setData] = useState<Data>(null);
    const [isLoading, setLoading] = useState<Isloading>(true);
    const [error, setError] = useState<TextsError>(null);

    useEffect(() => {
      (async () => {
        try {
          const response = await axios.get(staticDataEndpoint);
          const texts = response?.data?.texts;
          if (!texts) {
            setError("Could not find texts in static data");
          }
          setData(texts);
          setError(null);
        } catch (err) {
          console.log("HIIIIIIIIIII");

          const requestError = err as Error | AxiosError;
          if (axios.isAxiosError(requestError)) {
            setError(requestError.message);
            setData(null);
          }
        } finally {
          setLoading(false);
        }
      })();
    }, []);
    console.log(data);
    if (!data) {
      return <Component {...props} />;
    }
    // console.log(data);

    // let updatedProps = { ...props };
    // Object.keys(data).forEach((key) => {
    //   const propertyName = _.camelCase(`string-${key.replace(".", "-")}`);
    //   updatedProps = {
    //     [propertyName]: data[key],
    //     ...updatedProps
    //   };
    // });
    const updatedProps: {
      texts: { data: Data; isLoading: Isloading; error: TextsError };
    } = {
      ...props,
      texts: {
        data,
        isLoading,
        error
      }
    };
    return <Component {...updatedProps} />;
  };
};

export default {};
