import { Typography, useTheme } from "@mui/material";

import FlexBetween from "../styled/flexBetween.jsx";
import WidgetWrapper from "../home/WidgetWrapper.jsx";

const AdvertWidget = ({ picturePath, advertLink }) => {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const api_url = import.meta.env.VITE_API_URL;   

    return (
        <WidgetWrapper margin="2rem 0">
            <FlexBetween>
                <Typography color={main} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={main} variant="h5" fontWeight="500">
                    {advertLink}
                </Typography>
            </FlexBetween>
            <img 
                src={`${api_url}/assets/${picturePath}`}
                alt="advert"
                style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "0.75rem",
                    marginTop: "0.75rem"
                }}
            />
        </WidgetWrapper>
    );
};

export default AdvertWidget;


