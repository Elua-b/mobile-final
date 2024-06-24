/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import useSWR from "swr";

import useAuth from "./useAuth";
import { axios2 } from "../lib/json-api";

export default function usePosts() {
    const toast = useToast();
    const router = useRouter();
  
    const [creatingPost, setCreatingPost] = useState(false);
    const [deletingPost, setDeletingPost] = useState(false);
    const [updatingPost, setUpdatingPost] = useState(false);

    const { data: posts, isLoading, error, mutate } = useSWR("/posts", async (url) => {
        const { data } = await axios2.get(url);
       
        return data
    });

    useEffect(() => {
        mutate();
    }, [])

    const createPost = async (post, redirect = false) => {
      console.log(post);
        setCreatingPost(true);
        try {
          const { data: responseData } = await axios2.post("/posts", post);
          if (responseData) {
            toast.show("Post created successfully", {
              type: 'success'
            });
    
            // Update local state immediately
            const updatedPosts = [...(posts || []), responseData];
            mutate(updatedPosts, false); // Optimistically update
    
            if (redirect) {
              router.push(`/home`);
            }
          } else {
            toast.show("An error occurred", {
              type: 'danger'
            });
          }
        } catch (error) {
          console.error("Error creating post:", error);
          toast.show("An error occurred", {
            type: 'danger'
          });
        } finally {
          setCreatingPost(false);
        }
      };

    const deletePost = async (id, redirect=false) => {
        setDeletingPost(true);
        try {
            const { data } = await axios2.delete(`/posts/${id}`);
            if (data) {
                toast.show("Post deleted successfully", {
                    type: 'success'
                });
                mutate(posts?.filter(post => post.id !== id));
                if (redirect) {
                    router.push(`/home`);
                }
            } else {
                toast.show("An error occurred", {
                    type: 'danger'
                });
            }
        } catch (error) {
            console.error(error);
            toast.show("An error occurredd", {
                type: 'danger'
            });
        } finally {
            setDeletingPost(false);
        }
    }

    // Function to get a single post by ID
    const getPostById = async (id) => {
        try {
            const { data } = await axios2.get(`/posts/${id}`);
            return data.post;
        } catch (error) {
            console.error(error);
            toast.show("An error occurred while fetching the post", {
                type: 'danger'
            });
        }
    }

    // Function to get comments for a post
    const getCommentsByPostId = async (postId) => {
        try {
            const { data } = await axios2.get(`/posts/${postId}/comments`);
            return data.comments;
        } catch (error) {
            console.error(error);
            toast.show("An error occurred while fetching comments", {
                type: 'danger'
            });
        }
    }
    const fetchComments = async (postId) => {
        try {
          const { data } = await axios2.get(`/posts/${postId}/comments`);
          return data;
        } catch (error) {
          console.error(error);
          toast.show("Failed to fetch comments", {
            type: 'danger'
          });
          return [];
        }
      };
    
    return {
        posts,
        isLoading,
        error,
        fetchComments,
        createPost,
        deletePost,
        getPostById,
        getCommentsByPostId,
        creatingPost,
        deletingPost,
    }
}
