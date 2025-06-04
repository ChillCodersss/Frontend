import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DomainIcon from "@mui/icons-material/Domain";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import ConfirmButton from "@/components/common/ConfirmButton";
import RejectButton from "@/components/common/RejectButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ToastContainer, toast } from "react-toastify";
import { getToken } from "@/services/auth";
import { getUserInfo } from "@/services/auth";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";
import defaultpic from "@/assets/DefaultPerson.png"

interface PostData {
  username: string;
  province: string;
  entranceExamYear: string;
  uniMajor: string;
  uniName: string;
  hsMajorTitle: string;
  content: string;
  profilePic: string;
  employmentDuration: number | null;
  rate: string;
  studentCounselorId: string | null;
  requestStatus: number | null;
}

interface Comment {
  text: string;
  approved: boolean;
  studentName: string;
  counselorName: string;
  createDate: string;
}

interface PaginationData {
  items: Comment[];
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalCount: number;
  filteredCount: number;
}

interface ApiResponse {
  isSuccess: boolean;
  isFailure: boolean;
  message: string | null;
  error: {
    code: string;
    message: string;
  } | null;
  value: PaginationData | boolean;
}

const CounselorDisplay: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<PostData>({
    username: "",
    province: "",
    entranceExamYear: "",
    uniMajor: "",
    uniName: "",
    hsMajorTitle: "",
    content: "کاربر هنوز توضیحاتی درباره خود اضافه نکرده است.",
    profilePic: defaultpic,
    employmentDuration: null,
    rate: "",
    studentCounselorId: null,
    requestStatus: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isCancelMode, setIsCancelMode] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [userRole, setUserRole] = useState<string | null>(null);

  // Fetch user role on component mount
  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUserRole(userInfo.role);
    }
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!id) {
        console.log("No counselor ID provided");
        toast.error("شناسه مشاور نامعتبر است", {
          position: "bottom-right",
          autoClose: 5000,
          rtl: true,
        });
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setPostData({
        username: "",
        province: "",
        entranceExamYear: "",
        uniMajor: "",
        uniName: "",
        hsMajorTitle: "",
        content: "کاربر هنوز توضیحاتی درباره خود اضافه نکرده است.",
        profilePic: defaultpic,
        employmentDuration: 0,
        rate: "",
        studentCounselorId: null,
        requestStatus: null,
      });

      try {
        const token = getToken();
        const response = await fetch(`http://62.60.213.13/api/Counselor/GetById?Id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch counselor data: ${response.status}`);
        }

        const data = await response.json();
        console.log("Counselor API response:", data);
        const userData = data.value || {};

        let profilePicUrl = defaultpic;
        if (userData?.picUrl) {
          try {
            const imageResponse = await fetch(
              `http://62.60.213.13/api/MediaFiles/StramImg?FileUrl=${encodeURIComponent(userData.picUrl)}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (imageResponse.ok) {
              const blob = await imageResponse.blob();
              profilePicUrl = URL.createObjectURL(blob);
            } else {
              console.warn("Failed to fetch image, using default:", imageResponse.statusText);
            }
          } catch (imageError) {
            console.warn("Error fetching profile picture, using default:", imageError);
          }
        }

        setPostData({
          username: userData.fullName || "",
          province: userData.province || "",
          entranceExamYear: userData.entranceExamYear || "",
          uniMajor: userData.uniMajor || "نامشخص",
          uniName: userData.uniName || "",
          hsMajorTitle: userData.hsMajorTitle || "نامشخص",
          content: userData.aboutMe || "کاربر هنوز توضیحاتی درباره خود اضافه نکرده است.",
          profilePic: profilePicUrl,
          employmentDuration: userData.employmentDuration || "0",
          rate: userData.rate || "",
          studentCounselorId: userData.studentCounselorId ? String(userData.studentCounselorId) : null,
          requestStatus: userData.requestStatus || null,
        });

        const normalizedId = String(id);
        const normalizedStudentCounselorId = userData.studentCounselorId ? String(userData.studentCounselorId) : null;
        setIsCancelMode(normalizedId === normalizedStudentCounselorId);
      } catch (error) {
        console.error("Error fetching counselor data:", error);
        toast.error("خطا در بارگذاری اطلاعات مشاور", {
          position: "bottom-right",
          autoClose: 5000,
          rtl: true,
        });
        setPostData((prev) => ({
          ...prev,
          content: "خطا در بارگذاری اطلاعات مشاور",
        }));
      } finally {
        setIsLoading(false);
      }
    };

    const fetchComments = async () => {
      if (!id) {
        console.log("No counselor ID provided for comments");
        toast.error("شناسه مشاور نامعتبر است", {
          position: "bottom-right",
          autoClose: 5000,
          rtl: true,
        });
        return;
      }

      try {
        const token = getToken();
        const response = await fetch(
          `http://62.60.213.13/api/Counselor/CounselorComments?CounselorId=${id}&PageSize=${pageSize}&PageIndex=${pageIndex}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch comments: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        console.log("Comments API response:", data);
        if (data.isSuccess && data.value && typeof data.value !== "boolean") {
          setComments(data.value.items || []);
          setHasPreviousPage(data.value.hasPreviousPage);
          setHasNextPage(data.value.hasNextPage);
          setTotalPages(data.value.totalPages);
        } else {
          throw new Error(data.message || "Invalid comments response");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("خطا در بارگذاری نظرات", {
          position: "bottom-right",
          autoClose: 5000,
          rtl: true,
        });
        setComments([]);
      }
    };

    fetchPostData();
    fetchComments();
  }, [id, pageIndex]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirm = async () => {
    if (!id) {
      toast.error("شناسه مشاور نامعتبر است", {
        position: "bottom-right",
        autoClose: 5000,
        rtl: true,
      });
      return;
    }

    try {
      const token = getToken();

      if (isCancelMode) {
        const response = await fetch("http://62.60.213.13/api/RequestCounselor/Cancel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "text/plain",
          },
          body: JSON.stringify({}),
        });

        const data: ApiResponse = await response.json();

        if (!response.ok || data.isFailure) {
          throw new Error(data.message || "خطا در لغو درخواست مشاوره");
        }

        toast.success(data.message || "درخواست مشاوره با موفقیت لغو شد!", {
          position: "bottom-right",
          autoClose: 5000,
          rtl: true,
        });
        setIsCancelMode(false);
        setPostData((prev) => ({ ...prev, studentCounselorId: null }));
      } else {
        const convertedId = parseInt(id, 10);
        if (isNaN(convertedId)) {
          toast.error("شناسه مشاور باید یک عدد معتبر باشد", {
            position: "bottom-right",
            autoClose: 5000,
            rtl: true,
          });
          return;
        }

        const formData = new FormData();
        formData.append("id", convertedId.toString());

        const response = await fetch("http://62.60.213.13/api/RequestCounselor/Create", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data: ApiResponse = await response.json();

        if (!response.ok || data.isFailure) {
          throw new Error(data.message || "خطا در ارسال درخواست مشاوره");
        }

        toast.success(data.message || "درخواست مشاوره با موفقیت ثبت شد!", {
          position: "bottom-right",
          autoClose: 5000,
          rtl: true,
        });
        setIsCancelMode(true);
        setPostData((prev) => ({ ...prev, studentCounselorId: id }));
      }
      setOpenDialog(false);
    } catch (error: any) {
      console.error("Error handling request:", error);
      toast.error(error.message || "خطا در ثبت/لغو درخواست. لطفاً دوباره تلاش کنید.", {
        position: "bottom-right",
        autoClose: 5000,
        rtl: true,
      });
    }
  };

  const handleNavigateToCounselor = () => {
    if (postData.studentCounselorId) {
      navigate(`/OurCounselor/CounselorPage/${postData.studentCounselorId}`);
    } else {
      toast.error("شناسه مشاور فعلی در دسترس نیست", {
        position: "bottom-right",
        autoClose: 5000,
        rtl: true,
      });
    }
  };

  const handleCommentSubmit = async () => {
    if (!id || !commentText.trim()) {
      toast.error("لطفاً متن نظر را وارد کنید", {
        position: "bottom-right",
        autoClose: 5000,
        rtl: true,
      });
      return;
    }

    try {
      const token = getToken();
      const convertedId = parseInt(id, 10);
      if (isNaN(convertedId)) {
        toast.error("شناسه مشاور نامعتبر است", {
          position: "bottom-right",
          autoClose: 5000,
          rtl: true,
        });
        return;
      }

      const response = await fetch("http://62.60.213.13/api/Counselor/Comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          counselorId: convertedId,
          text: commentText,
        }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || data.isFailure) {
        throw new Error(data.message || "خطا در ارسال نظر");
      }

      toast.success(data.message || "نظر شما پس از تایید ادمین نمایش داده خواهد شد!", {
        position: "bottom-right",
        autoClose: 5000,
        rtl: true,
      });

      setCommentText("");
      setPageIndex(1);

      const fetchComments = async () => {
        try {
          const commentsResponse = await fetch(
            `http://62.60.213.13/api/Counselor/CounselorComments?CounselorId=${id}&PageSize=${pageSize}&PageIndex=1`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!commentsResponse.ok) {
            throw new Error(`Failed to fetch comments: ${commentsResponse.status}`);
          }

          const commentsData: ApiResponse = await commentsResponse.json();
          console.log("Comments refresh API response:", commentsData);
          if (commentsData.isSuccess && commentsData.value && typeof commentsData.value !== "boolean") {
            setComments(commentsData.value.items || []);
            setHasPreviousPage(commentsData.value.hasPreviousPage);
            setHasNextPage(commentsData.value.hasNextPage);
            setTotalPages(commentsData.value.totalPages);
          }
        } catch (error) {
          console.error("Error fetching comments after submission:", error);
          toast.error("خطا در بارگذاری نظرات جدید", {
            position: "bottom-right",
            autoClose: 5000,
            rtl: true,
          });
        }
      };

      fetchComments();
    } catch (error: any) {
      console.error("Error submitting comment:", error);
      toast.error(error.message || "خطا در ثبت نظر. لطفاً دوباره تلاش کنید.", {
        position: "bottom-right",
        autoClose: 5000,
        rtl: true,
      });
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setPageIndex((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setPageIndex((prev) => prev + 1);
    }
  };

  const typographyStyles = {
    color: "black",
    fontWeight: "bold",
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          padding: isMobile ? "10px" : "20px",
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
          direction: "rtl",
        }}
      >
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "1300px",
              width: "100%",
              margin: "0 auto",
              mt: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column-reverse" : "row",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                backgroundColor: "white",
                overflow: "hidden",
                marginBottom: "20px",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  padding: isMobile ? "15px" : "30px",
                  minWidth: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      sx={{ ...typographyStyles, textAlign: "right" }}
                    >
                      {postData.username || "نامشخص"}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <StarIcon sx={{ color: "#FFD700", paddingBottom: "5px" }} />
                      <Typography
                        variant={isMobile ? "subtitle1" : "body1"}
                        sx={{ ...typographyStyles, textAlign: "left" }}
                      >
                        {postData.rate || "0"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography
                      variant={isMobile ? "subtitle1" : "h6"}
                      sx={{ ...typographyStyles, textAlign: "right" }}
                    >
                      رشته {postData.hsMajorTitle}
                    </Typography>
                    <Typography
                      variant={isMobile ? "subtitle1" : "body1"}
                      sx={{ ...typographyStyles, textAlign: "left" }}
                    >
                      تجربه کار: {postData.employmentDuration} سال
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.7,
                        marginBottom: "20px",
                        fontSize: isMobile ? "0.9rem" : "1rem",
                      }}
                    >
                      {postData.content}
                    </Typography>
                  </Box>
                </Box>

                {userRole !== "Counselor" && (postData.requestStatus === 1 || postData.requestStatus === null) && (
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: "12px",
                      padding: isMobile ? "15px" : "20px",
                      backgroundColor: "#fdfaf4",
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                      mt: 3,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#444",
                          fontWeight: "600",
                          textAlign: "right",
                          flex: 1,
                          minWidth: "200px",
                          fontSize: isMobile ? "0.9rem" : "1rem",
                        }}
                      >
                        {postData.studentCounselorId && String(postData.studentCounselorId) !== String(id)
                          ? "شما در حال حاضر با مشاور دیگری کار می‌کنید. برای درخواست این مشاور، ابتدا درخواست فعلی خود را لغو کنید."
                          : isCancelMode
                          ? "برای لغو درخواست مشاوره با این مشاور، روی دکمه لغو کلیک کنید."
                          : "اگر علاقه‌مند هستید با این مشاور کار کنید، درخواست خود را ثبت کنید تا هماهنگی‌های لازم انجام شود."}
                      </Typography>
                      {postData.studentCounselorId && String(postData.studentCounselorId) !== String(id) && (
                        <Typography
                          component="span"
                          onClick={handleNavigateToCounselor}
                          sx={{
                            color: "#1976d2",
                            textDecoration: "underline",
                            cursor: "pointer",
                            fontSize: isMobile ? "0.9rem" : "1rem",
                          }}
                        >
                          مشاهده صفحه مشاور فعلی
                        </Typography>
                      )}
                    </Box>

                    {(!postData.studentCounselorId || String(postData.studentCounselorId) === String(id)) && (
                      isCancelMode ? (
                        <RejectButton
                          name="لغو درخواست"
                          type="button"
                          onClick={handleOpenDialog}
                          sx={{ backgroundColor: "#d32f2f" }}
                        />
                      ) : (
                        <ConfirmButton
                          name="ارسال درخواست"
                          type="button"
                          onClick={handleOpenDialog}
                        />
                      )
                    )}
                  </Box>
                )}
              </Box>

              <Box
                sx={{
                  width: isMobile ? "100%" : "230px",
                  backgroundColor: "rgb(169, 224, 250)",
                  borderRadius: isMobile ? "12px 12px 0 0" : "0",
                  display: "flex",
                  flexDirection: isMobile ? "row" : "column",
                  justifyContent: isMobile ? "space-between" : "flex-start",
                  alignItems: isMobile ? "flex-start" : "flex-start",
                  padding: isMobile ? "15px" : "20px",
                  gap: isMobile ? "10px" : "15px",
                }}
              >
                <img
                  src={postData.profilePic}
                  alt="Profile"
                  onError={(e) => {
                    e.currentTarget.src = defaultpic;
                  }}
                  style={{
                    width: isMobile ? "120px" : "220px",
                    height: isMobile ? "120px" : "220px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: isMobile ? "auto" : "0",
                    alignSelf: "center",
                    marginBottom: isMobile ? "0" : "16px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    flex: isMobile ? 1 : "unset",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      minWidth: isMobile ? "120px" : "auto",
                    }}
                  >
                    <LocationOnIcon sx={{ color: "#555" }} />
                    <Typography
                      variant="body1"
                      sx={{ color: "#555", fontWeight: "700", fontSize: isMobile ? "0.8rem" : "0.9rem" }}
                    >
                      {postData.province || "نامشخص"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      minWidth: isMobile ? "120px" : "auto",
                    }}
                    >
                      <EventIcon sx={{ color: "#555" }} />
                      <Typography
                        variant="body1"
                        sx={{ color: "#555", fontWeight: "700", fontSize: isMobile ? "0.8rem" : "0.9rem" }}
                      >
                        کنکور {postData.entranceExamYear || "نامشخص"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        minWidth: isMobile ? "120px" : "auto",
                      }}
                      >
                        <DomainIcon sx={{ color: "#555" }} />
                        <Typography
                          variant="body1"
                          sx={{ color: "#555", fontWeight: "700", fontSize: isMobile ? "0.8rem" : "0.9rem" }}
                        >
                          {postData.uniName || "نامشخص"}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          minWidth: isMobile ? "120px" : "auto",
                        }}
                        >
                          <SchoolIcon sx={{ color: "#555" }} />
                          <Typography
                            variant="body1"
                            sx={{ color: "#555", fontWeight: "700", fontSize: isMobile ? "0.8rem" : "0.9rem" }}
                          >
                            {postData.uniMajor || "نامشخص"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Comment Section */}
                  <Box
                    sx={{
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                      borderRadius: "12px",
                      backgroundColor: "white",
                      padding: isMobile ? "10px" : "20px",
                      margintop: "20px",
                    }}
                  >
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      sx={{
                        ...typographyStyles,
                        textAlign: "right",
                        mb: 3,
                      }}
                    >
                      نظرات
                    </Typography>

                    {/* Comment Input Form */}
                    {userRole !== "Counselor" && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: isMobile ? "column" : "row",
                          gap: "16px",
                          mb: 4,
                        }}
                      >
<TextField
  placeholder="نظر خود را بنویسید..."
  multiline
  rows={3}
  value={commentText}
  onChange={(e) => setCommentText(e.target.value)}
  variant="outlined"
  fullWidth
  sx={{
    "& .MuiInputBase-root": {
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      textAlign: "right",
    },
    "& .MuiOutlinedInput-root": {
      padding: "10px",
      textAlign: "right",
      "& fieldset": {
        borderColor: "#ddd", // رنگ حاشیه در حالت عادی
      },
      "&:hover fieldset": {
        borderColor: "#1976d2", // رنگ حاشیه هنگام هاور
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1976d2", // رنگ حاشیه هنگام فوکوس (آبی)
        borderWidth: "2px", // ضخامت حاشیه هنگام فوکوس
      },
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#777", // رنگ پلِیس‌هولدر
      opacity: 1, // اطمینان از نمایش کامل پلِیس‌هولدر
    },
  }}
/>
                        <SecondaryButton
                          name="ارسال نظر"
                          variant="contained"
                          backgroundColor="#3f51b5"
                          fontSize={isMobile ? "0.9rem" : "1rem"}
                          width={isMobile ? "100%" : "200px"}
                          height={"40px"}
                          borderRadius="20px"
                          onClick={handleCommentSubmit}
                          disabled={!commentText.trim()}
                          sx={{
                            width: isMobile ? "100%" : "200px",
                            height: "40px",
                            fontSize: isMobile ? "0.9rem" : "1rem",
                          }}
                        />
                      </Box>
                    )}

                    {/* Comments */}
                    <Box>
                      {comments.length === 0 ? (
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#555",
                            textAlign: "right",
                            fontSize: isMobile ? "0.9rem" : "1rem",
                          }}
                        >
                          هنوز نظری ثبت نشده است.
                        </Typography>
                      ) : (
                        comments.map((comment) => (
                          <Box
                            key={comment.text + comment.studentName} // Using text+studentName as a unique key
                            sx={{
                              borderBottom: "1px solid #ddd",
                              padding: "15px 0",
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  fontWeight: "bold",
                                  color: "#333",
                                  fontSize: isMobile ? "0.9rem" : "1rem",
                                }}
                              >
                                {comment.studentName}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#777",
                                  fontSize: isMobile ? "0.8rem" : "0.9rem",
                                }}
                              >
                                {comment.createDate}
                              </Typography>
                            </Box>
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#444",
                                lineHeight: 1.6,
                                fontSize: isMobile ? "0.9rem" : "1rem",
                                textAlign: "right",
                              }}
                            >
                              {comment.text}
                            </Typography>
                          </Box>
                        ))
                      )}
                    </Box>

                    {/* Pagination Controls */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 3,
                      }}
                    >
                      <SecondaryButton
                        name="صفحه قبل"
                        onClick={handlePreviousPage}
                        disabled={!hasPreviousPage}
                        width={isMobile ? "100px" : "120px"}
                        height="40px"
                        fontSize={isMobile ? "14px" : "16px"}
                        borderRadius="8px"
                        backgroundColor="#1976d2"
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#333",
                          fontSize: isMobile ? "0.9rem" : "1rem",
                        }}
                      >
                        صفحه {pageIndex} از {totalPages}
                      </Typography>
                      <SecondaryButton
                        name="صفحه بعد"
                        onClick={handleNextPage}
                        disabled={!hasNextPage}
                        width={isMobile ? "100px" : "120px"}
                        height="40px"
                        fontSize={isMobile ? "14px" : "16px"}
                        borderRadius="8px"
                        backgroundColor="#1976d2"
                      />
                    </Box>
                  </Box>
                </Box>
              )}

              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                sx={{
                  "& .MuiDialog-paper": {
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                    padding: "16px",
                    maxWidth: isMobile ? "90%" : "400px",
                    width: "100%",
                  },
                  direction: "rtl",
                }}
              >
                <DialogTitle
                  sx={{
                    fontSize: isMobile ? "1.2rem" : "1.5rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#333",
                    pb: 1,
                  }}
                >
                  {isCancelMode ? "تأیید لغو درخواست" : "تأیید درخواست"}
                </DialogTitle>
                <DialogContent
                  sx={{
                    px: isMobile ? 2 : 4,
                    py: 2,
                  }}
                >
                  <DialogContentText
                    sx={{
                      color: "#555",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      lineHeight: 1.6,
                      textAlign: "center",
                    }}
                  >
                    {isCancelMode
                      ? `آیا مطمئن هستید که می‌خواهید درخواست مشاوره با ${postData.username || "مشاور"} را لغو کنید؟`
                      : `آیا مطمئن هستید که می‌خواهید درخواست مشاوره با ${postData.username || "مشاور"} را ثبت کنید؟`}
                  </DialogContentText>
                </DialogContent>
                <DialogActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: isMobile ? 2 : 4,
                    pb: 2,
                    gap: 2,
                  }}
                >
                  <SecondaryButton
                    name="انصراف"
                    backgroundColor="#d32f2f"
                    onClick={handleCloseDialog}
                    width={isMobile ? "100px" : "120px"}
                    height="40px"
                    fontSize={isMobile ? "14px" : "16px"}
                    borderRadius="8px"
                  />
                  <SecondaryButton
                    name="تأیید"
                    backgroundColor="#1976d2"
                    onClick={handleConfirm}
                    width={isMobile ? "100px" : "120px"}
                    height="40px"
                    fontSize={isMobile ? "14px" : "16px"}
                    borderRadius="8px"
                  />
                </DialogActions>
              </Dialog>

              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Box>
          </>
        );
      };

      export default CounselorDisplay;