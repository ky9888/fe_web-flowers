"use client";
import { TiDelete } from "react-icons/ti";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../hook/useCart";
import { toast } from "react-hot-toast";
function Comment() {
  const { getUserId } = useCart();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Lấy danh sách bình luận từ server
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_URL_API}/api/products/comments`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Lỗi khi lấy bình luận:", err));
  };

  const handleAddComment = () => {
    if (getUserId === null) {
      toast.error("Bạn hãy đăng nhập để bình luận !");
    }
    if (newComment.trim() === "") return;

    axios
      .post(`${process.env.NEXT_PUBLIC_URL_API}/api/products/comments`, {
        text: newComment,
      })
      .then(() => {
        setNewComment("");
        fetchComments();
      })
      .catch((err) => console.error("Lỗi khi thêm bình luận:", err));
  };
  const handleDeleteComment = (id) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_URL_API}/api/products/comments/${id}`)
      .then(() => {
        fetchComments();
      })
      .catch((err) => console.error("Lỗi khi xóa bình luận:", err));
  };

  return (
    <div className="mt-2">
      <h2 className="text-lg font-semibold mb-2">Bình luận</h2>
      <textarea
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        rows="3"
        placeholder="Nhập bình luận..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
        onClick={handleAddComment}
      >
        Gửi
      </button>
      <ul className="mt-4 space-y-2">
        {getUserId?.userName &&
          comments.map((comment) => (
            <li
              key={comment.id}
              className="p-2 ab border border-gray-200 relative bg-gray-100 rounded-md"
            >
              <p className="font-medium text-green-700">{getUserId.userName}</p>
              <p>{comment.text}</p>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="absolute text-[20px] hover:text-red-500  top-1 right-1"
              >
                <TiDelete />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Comment;
