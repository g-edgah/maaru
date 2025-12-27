import { ChatBubbleOutlineOutlined,  FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material"; 
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Friend from "../Friend.jsx";
import FlexBetween from "../styled/flexBetween.jsx";
import { setPosts } from "../../state/state.js";
import WidgetWrapper from "../home/WidgetWrapper.jsx";

const PostWidget = ({ postId, postUserId, name, description, location, picturePath, userPicturePath, likes, comments }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const [ isComments, setIsComments ] = useState(false);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const medium = palette.neutral.medium;
    const main = palette.primary.main;

    const api_url = import.meta.env.VITE_API_URL;          
    
    const patchLike = async () => {
        const response = await fetch(`${api_url}/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: loggedInUserId })
        });
        const updatedPost = await response.json();
        dispatch(setPosts({ posts: updatedPost }));
    };

    return (
        <WidgetWrapper margin="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={medium} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && (
                <img 
                    src={`${api_url}/assets/${picturePath}`}
                    alt="post"
                    style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "0.75rem",
                        marginTop: "0.75rem"
                    }}
                />
                
            )}
            <FlexBetween marginTop="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m:"0.5rem 0", pl: "1rem" }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    );  
}
 
export default PostWidget;