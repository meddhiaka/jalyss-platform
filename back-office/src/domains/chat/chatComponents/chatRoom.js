import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  Badge,
} from "@mui/material";
import {
  CircleDashed,
  MagnifyingGlass,
  BookOpen,
  Checks,
} from "phosphor-react";
import { users } from "../../../constants/users";
import React, { useEffect, useState } from "react";
import Search from "../../../components/Commun/Search";
import SearchIconWrapper from "../../../components/Commun/SearchIconWrapper";
import StyledInputBase from "../../../components/Commun/inputs/SearchInputBase";
import Icon from "../../../assets/logo.jpg";
import StyledBadge from "../../../components/Commun/StyledBadge";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneRoom, notSeen } from "../.././../store/chatStore";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ModalEdit from "../../../components/Commun/Modal";
import DeleteModal from "../../../components/Commun/Modal";
import SaveModal from "../../../components/Commun/Modal";
import { Add } from "@mui/icons-material";
import zIndex from "@mui/material/styles/zIndex";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Select from "react-select";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdOutlineGroups } from "react-icons/md";
import "../../../assets/styles/chatRoom.css";

const ChatRoom = ({
  chatRoomList,
  setRoom,
  room,
  setActiveComponent,
  setSelectedUser,
  screen,
}) => {
  const navigate = useNavigate();
  const authStore = useSelector((state) => state.auth?.me);
  const chatStore = useSelector((state) => state.chat);
  const { notSeen } = chatStore || {};
  let number = notSeen;
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [basicModalEdit, setBasicModalEdit] = useState(false);
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [basicModalsave, setBasicModalsave] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredChatRoom, setHoveredChatRoom] = useState(null);
  const [isButtonVisible, setisButtonVisible] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isPersonIconActive, setIsPersonIconActive] = useState(false);
  const [isGroupIconActive, setIsGroupIconActive] = useState(false);

  const handlePersonIconClick = () => {
    setIsPersonIconActive(true);
    setIsGroupIconActive(false);
  };

  const handleGroupIconClick = () => {
    setIsPersonIconActive(false);
    setIsGroupIconActive(true);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMouseEnter = (chatRoomId) => {
    setHoveredChatRoom(chatRoomId);
  };

  const handleMouseLeave = () => {
    setHoveredChatRoom(null);
    setOpen(!open)
  };

  // const filteredChatRooms = chatRoomList.filter((chatRoom) => {
  //   let name = chatRoom.participants.filter(
  //     (p) => p.userId !== authStore?.id
  //   )[0].user.fullNameEn;
  //   return name.toLowerCase().includes(searchText.toLowerCase());
  // });

  const filteredChatRooms = [
    {
      id: "chatRoomId1",
      participants: [
        {
          userId: "userId1",
          user: {
            fullNameEn: "John Doe",
          },
        },
        {
          userId: "userId2",
          user: {
            fullNameEn: "Jane Smith",
          },
        },
      ],
      name: null,
      messages: [
        {
          text: "Hello there!",
          createdAt: "2023-07-09T09:30:00.000Z",
          userId: "userId2",
        },
      ],
      _count: {
        messages: 5,
      },
    },
  ];

  const toggleShowEdit = () => {
    setBasicModalEdit(!basicModalEdit);
    handleMouseLeave();
  };
  const toggleShowDelete = () => {
    setBasicModalDelete(!basicModalDelete);
    handleMouseLeave();
  };
  const toggleShowSave = () => {
    setOpen(false);
    handleMouseLeave();
    setBasicModalEdit(false);
    setTimeout(() => {
      setBasicModalsave(!basicModalsave);
    }, 1000);
  };

  const ChatElement = () => {
    return (
      <>
        <Box
          sx={{
            width: "100%",
            height: 65,
            borderRadius: 1,
            backgroundColor: "#fff",
          }}
        >
          {filteredChatRooms.map((chatRoom, i) => {
            setIdentifier(chatRoom.id);

            let name = "";
            let user = chatRoom.participants.filter(
              (p) => p.userId !== authStore?.id
            )[0];
            if (chatRoom.name === null)
              name = chatRoom.participants.filter(
                (p) => p.userId !== authStore?.id
              )[0].user.fullNameEn;
            else {
              name = chatRoom.name;
            }
            return (
              <Stack
                direction="row"
                alignItems="center"
                onMouseEnter={() => handleMouseEnter(chatRoom.id)}
                onMouseLeave={handleMouseLeave}
                justifyContent="space-between"
                key={i}
              >
                <Stack
                  onClick={() => {
                    setSelectedUser(user);

                    if (screen === "md") setActiveComponent("conversation");
                    navigate(`/chat/${user?.userId}`);
                  }}
                  direction="row"
                  spacing={2}
                >
                  <StyledBadge
                    onClick={() => {
                      setSelectedUser(user);

                      if (screen === "md") setActiveComponent("conversation");
                      navigate(`/chat/${user?.userId}`);
                    }}
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar src={Icon} />
                  </StyledBadge>
                  <Stack>
                    <Typography variant="subtitle1">{name}</Typography>
                    <Typography variant="caption">
                      {chatRoom.messages[0].text}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  spacing={2}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Typography sx={{ fontWeight: 600 }} variant="caption">
                    {chatRoom.messages[0].createdAt.slice(11, 16)}
                  </Typography>
                  {chatRoom?._count?.messages ? (
                    <Badge
                      color="primary"
                      badgeContent={chatRoom?._count?.messages}
                    ></Badge>
                  ) : chatRoom.messages[0].userId !== authStore.id ? (
                    <Checks size={25} weight="thin" color="green" />
                  ) : (
                    <Checks size={25} weight="light" color="blue" />
                  )}

                  {/* <Badge color="primary" badgeContent={chatRoom?._count?.messages}></Badge> */}
                </Stack>
                {hoveredChatRoom === chatRoom.id ? (
                  <>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "20px",
                        marginTop: "10px",
                        border: "none",
                        backgroundColor: "white",
                        cursor: "pointer",
                        color: "black",
                      }}
                      onClick={handleOpen}
                    >
                      <div
                        className="btnicon"
                        style={{
                          height: "25px",
                          borderRadius: "50px",
                          display:'flex',
                          justifyContent:"center",
                          alignItems:"center"
                        }}
                      >
                        <BiDotsVerticalRounded style={{ fontSize: 25 }} />
                      </div>
                    </button>
                    {open ? (
                      <ul
                        class="list-group"
                        style={{
                          position: "fixed",
                          marginLeft: "180px",
                          marginTop: "120px",
                          cursor: "pointer",
                          zIndex:999
                        }}
                      >
                        <li
                          class="list-group-item"
                          onClick={() => toggleShowEdit()}
                        >
                          Edit chat
                        </li>
                        <li
                          class="list-group-item"
                          onClick={() => toggleShowDelete()}
                          style={{ color: "red" }}
                        >
                          Delete chat
                        </li>
                      </ul>
                    ) : null}
                  </>
                ) : null}
              </Stack>
            );
          })}
        </Box>
      </>
    );
  };

  return (
    <>
      <SaveModal
        toggleShow={toggleShowSave}
        basicModal={basicModalsave}
        setBasicModal={setBasicModalsave}
        title="Save changes ?"
        body="Are you sure !"
        normal={true}
        ofDelete={!true}
        bodOfDelete={null}
      />

      <DeleteModal
        toggleShow={toggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={!true}
        ofDelete={true}
        bodOfDelete="Delete chat ?"
      />

      <ModalEdit
        toggleShow={toggleShowEdit}
        basicModal={basicModalEdit}
        setBasicModal={setBasicModalEdit}
        title="Group Discussion (Edit)"
        body={
          <>
            <label>
              <span>Name:</span>
              <input
                type="text"
                placeholder="name"
                style={{ width: "185%", marginTop: "5px" }}
              />
            </label>

            <label style={{ width: "100%", marginTop: "5px" }}>
              <span>Members:</span>
              <div>
                <Select placeholder="Edit members" options={users} isMulti />
              </div>
            </label>

            <label>
              <span>Logo:</span>
              <div
                style={{
                  width: "160%",
                  height: "130px",
                  background: `url(https://fontawesome.com/social/cloud-arrow-down?f=&s=)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 5,
                  marginTop: "5px",
                }}
              >
                <input
                  type="file"
                  placeholder="Input 3"
                  style={{
                    opacity: 0,
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                />
              </div>
            </label>
          </>
        }
        normal={true}
        ofDelete={false}
        bodOfDelete={null}
        fn={() => {
          toggleShowSave();
        }}
      />
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          width: "100%",
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px",
        }}
      >
        <Stack p={3} spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">Discussion</Typography>

            <IconButton>
              <BookOpen />
            </IconButton>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={3}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#57385c" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Search>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={`icons ${isPersonIconActive ? "active" : ""}`}
                style={{ width: "60px", height: "35px", borderRadius: "30px" }}
                onClick={handlePersonIconClick}
              >
                <BsFillPersonLinesFill
                  style={{
                    color: isPersonIconActive ? "#57385c" : "grey",
                    fontSize: 20,
                  }}
                />
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                className={`icons ${isGroupIconActive ? "active" : ""}`}
                justifyContent="center"
                style={{ width: "60px", height: "35px", borderRadius: "30px" }}
                onClick={handleGroupIconClick}
              >
                <MdOutlineGroups
                  style={{
                    color: isGroupIconActive ? "#57385c" : "grey",
                    fontSize: 25,
                  }}
                />
              </Stack>
            </Stack>

            <Divider />

            <ChatElement />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default ChatRoom;
