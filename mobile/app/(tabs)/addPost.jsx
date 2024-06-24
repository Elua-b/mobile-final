import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import { useRouter } from 'expo-router';
import usePosts from '../../hooks/usePost';
import CustomButton from '../../components/CustomButton';



const AddPost = () => {
  const { createPost, creatingPost } = usePosts();
  const toast = useToast();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(1); // Assuming the userId is 1 for simplicity

  const handleSubmit = async () => {
    


    if (!title || !body) {
      toast.show("Please fill in all fields", { type: 'warning' });
      return;
    }
    

    const newPost = { title, body, userId };
    await createPost(newPost, true);
  };

  return (
    <View className='flex-1  bg-white p-7 justify-center'>
      <Text className='text-2xl font-bold mb-6 text-center'>Add New Post</Text>
      <TextInput
        className='h-10 border border-gray-300 mb-4 px-2'
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className='h-40 border border-gray-300 mb-4 px-2'
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
      />
      <CustomButton className="" title={creatingPost ? "Creating..." : "Add Post"} handlePress={handleSubmit} disabled={creatingPost} />
    </View>
  );
}

export default AddPost;