import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  href: string;
  subTitle?: string;
  price?: number;
  description?: string;
  available?: boolean;
}

export default function ItemCard({
  icon,
  title,
  href,
  subTitle,
  price,
  description,
  available,
}: Props) {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      title={!available ? "Not Available" : ""}
    >
      <Paper
        elevation={3}
        sx={{
          width: 230,
          height: 180,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: available ? "pointer" : "",
          opacity: available ? 1 : 0.5,
        }}
      >
        {icon}
        <Typography sx={{ fontWeight: "700", pt: 2 }}>{title}</Typography>
        {subTitle && (
          <Typography sx={{ fontSize: "15px" }}>{subTitle}</Typography>
        )}
        {price && <Typography sx={{ fontSize: "15px" }}>{price}</Typography>}
        {description && (
          <Typography sx={{ fontSize: "15px" }}>{description}</Typography>
        )}
      </Paper>
    </Link>
  );
}
