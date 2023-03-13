import { useTheme, Text, Spacer } from "@nextui-org/react";
import Image from "next/image";

export const NavBar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px",
        backgroundColor: theme?.colors?.gray100.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
        alt="icono de la app"
        width={70}
        height={70}
      />
      <Text color="white" h3>
        {" "}
        Clan DAK{" "}
      </Text>

      <Spacer css={{ flex: 1 }} />

      <Text color="white" h3>
        Duelistas DAK
      </Text>
    </div>
  );
};
