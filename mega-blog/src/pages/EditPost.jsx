import React, { useEffect, useState } from "react";
import Container from "../components/Container/Container";
import PostForm from "../components/PostForm/PostForm";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState([]);
  const { slug } = useParams(); // useParam is used to get the value of the url
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPosts(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
