import React, { useCallback, useEffect } from "react";
import useForm from "react-hook-form";
import { Button, Input, Select, RTE } from "./index";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? appwriteService.upLoadFile(data.image[0])
        : null;
    }
    if (file) {
      appwriteService.deleteFile(post.featuredImage);
    }

    const dbPost = await appwriteService.updatePost(post.$id, {
      ...data,
      featuredImage: file ? file.$id : undefined,
    });
    if (dbPost) {
      navigate(`/post/${dbPost.$id}`);
    } else {
      const file = data.image[0]
        ? appwriteService.upLoadFile(data.image[0])
        : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }

      }
    }
  };
  const slugTransform = useCallback((val)=>{
    if(val && typeof val==="string")
    return val
  .trim()
  .toLowerCase()
  .replace (/[^a-zA-Z\d\s]+/g,"-")
  .replace(/\s/g, "-");

  return "";
  },[]);

  useEffect(()=>{
    const subs=watch((val,{name})=>{
      if(name==="title"){
        setValue("slug",slugTransform(val.title),{
          shouldValidate: true
        })
      }
    })
    return ()=> subs.unsubscribe();
  }, [watch,slugTransform,setValue]);



  return <h1></h1>;
}

export default PostForm;
