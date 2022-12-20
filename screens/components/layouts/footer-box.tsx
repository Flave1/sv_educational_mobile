import React from "react";
import { Box } from "@react-native-material/core";


const FooterBox = ({ icon, text }: any) => (
    <Box w={70} h={70} m={2}  style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Box w={50} h={50} radius={100} style={{ backgroundColor: '#2C3E50', justifyContent: 'center', alignItems: 'center' }}>
            {icon}
        </Box>
        {text}
    </Box>
);

export default FooterBox;