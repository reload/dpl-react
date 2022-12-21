import React from "react";
import clsx from "clsx";
import { useGetCoverCollection } from "../../core/cover-service-api/cover-service";
import { GetCoverCollectionType } from "../../core/cover-service-api/model";
import { Pid } from "../../core/utils/types/ids";
import { LinkNoStyle } from "../atoms/link-no-style";

export type CoverProps = {
  animate: boolean;
  size: "xsmall" | "small" | "medium" | "large" | "xlarge" | "original";
  tint?: "20" | "40" | "80" | "100" | "120";
  id: Pid | string;
  description?: string;
  url?: URL;
  idType?: GetCoverCollectionType;
};

export const Cover = ({
  url,
  description,
  size,
  animate,
  tint,
  id,
  idType
}: CoverProps) => {
  let dataSize: CoverProps["size"] = size;
  if (dataSize === "xsmall") {
    dataSize = "small";
  } else if (dataSize === "xlarge") {
    dataSize = "large";
  }

  // const { data } = useGetCoverCollection({
  //   type: idType || "pid",
  //   identifiers: [id],
  //   sizes: [dataSize]
  // });
  const imageUrl =
    "data:image/jpeg;base64,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";
  const data = [
    {
      id: "{{request.query.identifiers}}",
      type: "pid",
      imageUrls: {
        xsmall: {
          url: imageUrl,
          format: "jpeg",
          size: "xsmall"
        },
        small: {
          url: imageUrl,
          format: "jpeg",
          size: "small"
        },
        medium: {
          url: imageUrl,
          format: "jpeg",
          size: "medium"
        },
        large: {
          url: imageUrl,
          format: "jpeg",
          size: "large"
        },
        xlarge: {
          url: imageUrl,
          format: "jpeg",
          size: "xlarge"
        },
        original: {
          url: imageUrl,
          format: "jpeg",
          size: "original"
        }
      }
    }
  ];

  type TintClassesType = {
    [key: string]: string;
  };
  const tintClasses: TintClassesType = {
    default: "bg-identity-tint-120",
    "120": "bg-identity-tint-120",
    "80": "bg-identity-tint-80",
    "60": "bg-identity-tint-60",
    "40": "bg-identity-tint-40",
    "20": "bg-identity-tint-20"
  };

  const classes = {
    wrapper: clsx(`cover cover--${size}`, tintClasses[tint || "default"], {
      cover__animate: animate
    })
  };

  const coverUrl = data?.[0]?.imageUrls?.[`${dataSize}`]?.url;
  const image = coverUrl && <img src={coverUrl} alt={description || ""} />;

  return (
    <div className="cover-container">
      {/**
       * Images inside links must have an non-empty alt text to meet accessibility requirements.
       * Only render the cover as a link if we have both an url and a description.
       */}
      {url && description ? (
        <LinkNoStyle url={url} className={classes.wrapper}>
          {image}
        </LinkNoStyle>
      ) : (
        <span className={classes.wrapper}>{image}</span>
      )}
    </div>
  );
};
